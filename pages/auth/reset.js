import Link from "next/link";
import { useState } from "react";
import { auth } from "@components/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Reset = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const emailError = validateEmail();
    setErrors(emailError);
    if (!errors && email) {
      setLoading(true);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setLoading(false);
          toast.info("Check your email to reset password");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error("Check your email");
        });
    }
  };

  return (
    <div className="h-screen m-auto flex items-center justify-center">
      <form
        onSubmit={handlePasswordReset}
        className="bg-white w-[80%] sm:w-[60%] md:w-[50%] lg:w-96 border-[1px] drop-shadow-xl flex flex-col items-center gap-8 my-5 p-10 rounded-lg"
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
        <div>
          <svg
            className="w-12 h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 84.85 109.92"
          >
            <g className="fill-white md:fill-[#243b76]" data-name="Layer 2">
              <path d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z" />
            </g>
          </svg>
        </div>
        <div>
          <span className="heading">Password Reset</span>
        </div>
        <div className="space-y-2 w-full">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="enter your email"
            className="inputField"
          />
          <div
            className={`${
              errors ? "inline" : "hidden"
            } text-red-500 text-xs mt-1`}
          >
            <span>{errors}</span>
          </div>
        </div>
        <button type="submit" className="bStyle">
          <div className="flex justify-between px-5">
            <span>Submit</span>
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
        <div
          onClick={() => router.replace('/auth/login')}
          className="text-xs text-dark opacity-80 cursor-pointer md:hover:text-primary-800 hover:font-semibold"
        >
          Back to login
        </div>
      </form>
    </div>
  );
};

export default Reset;
