import LayoutCover from "@components/components/layout/LayoutCover";
import SideNav from "@components/components/layout/SideNavigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import PostsData from "@components/components/space/Posts";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@components/firebase";
import { useSession } from "next-auth/react";

function Profile() {
  const router = useRouter();

  const [clampedUsername, setClampedUsername] = useState(
    "Eric Ericcson @ericericsson39"
  );
  const [activeTab, SetActiveTab] = useState("post");
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

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

  const handleActiveTab = (activetab) => {
    SetActiveTab(activetab);
  };

  return (
    <LayoutCover>
      <div className="relative mx-2 sm:mx-8 md:mx-20 lg:mx-40 border-[1px] min-h-screen">
        <SideNav path={router.pathname} session={session} />
        {/* Profile Section */}
        <div class="mt-14 sm:ml-16 md:ml-24 lg:ml-56 border-b-[1px] border-gray-300">
          <div className="relative w-full bg-gray-100 h-28 sm:h-44">
            {/* cover image */}
            <div> </div>
            <div className="absolute top-[60%] sm:top-[50%] left-5 w-20 sm:w-44 h-20 sm:h-44 rounded-full bg-gray-200">
              {session?.user.image === "" ? (
                <div className="w-full h-full flex items-center justify-center text-lg sm:text-2xl rounded-md sm:font-semibold bg-blue-600 text-white">
                  {session?.user.name.charAt(0)}
                </div>
              ) : (
                <Image
                  className="rounded-lg"
                  src={session?.user.image}
                  fill="true"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                  alt="profile image"
                />
              )}
            </div>
            <div className="absolute -bottom-16 right-4 sm:right-10">
              <div class="max-w-md mx-auto space-y-6 flex justify-center">
                <button className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-10 border-2 border-solid py-0 px-2 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500">
                  <strong className="font-medium text-sm">Edit Profile</strong>
                  <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-28 grid grid-cols-6 mx-2 text-sm sm:text-[15px]">
            <div className="col-span-4 flex flex-col gap-2 sm:ml-6">
              <div className="flex flex-col">
                <span className="font-semibold text-base md:text-[20px]">
                  {session?.user.name}
                </span>
                <span>@{session?.user.username}</span>
              </div>
              <span className="text-xs">
                Kwame Nkhrumah University of Science and Technology
              </span>
            </div>
            <div className="col-span-2">
              <span>Contact Info</span>
              <div className="flex space-x-2 text-xs">
                <span>Follow</span>
                <span>Following</span>
              </div>
            </div>
          </div>
          <div className="backdrop-blur-lg bg-white/30 sticky top-2 sm:top-5 z-10 grid grid-cols-4 pt-2 h-24 sm:h-28 w-full text-[15px]">
            <button
              onClick={() => handleActiveTab("post")}
              className={`font-semibold self-end pt-4 pb-3 ${
                activeTab == "post" ? "underline font-semibold" : "font-normal"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px] hover:bg-slate-100 hover:bg-opacity-70`}
            >
              Post
            </button>
            <button
              onClick={() => handleActiveTab("reply")}
              className={`font-semibold self-end pt-4 pb-3 ${
                activeTab == "reply" ? "underline font-semibold" : "font-normal"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px] hover:bg-slate-100 hover:bg-opacity-70`}
            >
              Replies
            </button>
            <button
              onClick={() => handleActiveTab("media")}
              className={`font-semibold self-end pt-4 pb-3 ${
                activeTab == "media" ? "underline font-semibold" : "font-normal"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px] hover:bg-slate-100 hover:bg-opacity-70`}
            >
              Media
            </button>
            <button
              onClick={() => handleActiveTab("likes")}
              className={`font-semibold self-end pt-4 hover:bg-slate-100 hover:bg-opacity-70 pb-3 ${
                activeTab == "likes" ? "underline font-semibold" : "font-normal"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px]`}
            >
              Likes
            </button>
          </div>
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                className="sm:mb-0"
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <PostsData post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </LayoutCover>
  );
}

export default Profile;
