import { useSession } from "next-auth/react";
import Link from "next/link";

const SideLine = () => {
  const { data: session } = useSession();

  return (
    <div className="contain-content mb-10 h-60 sm:h-96 flex items-center bg-[#024959] text-light rounded-md">
      <div className="flex items-center justify-between w-full px-4 md:px-10">
        <div className="flex flex-col font-semibold gap-4">
          <span className="text-2xl sm:text-4xl">
            Suddenly, It's All Within{" "}
            <span className="font-[playball]">reach</span>
          </span>
          <Link href={`${session?.user ? '/space' : '/auth/signin'}`}>
          <button
              className={`group font-medium tracking-wide select-none overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 hover:text-white h-10 border-[1px] border-solid px-8 rounded-3xl relative inline-flex items-center justify-center bg-white text-blue-600 border-blue-600`}
            >
              <strong className="font-bold text-xs sm:text-sm">Join Student Space</strong>
              <span className="absolute bg-blue-600 bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1]"></span>
            </button>
          </Link>
        </div>
        <div className="hidden md:inline">
          <svg
            className="md:w-60 lg:w-72 md:h-60 lg:h-72"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 84.85 109.92"
          >
            <g data-name="Layer 2">
              <path
                d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z"
                style={{
                  fill: "#fff",
                }}
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SideLine;
