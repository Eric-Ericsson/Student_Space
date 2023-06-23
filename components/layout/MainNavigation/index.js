import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MainNavigation = ({isScrolled , iconColor}) => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuButtonClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div
        className={`${
          isScrolled
            ? "bg-white z-50 drop-shadow-sm"
            : "bg-transparent z-50 text-white"
        } ease-out delay-75 duration-300 fixed flex items-center justify-between px-4 md:px-10 w-full h-14 sm:16 md:h-20`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 84.85 109.92"
            >
              <g data-name="Layer 2">
                <path
                  d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z"
                  style={{
                    fill: iconColor,
                  }}
                />
              </g>
            </svg>
            <span className="font-semibold font-[Poppins]">Student Space</span>
          </div>
          <div className={`${!isScrolled && "hidden"}`}>
            <input
              className="hidden lg:inline inputField inputFieldContainer placeholder:italic"
              placeholder="What are you interested today?"
            />
          </div>
        </div>
        <button onClick={handleMenuButtonClick} className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke={iconColor}
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="48"
              d="M88 152h336M88 256h336M88 360h336"
            />
          </svg>
        </button>
        <div
          className={`hidden md:flex items-center gap-8 lg:gap-4 xl:gap-8 font-semibold font-[Poppins] ${
            !isScrolled && "text-white"
          } text-[#012E40] text-lg`}
        >
          <Link href="/">
            <span
              className={`hover:text-[#068B01] ${
                router.pathname == "/" && "text-[#068B01]"
              } hover:font-black`}
            >
              Home
            </span>
          </Link>
          <Link href="/space">
            <span
              className={`hover:text-[#068B01] ${
                router.pathname == "/space" && "text-[#068B01]"
              } hover:font-black`}
            >
              Space
            </span>
          </Link>
          <Link href="/exhibit">
            <span
              className={`hover:text-[#068B01] ${
                router.pathname == "/exhibit" && "text-[#068B01]"
              } hover:font-black`}
            >
              Exhibit
            </span>
          </Link>
          <Link href="/business">
            <span
              className={`hover:text-[#068B01] ${
                router.pathname == "/business" && "text-[#068B01]"
              } hover:font-black`}
            >
              Business
            </span>
          </Link>
          <Link href="/signup">
            <span
              className={`hover:text-[#068B01] ${
                router.pathname == "/signup" && "text-[#068B01]"
              } hover:font-black`}
            >
              Sign In
            </span>
          </Link>
        </div>
      </div>
      {openMenu && (
        <div
          className="fixed w-full z-50 bg-[#012432] rounded-br-3xl rounded-bl-3xl opacity-100 h-1/2 flex flex-col justify-center"
        >
          <button
            onClick={handleMenuButtonClick}
            className="absolute top-[4%] right-[5%]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="m7 7l10 10M7 17L17 7"
              />
            </svg>
          </button>
          <div className="text-light flex flex-col items-center gap-8 font-semibold">
            <Link href="/">
              <span
                className={`hover:text-[#068B01] ${
                  router.pathname == "/" && "text-[#068B01]"
                } hover:font-black`}
              >
                Home
              </span>
            </Link>
            <Link href="/space">
              <span
                className={`hover:text-[#068B01] ${
                  router.pathname == "/space" && "text-[#068B01]"
                } hover:font-black`}
              >
                Space
              </span>
            </Link>
            <Link href="/exhibit">
              <span
                className={`hover:text-[#068B01] ${
                  router.pathname == "/exhibit" && "text-[#068B01]"
                } hover:font-black`}
              >
                Exhibit
              </span>
            </Link>
            <Link href="/business">
              <span
                className={`hover:text-[#068B01] ${
                  router.pathname == "/business" && "text-[#068B01]"
                } hover:font-black`}
              >
                Business
              </span>
            </Link>
            <Link href="/signup">
              <span
                className={`hover:text-[#068B01] ${
                  router.pathname == "/signup" && "text-[#068B01]"
                } hover:font-black`}
              >
                Sign In
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavigation;
