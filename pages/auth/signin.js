import Link from "next/link";
import { useState } from "react";

const GeneralPage = () => {
  const [isShown, setIsShown] = useState(false);

  const handleActiveLogin = (e) => {
    setIsShown(true);
  };

  const handleUnActiveLogin = () => {
    setIsShown("");
  };
  const handleActiveSignup = (e) => {
    setIsShown(false);
  };

  const handleUnActiveSignup = () => {
    setIsShown("");
  };

  return (
    <div className="bg-blue-600 w-full h-screen m-auto">
      <div className="grid md:grid-cols-2">
        <div className="hidden relative md:block bg-[url('/social_network_bg.jpg')] bg-no-repeat bg-cover bg-center">
          <div className="bg-[#243b76] bg-opacity-90 w-full h-screen flex items-center justify-center">
            <svg
              className="w-52 lg:w-60 h-56 lg:h-64"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 84.85 109.92"
            >
              <g className="fill-white" data-name="Layer 2">
                <path d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z" />
              </g>
            </svg>
          </div>
        </div>
        <div className="bg-[url('/social_network_bg.jpg')] bg-no-repeat bg-cover bg-center">
          <div className="bg-[#243b76] bg-opacity-95 md:bg-white w-full h-screen flex flex-cols items-center">
            <div className="ml-10 md:ml-16 w-full">
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
                <span className="font-[Poppins] font-semibold text-2xl sm:text-3xl text-white opacity-90">
                  Let's find out...
                </span>
                <span className="text-sm sm:text-[16px] text-light md:text-secondary_dark opacity-90">
                  Join Student Space today
                </span>
              </div>
              <div className="flex flex-col gap-5">
                <Link href={"/auth/signup"}>
                  <button
                    onMouseEnter={handleActiveSignup}
                    onMouseLeave={handleUnActiveSignup}
                    className={`${
                      isShown == false
                        ? "bg-blue-600 md:bg-primary-600 text-light font-[550] border-none"
                        : "border-[2px] text-primary-200 bg-white md:bg-none"
                    } rounded-3xl w-[90%] sm:w-[70%] md:w-[80%] lg:w-[60%] border-primary-600 md:border-primary-200 h-10 hover:border-[1px] font-[550] text-[16px]`}
                  >
                    Sign up
                  </button>
                </Link>
                <Link href={"/auth/login"}>
                  <button
                    onMouseEnter={handleActiveLogin}
                    onMouseLeave={handleUnActiveLogin}
                    className={`${
                      isShown == true
                        ? "bg-blue-600 md:bg-primary-600 text-white border-none shadow-md"
                        : "border-[2px] text-primary-200 bg-white"
                    } rounded-3xl w-[90%] sm:w-[70%] md:w-[80%] lg:w-[60%] border-primary-600 md:border-primary-200 h-10 font-[550] text-[16px]`}
                  >
                    Log in
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;