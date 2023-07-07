import { db } from "@components/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PostsData = () => {
  const [posts, setPosts] = useState([]);
  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")),
    (snapshot) => {
      setPosts(snapshot.docs);
    }),
    []
  );
  const users = [
    {
      id: 1,
      full_name: "Eric Ericsson",
      username: "@ericericsson39",
      content:
        "I'll take you on a thrilling adventure through the breathtaking landscapes and hidden gems of nature. From hiking majestic mountains to discovering serene lakes, get ready to be inspired by the wonders of the great outdoors.",
      profile_icon: "/ai.jpg",
      resource: "",
      likes: "2",
      comment: "43",
    },
    {
      id: 2,
      full_name: "Marcus Green",
      username: "@margreen",
      content:
        "Join me as I embark on a journey to explore the ancient cities of the world. From the magnificent ruins of Machu Picchu to the enchanting streets of Petra, get ready to be transported through time and witness the rich history and cultural heritage of these remarkable destinations.",
      profile_icon: "/fashion.jpg",
      resource: "/artist.png",
      likes: "132",
      comment: "1",
    },
    {
      id: 3,
      full_name: "Ruth Mensah",
      username: "@rm231",
      content:
        "Get ready to tantalize your taste buds as I delve into the world of culinary delights. From savoring mouthwatering street food to indulging in gourmet cuisine, join me on this gastronomic journey where flavors and aromas come alive, leaving a lasting impression on your palate.",
      profile_icon: "/art_design.jpg",
      resource: "",
      likes: "54",
      comment: "1.6K",
    },
    {
      id: 4,
      full_name: "Daniel Frimpong",
      username: "@danielfrimpong",
      content:
        "Dive into the ever-evolving world of technology as I explore the latest innovations and groundbreaking advancements that are shaping our future. From AI-powered robots to virtual reality experiences, discover how these technological marvels are revolutionizing industries and transforming our lives.",
      profile_icon: "/artist.png",
      resource: "/ai.jpg",
      likes: "98",
      comment: "123",
    },
  ];

  return (
    <div className="mb-12 sm:mb-0">
      {posts.map((slide, index) => (
        <div
          key={index}
          className="hover:bg-gray-100 cursor-pointer border-t-[1px] sm:border-collapse py-4 sm:py-8 border-gray-300 sm:px-10 px-2 grid grid-cols-12"
        >
          <Link href={"/profile"}>
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg relative">
              <Image
                className="rounded-lg"
                src={slide.data().userImg}
                fill="true"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                alt="profile image"
              />
            </div>
          </Link>
          <div className="col-span-11 ml-2 sm:ml-5 flex flex-col sm:gap-4">
            <div className="flex gap-2 line-climp-1 text-xs sm:text-[15px] font-bold">
              <div className="">{slide.data().name}</div>
              <div className="">@{slide.data().username}</div>
            </div>
            <div className="flex flex-col gap-4 text-sm sm:text-[15px] ">
              <span className="line-clamp-5">{slide.data().text}</span>
              <div
                className={`${
                  slide.data().image == "" ? "hidden" : "image-container"
                } `}
              >
                <img src={slide.data().image} alt="Image" className="imageClass" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center text-sm gap-1 group cursor-pointer opacity-80">
                <button className="group-hover:bg-blue-200 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.639 2.64 1 4.127 1Z"
                    />
                  </svg>
                </button>
                <span>12</span>
                {/* <span>{slide.comment}</span> */}
              </div>
              <div className="flex items-center text-sm gap-1 group cursor-pointer opacity-80">
                <button className="group-hover:bg-red-200 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8Z"
                    />
                  </svg>
                </button>
                <span>2</span>
                {/* <span>{slide.likes}</span> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsData;
