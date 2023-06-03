import { useEffect, useState } from "react";

const MainNavigation = () => {
  const [scrollHeight, setScrollHeight] = useState("on top");
  const [openMenu, setOPenMenu] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const totalScrollHeight = scrollHeight - scrollTop - clientHeight;
      setScrollHeight(totalScrollHeight);

      if (totalScrollHeight == 168) {
        setScrollHeight("on top");
        // console.log(totalScrollHeight)
      } else {
        setScrollHeight("not on top");
        // console.log(totalScrollHeight)
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuButtonClick = () => {
    setOPenMenu(!openMenu);
  };

  return (
    <>
      <div
        className={`${
          scrollHeight == "on top"
            ? "bg-transparent z-50 text-white"
            : "bg-white z-10 drop-shadow-md"
        } ease-out delay-75 duration-300 fixed flex items-center justify-between px-4 md:px-10 w-full h-20`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 84.85 109.92"
            >
              <g data-name="Layer 2">
                <path
                  d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z"
                  style={{
                    fill: "#243b76",
                  }}
                />
              </g>
            </svg>
            <span className="">Student Space</span>
          </div>
          <div className={`${scrollHeight == "on top" && "hidden"}`}>
            <input
              className="hidden lg:inline inputField inputFieldContainer placeholder:italic"
              placeholder="What are you interested today?"
            />
          </div>
        </div>
        <button onClick={handleMenuButtonClick} className="md:hidden">
          menu
        </button>
        <div className="hidden md:flex items-center gap-8 font-semibold">
          <span>Home</span>
          <span>Explore</span>
          <span>Business</span>
          <span>Sign In</span>
        </div>
      </div>
      {openMenu && (
        <div className="fixed w-full z-50 bg-blue-950 opacity-100 h-1/2 flex flex-col justify-center">
          <button
            onClick={handleMenuButtonClick}
            className="absolute top-[10%] right-[12%]"
          >
            x
          </button>
          <div className="text-light flex flex-col items-center gap-8 font-semibold">
            <span>Home</span>
            <span>Explore</span>
            <span>Business</span>
            <span>Sign In</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavigation;
