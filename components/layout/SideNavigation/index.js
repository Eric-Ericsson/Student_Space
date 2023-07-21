import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { containerZIndex } from "@components/atom/modalAtom";
import { useRecoilState } from "recoil"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@components/firebase";


const SideNav = ({ path, session }) => {
  const [activeButton, setActiveButton] = useState(path);
  const [conZIndex] = useRecoilState(containerZIndex);
  const [user, setuser] = useState(null);

//retrieving a single user
useEffect(() => {
  if (session?.user?.uid) {
    const unsubscribe = onSnapshot(doc(db, "users", session?.user?.uid), (snapshot) => {
      setuser(snapshot.data())
    }
    );
    return () => unsubscribe();
  }
}, [db, session?.user?.uid]);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  return (
    <div className={`${conZIndex} w-full sm:border-r-[1px] sm:w-16 md:w-24 lg:w-56 bg-white sm:h-screen fixed bottom-0 sm:bottom-auto flex sm:flex-col sm:gap-5 items-center lg:items-start sm:border-l-[1px] sm:mt-12 md:mt-20 py-1 text-xl font-thin`}>
      {/*Home button */}
      <Link
        href="/space"
        onClick={() => handleButtonClick("/space")}
        className="w-full group flex items-center justify-center lg:justify-start cursor-pointer"
      >
        <div className="lg:inline-flex flex items-center justify-center gap-3 group-hover:bg-gray-300 group-hover:rounded-3xl lg:pl-3 lg:pr-6 lg:py-3 p-2">
          <svg
            className={`${
              activeButton == "/space"
                ? "fill-[#012432] stroke-[#012432] stroke-[2]"
                : "fill-black"
            } `}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path d="M19.5 10a.5.5 0 0 0-1 0h1Zm-14 0a.5.5 0 0 0-1 0h1Zm15.146 2.354a.5.5 0 0 0 .708-.708l-.708.708ZM12 3l.354-.354a.5.5 0 0 0-.708 0L12 3Zm-9.354 8.646a.5.5 0 0 0 .708.708l-.708-.708ZM7 21.5h10v-1H7v1ZM19.5 19v-9h-1v9h1Zm-14 0v-9h-1v9h1Zm15.854-7.354l-9-9l-.708.708l9 9l.708-.708Zm-9.708-9l-9 9l.708.708l9-9l-.708-.708ZM17 21.5a2.5 2.5 0 0 0 2.5-2.5h-1a1.5 1.5 0 0 1-1.5 1.5v1Zm-10-1A1.5 1.5 0 0 1 5.5 19h-1A2.5 2.5 0 0 0 7 21.5v-1Z" />
          </svg>
          <span
            className={`hidden lg:inline ${
              activeButton == "/space" && "font-bold"
            }`}
          >
            Home
          </span>
        </div>
      </Link>
      {/*Explore button */}
      <div
        onClick={() => handleButtonClick("/explore")}
        className="w-full group flex items-center justify-center lg:justify-start cursor-pointer"
      >
        <div className="lg:inline-flex flex items-center justify-center gap-3 group-hover:bg-gray-300 group-hover:rounded-3xl lg:pl-3 lg:pr-6 lg:py-3 p-2">
          <svg
            className={`${
              activeButton == "/explore"
                ? "fill-[#012432]"
                : "fill-none stroke-[#012432]"
            } `}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path d="M19.3 16.9c.58-1.01.95-2.23.51-3.65c-.53-1.72-2.04-3.05-3.84-3.22a4.498 4.498 0 0 0-4.95 4.95c.18 1.79 1.5 3.31 3.22 3.84c1.43.44 2.64.07 3.65-.51l2.5 2.5c.39.39 1.01.39 1.4 0a.984.984 0 0 0 0-1.4L19.3 16.9zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM12 20v2C6.48 22 2 17.52 2 12S6.48 2 12 2c4.84 0 8.87 3.44 9.8 8h-2.07A8 8 0 0 0 15 4.59V5c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1H8v2h2v3H9l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.41 3.59 8 8 8z" />
          </svg>
          <span
            className={`hidden lg:inline ${
              activeButton == "/explore" && "font-bold"
            }`}
          >
            Explore
          </span>
        </div>
      </div>
      {/*Profile button */}
      <Link
        href={`/profile/${session?.user?.uid}`}
        onClick={() => handleButtonClick(`/profile/${session?.user?.uid}`)}
        className="w-full group flex items-center justify-center lg:justify-start cursor-pointer"
      >
        <div className="lg:inline-flex flex items-center justify-center gap-3 group-hover:bg-gray-300 group-hover:rounded-3xl lg:pl-3 lg:pr-6 lg:py-3 p-2">
          <svg
            className={`${
              activeButton == `/profile/${session?.user?.uid}`
                ? "fill-[#012432] stroke-[#012432]"
                : "fill-none stroke-[#012432]"
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
          <span
            className={`hidden lg:inline ${
              activeButton == `/profile/${session?.user?.uid}` && "font-bold"
            }`}
          >
            Profile
          </span>
        </div>
      </Link>
      {/*Post button */}
      <div
        onClick={() => handleButtonClick("post")}
        className="w-full group flex items-center justify-center lg:justify-start cursor-pointer"
      >
        <div className="lg:inline-flex flex items-center justify-center gap-3 group-hover:bg-gray-300 group-hover:rounded-3xl lg:pl-3 lg:pr-6 lg:py-3 p-2">
          <svg
            className={`${
              activeButton == "/post"
                ? "fill-none stroke-[#012432] stroke-[24]"
                : "fill-none stroke-current stroke-[8]"
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
            >
              <circle id="galaAdd1" cx="128" cy="128" r="112" />
              <path id="galaAdd2" d="M 79.999992,128 H 176.0001" />
              <path id="galaAdd3" d="m 128.00004,79.99995 v 96.0001" />
            </g>
          </svg>
          <span
            className={`hidden lg:inline ${
              activeButton == "/post" && "font-bold"
            }`}
          >
            Post
          </span>
        </div>
      </div>
      {/* User button*/}
      <div
        onClick={() => handleButtonClick("user")}
        className="w-full hidden sm:flex absolute bottom-24 group cursor-pointer items-center justify-center lg:justify-start"
      >
        <div className="lg:inline-flex flex items-center justify-center gap-3 group-hover:bg-gray-300 group-hover:rounded-3xl lg:pl-3 lg:pr-6 lg:py-2 p-2 text-base">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg">
            {user?.profileImage === "" ? (
              <div className="w-full h-full flex items-center justify-center text-2xl rounded-md font-semibold bg-blue-600 text-white">
                {user?.name.charAt(0)}
              </div>
            ) : (
              <Image
                className="rounded-lg"
                src={user?.profileImage}
                fill="true"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                alt="profile image"
              />
            )}
          </div>
          <div
            className={`hidden lg:inline ${
              activeButton == "user" && "font-bold"
            }`}
          >
            <span className="font-bold line-clamp-1">
              {user?.name}
            </span>{" "}
            <span className="opacity-75 text-sm line-clamp-1">
              @{user?.username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
