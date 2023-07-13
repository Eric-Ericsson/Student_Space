import InputWithLabel from "@components/components/layout/inputWithLabel";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    let error = "";
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      error = "Email is required";
    } else if (!emailPattern.test(email)) {
      return "Invalid email address";
    }
    return error;
  };

  const validatePassword = () => {
    let error = "";
    if (!password) {
      error = "Password is required";
    }
    return error;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    clearError("email");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    clearError("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail();
    const passwordError = validatePassword();

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result.error) {
        setLoading(false);
        toast.error("incorrect email or password");
        console.log(result.error);
      } else {
        setLoading(false);
        toast.success("login successfull");
        router.push("/");
      }
    }
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  return (
    <div>
      <div className="grid md:grid-cols-2">
        <div className="bg-[url('/signup_bg.jpg')] bg-no-repeat bg-cover bg-center">
          <div className="bg-[#243b76] bg-opacity-95 md:bg-white w-full h-screen flex flex-cols items-center">
            <div className="flex flex-col items-center md:px-16 w-full">
              <div className="flex flex-col items-center md:px-16 w-full">
                <div className="flex flex-col items-center gap-3">
                  <div>
                    <svg
                      className="w-14 h-20"
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
                  <span className="font-[Poppins] font-semibold text-2xl sm:text-3xl text-center text-white md:text-[#012E40] opacity-90;">
                    Welcome Back
                  </span>
                  <span className="font-bold text-[20px] text-white md:text-primary-900">
                    Log in
                  </span>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center gap-8 my-5 w-full"
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
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={errors.email}
                  />
                  <InputWithLabel
                    label="Password"
                    id='login'
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={errors.password}
                  />
                  <button type="submit" className="bStyle">
                    <div className="flex justify-between px-5">
                      <span>log in</span>
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
                    <div class="w-8 h-8 border-4 border-t-transparent border-blue-200 rounded-full animate-spin"></div>
                  )}
                  <Link
                    href={"/auth/signup"}
                    className="text-xs text-white md:text-dark opacity-80 cursor-pointer md:hover:text-primary-800 hover:font-semibold"
                  >
                    Don't have an acouunt? Sign up
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default LoginPage;
