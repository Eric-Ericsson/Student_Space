import LayoutCover from "@components/components/layout/LayoutCover";
import React, { useEffect, useRef, useState } from "react";

function Homepage() {
  const [clampedUsername, setClampedUsername] = useState(
    "Eric Ericcson @ericericsson39"
  );
  const [activeTabSPace, SetActiveTabSPace] = useState(true);
  const [activeTabFollowing, SetActiveTabFollowing] = useState(false);
  const [activeButton, setActiveButton] = useState("home");

  const users = [
    {
      id: 1,
      full_name: "Eric Ericsson",
      username: "ericericsson39",
      content:
        "I'll take you on a thrilling adventure through the breathtaking landscapes and hidden gems of nature. From hiking majestic mountains to discovering serene lakes, get ready to be inspired by the wonders of the great outdoors.",
      profile_icon: " ",
    },
    {
      id: 2,
      full_name: "Marcus Green",
      username: "@margreen",
      content:
        "Join me as I embark on a journey to explore the ancient cities of the world. From the magnificent ruins of Machu Picchu to the enchanting streets of Petra, get ready to be transported through time and witness the rich history and cultural heritage of these remarkable destinations.",
      profile_icon: " ",
    },
    {
      id: 3,
      full_name: "Ruth Mensah",
      username: "@rm231",
      content:
        "Get ready to tantalize your taste buds as I delve into the world of culinary delights. From savoring mouthwatering street food to indulging in gourmet cuisine, join me on this gastronomic journey where flavors and aromas come alive, leaving a lasting impression on your palate.",
      profile_icon: " ",
    },
    {
      id: 4,
      full_name: "Daniel Frimpong",
      username: "@danielfrimpong",
      content:
        "Dive into the ever-evolving world of technology as I explore the latest innovations and groundbreaking advancements that are shaping our future. From AI-powered robots to virtual reality experiences, discover how these technological marvels are revolutionizing industries and transforming our lives.",
      profile_icon: " ",
    },
  ];

  useEffect(() => {
    const originalText = clampedUsername;
    const words = originalText.split(" ");

    let clampedText = "";
    let clampedIndex = 0;

    // Manually adjust the desired word limits
    const maxWords = 3; // Number of words before the ellipsis
    const maxWordLength = 5; // Maximum length of each word
    // console.log(words)

    for (let i = 0; i < maxWords; i++) {
      const word = words[i];

      if (word.length > maxWordLength) {
        clampedText += word.substring(0, maxWordLength) + ".";
      } else {
        clampedText += word;
      }

      if (i < maxWords - 1) {
        clampedText += " ";
      }
    }

    setClampedUsername(clampedText);
  }, []);
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleActiveTab = (tab) => {
    if (tab == "space") {
      SetActiveTabSPace(true);
      SetActiveTabFollowing(false);
    } else {
      SetActiveTabSPace(false);
      SetActiveTabFollowing(true);
    }
  };

  return (
    <LayoutCover>
      <div className="relative sm:mx-8 md:mx-20 lg:mx-40 flex">
        <div className="w-full sm:w-16 md:w-24 lg:w-56 bg-white sm:h-screen fixed bottom-0 sm:bottom-auto flex sm:flex-col sm:gap-5 items-center lg:items-start sm:border-l-[1px] sm:mt-12 md:mt-20 py-1 text-xl font-thin">
          <div
            onClick={() => handleButtonClick("home")}
            className="w-full group flex items-center justify-center lg:justify-start"
          >
            <div className="lg:inline-flex flex items-center justify-center gap-3 group-hover:bg-gray-300 group-hover:rounded-3xl lg:pl-3 lg:pr-6 lg:py-3 p-2">
              <svg
                className={`${
                  activeButton == "home" ? "fill-[#012432] stroke-[#012432]" : "fill-black"
                } `}
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path d="M19.5 10a.5.5 0 0 0-1 0h1Zm-14 0a.5.5 0 0 0-1 0h1Zm15.146 2.354a.5.5 0 0 0 .708-.708l-.708.708ZM12 3l.354-.354a.5.5 0 0 0-.708 0L12 3Zm-9.354 8.646a.5.5 0 0 0 .708.708l-.708-.708ZM7 21.5h10v-1H7v1ZM19.5 19v-9h-1v9h1Zm-14 0v-9h-1v9h1Zm15.854-7.354l-9-9l-.708.708l9 9l.708-.708Zm-9.708-9l-9 9l.708.708l9-9l-.708-.708ZM17 21.5a2.5 2.5 0 0 0 2.5-2.5h-1a1.5 1.5 0 0 1-1.5 1.5v1Zm-10-1A1.5 1.5 0 0 1 5.5 19h-1A2.5 2.5 0 0 0 7 21.5v-1Z" />
              </svg>
              <span className={`hidden lg:inline ${activeButton == 'home' && 'font-bold'}`}>Home</span>
            </div>
          </div>
          <div
            onClick={() => handleButtonClick("explore")}
            className="w-full group flex items-center justify-center lg:justify-start"
          >
            <div className="lg:inline-flex flex items-center justify-center gap-3 group-hover:bg-gray-300 group-hover:rounded-3xl lg:pl-3 lg:pr-6 lg:py-3 p-2">
              <svg
                className={`${
                  activeButton == "explore" ? "fill-[#012432]" : "fill-black"
                } `}
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path d="M19.3 16.9c.58-1.01.95-2.23.51-3.65c-.53-1.72-2.04-3.05-3.84-3.22a4.498 4.498 0 0 0-4.95 4.95c.18 1.79 1.5 3.31 3.22 3.84c1.43.44 2.64.07 3.65-.51l2.5 2.5c.39.39 1.01.39 1.4 0a.984.984 0 0 0 0-1.4L19.3 16.9zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM12 20v2C6.48 22 2 17.52 2 12S6.48 2 12 2c4.84 0 8.87 3.44 9.8 8h-2.07A8 8 0 0 0 15 4.59V5c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1H8v2h2v3H9l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.41 3.59 8 8 8z" />
              </svg>
              <span className={`hidden lg:inline ${activeButton == 'explore' && 'font-bold'}`}>Explore</span>
            </div>
          </div>
          <div
            onClick={() => handleButtonClick("profile")}
            className="w-full group flex items-center justify-center lg:justify-start"
          >
            <div className="lg:inline-flex flex items-center justify-center gap-3 group-hover:bg-gray-300 group-hover:rounded-3xl lg:pl-3 lg:pr-6 lg:py-3 p-2">
              <svg
                className={`${
                  activeButton == "profile"
                    ? "fill-[#012432] stroke-[#012432]"
                    : "fill-black"
                } `}
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <g>
                  <path
                    strokeLinejoin="round"
                    d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                  />
                  <circle cx="12" cy="7" r="3" />
                </g>
              </svg>
              <span className={`hidden lg:inline ${activeButton == 'profile' && 'font-bold'}`}>Profile</span>
            </div>
          </div>
          <div
            onClick={() => handleButtonClick("post")}
            className="w-full group flex items-center justify-center lg:justify-start"
          >
            <div className="lg:inline-flex flex items-center justify-center gap-3 group-hover:bg-gray-300 group-hover:rounded-3xl lg:pl-3 lg:pr-6 lg:py-3 p-2">
              <svg
                className={`${
                  activeButton == "post"
                    ? "fill-none stroke-[#012432]"
                    : "fill-none stroke-current"
                } `}
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 256 256"
              >
                <g
                  id="galaAdd0"
                  strokeDasharray="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="4"
                  strokeOpacity="1"
                  strokeWidth="16"
                >
                  <circle id="galaAdd1" cx="128" cy="128" r="112" />
                  <path id="galaAdd2" d="M 79.999992,128 H 176.0001" />
                  <path id="galaAdd3" d="m 128.00004,79.99995 v 96.0001" />
                </g>
              </svg>
              <span className={`hidden lg:inline ${activeButton == 'post' && 'font-bold'}`}>Post</span>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="sm:ml-16 md:ml-24 lg:ml-56 border-l-[1px] border-r-[1px] border-gray-300">
          <div className="bg-light sticky top-2 sm:top-5 z-10 grid grid-cols-2 border-b-[1px] border-gray-300 pt-2 h-24 sm:h-28 w-full text-[15px]">
            <button
              onClick={() => handleActiveTab("space")}
              className={`font-semibold self-end pt-10 pb-3 ${
                activeTabSPace && "underline"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px] hover:bg-gray-200`}
            >
              Space
            </button>
            <button
              onClick={handleActiveTab}
              className={`font-semibold self-end pt-10 hover:bg-gray-300 pb-3 ${
                activeTabFollowing && "underline"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px]`}
            >
              Following
            </button>
          </div>

          <div className="mb-5 sm:mb-0 sm:mx-10 mx-2 grid grid-cols-12 mt-6 sm:mt-14">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black"></div>
            <div className="col-span-11 ml-6 flex flex-col sm:gap-4">
              <div className="flex flex-col gap-4 sm:mb-4">
                <div>
                  <span className="heading">Let's find out</span>
                </div>
                <input
                  className="inputField h-2 inputFieldContainer"
                  type="text"
                />
                <div className="flex gap-2 sm:gap-5">
                  <button className="hover:bg-blue-200 w-5 sm:w-8 h-5 sm:h-8 bg-black rounded-full">
                    ic
                  </button>
                  <button className="hover:bg-blue-200 w-5 sm:w-8 h-5 sm:h-8 bg-black rounded-full">
                    ic
                  </button>
                  <button className="hover:bg-blue-200 w-5 sm:w-8 h-5 sm:h-8 bg-black rounded-full">
                    ic
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-12 sm:mb-0">
            {users.map((slide, index) => (
              <div
                key={index}
                className="border-t-[1px] sm:border-collapse py-4 sm:py-8 border-gray-300 sm:px-10 px-2 grid grid-cols-12"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black"></div>
                <div className="col-span-11 ml-6 flex flex-col sm:gap-4">
                  <div className="text-xs sm:text-[15px]">
                    <div className="sm:hidden ">{slide.full_name}</div>
                    <div className="hidden sm:inline lime line-clamp-1">
                      {slide.username}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 text-sm sm:text-[15px] ">
                    <span className="line-clamp-5">{slide.content}</span>
                    <div className="w-full h-36 sm:h-72 md:h-96 bg-black rounded-2xl"></div>
                  </div>
                  <div>Icons</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutCover>
  );
}

export default Homepage;
