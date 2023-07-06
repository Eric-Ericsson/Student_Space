import Link from "next/link";

const SideLine = () => {
  return (
    <div className="contain-content mb-10 h-60 sm:h-96 flex items-center bg-[#024959] text-light rounded-md">
      <div className="flex items-center justify-between w-full px-4 md:px-10">
        <div className="flex flex-col font-semibold gap-4">
          <span className="text-2xl sm:text-4xl">
            Suddenly, It's All Within{" "}
            <span className="font-[playball]">reach</span>
          </span>
          <Link href={"/auth/sigin"}>
            <button className="bg-green-700 text-sm sm:text-base w-40 p-2 rounded">
              Join Student Space
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
