import LayoutCover from "@components/components/layout/LayoutCover";
import SideNav from "@components/components/layout/SideNavigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@components/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function Homepage() {
  const router = useRouter();
  const filePickerRef = useRef();
  const { data: session } = useSession();
  const textareaRef = useRef(null);
  const [clampedUsername, setClampedUsername] = useState(
    "Eric Ericcson @ericericsson39"
  );
  const [activeTabSPace, SetActiveTabSPace] = useState(true);
  const [activeTabFollowing, SetActiveTabFollowing] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const sendPost = async () => {
    if(loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: postContent,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setPostContent("");
    setSelectedFile(null);
    setLoading(false);
  };

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

  useEffect(() => {
    adjustTextareaHeight();
  }, [postContent]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTextareaChange = (event) => {
    setPostContent(event?.target?.value ?? "");
    // setTextareaValue(event.target.value);
    setTextareaRows(event.target.value.split("\n").length);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
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
        <SideNav path={router.pathname} session={session} />
        {/* Main content */}
        <div className="sm:ml-16 md:ml-24 lg:ml-56 border-l-[1px] border-r-[1px] border-gray-300">
          <div className="backdrop-blur-lg bg-white/30 sticky top-2 sm:top-5 z-10 grid grid-cols-2 border-b-[1px] border-gray-300 pt-2 h-24 sm:h-28 w-full text-[15px]">
            <button
              onClick={() => handleActiveTab("space")}
              className={`font-semibold self-end pt-10 pb-3 ${
                activeTabSPace ? "underline font-semibold" : "font-normal"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px] hover:bg-slate-100 hover:bg-opacity-70`}
            >
              Space
            </button>
            <button
              onClick={handleActiveTab}
              className={`font-semibold self-end pt-10 hover:bg-slate-100 hover:bg-opacity-70 pb-3 ${
                activeTabFollowing ? "underline font-semibold" : "font-normal"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px]`}
            >
              Following
            </button>
          </div>

          <div className="mb-5 sm:mb-0 sm:mx-10 mx-2 grid grid-cols-12 mt-6 sm:mt-14">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-lg">
              <Image
                className="rounded-lg"
                src={session ? session.user.image : "/art_design.jpg"}
                fill="true"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                alt="profile image"
              />
            </div>
            <div className="col-span-11 ml-2 sm:ml-5 flex flex-col sm:gap-4">
              <div className="flex flex-col gap-4 sm:mb-4">
                <div>
                  <span className="heading">Let's find out</span>
                </div>
                <textarea
                  ref={textareaRef}
                  value={postContent}
                  onChange={handleTextareaChange}
                  className="w-full h-10 bg-white resize-none example border-b-[1px] focus:outline-none focus:border-b-secondary text-sm sm:text-base placeholder:text-xs"
                  type="text"
                  rows={textareaRows}
                  placeholder="enter your post"
                ></textarea>
                {selectedFile && (
                  <div className="relative">
                    <svg onClick={() => setSelectedFile(null)} className="absolute inset-2 cursor-pointer drop-shadow-md" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="white" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"/></svg>
                  <img src={selectedFile} className={`${loading && 'animate-pulse'}`}/>
                  </div>
                )}
                {!loading && (

                <div className="flex justify-between">
                  <div className="flex gap-2 sm:gap-5">
                    <div onClick={() => filePickerRef.current.click()}>
                      <button className="hover:bg-blue-200 p-2 gap-1 text-xs rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#243b76"
                            d="M5 3h13a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v11.59l4.29-4.3l2.5 2.5l5-5L20 16V6a2 2 0 0 0-2-2H5m4.79 13.21l-2.5-2.5L3 19a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-1.59l-5.21-5.2l-5 5M7.5 6A2.5 2.5 0 0 1 10 8.5A2.5 2.5 0 0 1 7.5 11A2.5 2.5 0 0 1 5 8.5A2.5 2.5 0 0 1 7.5 6m0 1A1.5 1.5 0 0 0 6 8.5A1.5 1.5 0 0 0 7.5 10A1.5 1.5 0 0 0 9 8.5A1.5 1.5 0 0 0 7.5 7Z"
                          />
                        </svg>{" "}
                        image
                      </button>
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <button className="hover:bg-red-200 p-2 gap-1 text-xs rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#243b76"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="4" />
                          <path d="m15 12l-5-3v6l5-3Z" />
                        </g>
                      </svg>{" "}
                      video
                    </button>
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!postContent.trim()}
                    className={`bg-[#243b76] rounded-full px-8 ${
                      postContent.trim() == ""
                        ? "bg-opacity-70 disabled"
                        : "bg-opacity-100"
                    }  text-white`}
                  >
                    post
                  </button>
                </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-12 sm:mb-0">
            {users.map((slide, index) => (
              <div
                key={index}
                className="hover:bg-gray-100 cursor-pointer border-t-[1px] sm:border-collapse py-4 sm:py-8 border-gray-300 sm:px-10 px-2 grid grid-cols-12"
              >
                <Link href={"/profile"}>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg relative">
                    <Image
                      className="rounded-lg"
                      src={slide.profile_icon}
                      fill="true"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                      alt="profile image"
                    />
                  </div>
                </Link>
                <div className="col-span-11 ml-2 sm:ml-5 flex flex-col sm:gap-4">
                  <div className="flex gap-2 line-climp-1 text-xs sm:text-[15px] font-bold">
                    <div className="">{slide.full_name}</div>
                    <div className="">{slide.username}</div>
                  </div>
                  <div className="flex flex-col gap-4 text-sm sm:text-[15px] ">
                    <span className="line-clamp-5">{slide.content}</span>
                    <div
                      className={`${
                        slide.resource == "" ? "hidden" : "image-container"
                      } `}
                    >
                      <img
                        src={slide.resource}
                        alt="Image"
                        className="imageClass"
                      />
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
                      <span>{slide.comment}</span>
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
                      <span>{slide.likes}</span>
                    </div>
                  </div>
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
