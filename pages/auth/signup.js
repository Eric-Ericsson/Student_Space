import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import InputWithLabel from "@components/components/layout/inputWithLabel";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@components/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Function to check username availability
  async function isUsernameTaken(username) {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  // Function to generate unique username suggestions
  async function generateUniqueUsernameSuggestions(username, count = 3) {
    const suggestions = [];
    for (let i = 1; i <= count; i++) {
      let suggestion = `${username}_${Math.floor(Math.random() * 1000)}`;

      // Check if the suggestion already exists in the database
      while (await isUsernameTaken(suggestion)) {
        suggestion = `${username}_${Math.floor(Math.random() * 1000)}`;
      }
      suggestions.push(suggestion);
    }
    return suggestions;
  }

  //validation of full name
  const validateFullName = () => {
    let error = "";
    const trimmedFullName = fullName.trim();
    if (!trimmedFullName) {
      error = "Full name is required";
    } else if (fullName.length < 3) {
      error = "full name is too short";
    } else if (fullName.length > 50) {
      error = "full name is too long";
    }
    return error;
  };

  //validation of username
  const validateUsername = () => {
    let error = "";
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      error = "username is required";
    } else if (username.length < 3) {
      error = "username is too short";
    } else if (username.length > 50) {
      error = "username is too long";
    } else if (suggestions.length > 0) {
      error = "username already in use";
    }
    return error;
  };

  //validation of email
  const validateEmail = () => {
    let error = "";
    if (!email) {
      error = "Email is required";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return "Invalid email address";
    }
    return error;
  };

  //validatoin of password
  const validatePassword = () => {
    let error = "";
    if (!password) {
      error = "Password is required";
    }
    return error;
  };

  //comfirmation of password
  const validateConfirmPassword = () => {
    let error = "";
    if (!confirmPassword) {
      error = "Confirm password is required";
    } else if (password !== confirmPassword) {
      error = "Passwords do not match";
    }
    return error;
  };

  //handle input change as user types fullName
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    clearError("fullName");
  };

  //handle input change as user types fullName
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    clearError("username");
  };

  //handle input change as user types email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    clearError("email");
  };

  //handle input change as user types password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    clearError("password");
  };

  //handle input change as user types confirm password
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    clearError("confirmPassword");
  };

  //Handle the Submit Button if user submits detaisls
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullNameError = validateFullName();
    const usernameError = validateUsername();
    const emailError = validateEmail();
    const passwordError = validatePassword();
    const confirmPasswordError = validateConfirmPassword();

    setErrors({
      fullName: fullNameError,
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    if (
      !fullNameError &&
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      try {
        setLoading(true);
        if (!(await isUsernameTaken(username))) {
          // Proceed with sign-up process if username is not taken
          const createUser = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = createUser.user;
          if (user) {
            await sendEmailVerification(user);
            // updateProfile(user, {
            //   displayName: fullName,
            // });
            const userDocRef = doc(db, `users/${user.uid}`);
            await setDoc(userDocRef, {
              email: email,
              name: fullName,
              username: username.split(" ").join("_").toLowerCase(),
              interest: "",
              phone: "",
              profileImage: "",
              bannerImage: "",
              address: "",
            });
            setLoading(false);
            toast.success("Please check your email to verify your account.");
          }
        } else {
          generateUniqueUsernameSuggestions(username, 3).then((suggestion) => {
            setSuggestions(...suggestions, suggestion);
            setLoading(false);
            setErrors({ username: "username already in use" });
          });
        }
      } catch (error) {
        setLoading(false);
        if (error.code == "auth/email-already-in-use") {
          toast.error(
            "email already in use. Login or verify your account if this email belongs to you"
          );
        } else if (error.code == "auth/weak-password") {
          toast.error("Password is too short");
        } else toast.error("something went wrong");
        console.log(error.message);
      }
    }
  };

  //set error values to an empty string
  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  return (
    <div className="bg-blue-600 w-full h-screen m-auto">
      <div className="grid md:grid-cols-2">
        <div className="hidden relative md:block bg-[url('/signup_bg.jpg')] bg-no-repeat bg-cover bg-center">
          <div className="bg-[#243b76] bg-opacity-90 w-full h-screen flex items-center justify-center">
            <div className="px-14 lg:px-20 text-white bg-opacity-90 w-full h-screen flex flex-col gap-4 items-center justify-center">
              <span className="text-2xl font-semibold">
                Signing up easy, while unlocking a world of creativity and
                discovery
              </span>
              <div className="flex flex-col space-y-3 opacity-80">
                <span className="list-item">Fellow your interest</span>
                <span className="list-item">
                  Hear what people are talking about
                </span>
                <span className="list-item">Join the conversation</span>
                <span className="list-item">Do business</span>
                <span className="list-item">Be discovered</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[url('/signup_bg.jpg')] bg-no-repeat bg-cover bg-center">
          <div className="bg-[#243b76] bg-opacity-95 md:bg-white w-full h-screen flex flex-cols items-center">
            <div className="flex flex-col items-center md:px-16 w-full">
              <div>
                <svg
                  className="w-10 h-16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 84.85 109.92"
                >
                  <g
                    className="fill-white md:fill-[#243b76]"
                    data-name="Layer 2"
                  >
                    <path d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z" />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col gap-2 my-5">
                <span className="font-[Poppins] text-center font-semibold text-xl sm:text-3xl opacity-95 md:opacity-90 text-white md:text-[#012E40]">
                  Join Student Space today
                </span>
              </div>
              <form
                method="post"
                action="/api/auth/callback/credentials"
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-8 w-full"
              >
                <ToastContainer
                  position="bottom-left"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <InputWithLabel
                  label="Name"
                  type="text"
                  value={fullName}
                  onChange={handleFullNameChange}
                  error={errors.fullName}
                />
                <InputWithLabel
                  label="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  error={errors.username}
                />
                {suggestions.length > 0 && (
                  <div className="flex flex-col">
                    <span className="text-green-500">suggestions</span>
                    <div className="flex gap-2">
                      {suggestions.map((suggestion) => (
                        <span
                          onClick={() => {
                            setUsername(suggestion);
                            clearError("username");
                            setSuggestions([]);
                          }}
                          className="text-white md:text-black flex-wrap text-sm"
                        >
                          {suggestion}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <InputWithLabel
                  label="Email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={errors.email}
                />
                <InputWithLabel
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={errors.password}
                />
                <InputWithLabel
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={errors.confirmPassword}
                />
                <button type="submit" className="bStyle">
                  <div className="flex justify-between px-5">
                    <span>Sign up</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g transform="rotate(90 12 12)">
                        <g fill="none">
                          <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                          <path
                            fill="currentColor"
                            d="M13.06 3.283a1.5 1.5 0 0 0-2.12 0L5.281 8.939a1.5 1.5 0 0 0 2.122 2.122L10.5 7.965V19.5a1.5 1.5 0 0 0 3 0V7.965l3.096 3.096a1.5 1.5 0 1 0 2.122-2.122L13.06 3.283Z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </button>
                {loading && (
                  <div className="w-8 h-8 border-4 border-t-transparent border-blue-200 rounded-full animate-spin"></div>
                )}
                <Link
                  href={"/auth/login"}
                  className="text-xs text-white md:text-dark opacity-80 cursor-pointer md:hover:text-primary-800 hover:font-semibold"
                >
                  Already have an acouunt? Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
