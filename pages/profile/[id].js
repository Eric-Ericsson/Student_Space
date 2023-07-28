import LayoutCover from "@components/components/layout/LayoutCover";
import SideNav from "@components/components/layout/SideNavigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import PostsData from "@components/components/space/Posts";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@components/firebase";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  contactInfoModalState,
  containerZIndex,
  imageBannerModalState,
  imageCategory,
  profileModalState,
} from "@components/atom/modalAtom";
import LikeSection from "@components/components/space/likes";
import ReplySection from "@components/components/space/replies";
import MediaSection from "@components/components/space/media";

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, SetActiveTab] = useState("post");
  const [posts, setPosts] = useState([]);
  const [user, setuser] = useState(null);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    }
  });
  const [conZIndex] = useRecoilState(containerZIndex);
  const [openModal, setOpenModal] = useRecoilState(contactInfoModalState);
  const [openProfileModal, setOpenProfileModal] =
    useRecoilState(profileModalState);
  const [openImageBannerModal, setOpenImageBannerModal] = useRecoilState(
    imageBannerModalState
  );
  const [imageCat, setImageCat] = useRecoilState(imageCategory);

  //retrieving a single user
  useEffect(() => {
    if (id) {
      const unsubscribe = onSnapshot(doc(db, "users", id), (snapshot) => {
        setuser(snapshot.data());
      });
      return () => unsubscribe();
    }
  }, [db, id]);

  //Get posts for a particular user
  const getPostsForUser = async (id) => {
    try {
      const q = query(collection(db, "posts"), where("id", "==", id)); // Create a query to filter posts with matching userId
      const querySnapshot = await getDocs(q); // Get the snapshot of matching posts
  
      const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return posts;
    } catch (error) {
      return [];
    }
  }


  //Calling the get post with a useEffect
  useEffect(() => {
    getPostsForUser(id).then((userPosts) => {
      setPosts(userPosts);
    });
  }, [id]);

  const handleActiveTab = (activetab) => {
    SetActiveTab(activetab);
  };

  return (
    <LayoutCover title='profile | student space'>
      <div
        className={`relative mx-2 sm:mx-8 md:mx-20 lg:mx-40 border-[1px] min-h-screen ${conZIndex}`}
      >
        <SideNav path={'/profile'} session={session} />
        {/* Profile Section */}
        <div className="mt-14 sm:ml-16 md:ml-24 lg:ml-56 border-b-[1px] border-gray-300">
          <div className="relative w-full bg-gray-100 h-28 sm:h-44">
            {/* cover image */}
            <div className="bg-blue-200 opacity-80 w-full h-full absolute">
               {user && user?.bannerImage ? (
                <Image
                src={user?.bannerImage}
                fill="true"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                alt="image banner"
              />
              ) : (
                <div className="bg-blue-200 opacity-80 w-full h-full"></div>
              )}
            </div>
            {session?.user?.uid == id && (
              <button
                onClick={() => {
                  setOpenImageBannerModal(!openImageBannerModal);
                  setImageCat("bannerImage");
                }}
                className="absolute top-8 right-5 h-8 w-8 rounded-full flex justify-center items-center bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M208 60h-29.87l-14.81-22.22A4 4 0 0 0 160 36H96a4 4 0 0 0-3.32 1.78L77.85 60H48a20 20 0 0 0-20 20v112a20 20 0 0 0 20 20h160a20 20 0 0 0 20-20V80a20 20 0 0 0-20-20Zm12 132a12 12 0 0 1-12 12H48a12 12 0 0 1-12-12V80a12 12 0 0 1 12-12h32a4 4 0 0 0 3.33-1.78L98.13 44h59.72l14.82 22.22A4 4 0 0 0 176 68h32a12 12 0 0 1 12 12ZM128 92a40 40 0 1 0 40 40a40 40 0 0 0-40-40Zm0 72a32 32 0 1 1 32-32a32 32 0 0 1-32 32Z"
                  />
                </svg>
              </button>
            )}
            <div
            
              onClick={() => { session?.user?.uid == id && (setOpenImageBannerModal(!openImageBannerModal),
                setImageCat("profileImage"))
              }}
              className={`relative top-[60%] sm:top-[50%] left-5 w-20 sm:w-44 h-20 sm:h-44 rounded-md bg-white ${session?.user?.uid == id && 'cursor-pointer'}`}
            >
              {user && user?.profileImage ? (
                <Image
                className="rounded-lg p-1"
                src={user?.profileImage}
                fill="true"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                alt="profile image"
              />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg sm:text-2xl rounded-md sm:font-semibold bg-blue-600 text-white">
                  {user?.name.charAt(0)}
                </div>
              )}
            </div>
            {session?.user?.uid == id && 
            <div className="absolute -bottom-16 right-4 sm:right-10">
              <div className="max-w-md mx-auto space-y-6 flex justify-center">
                <button
                  onClick={() => setOpenProfileModal(!openProfileModal)}
                  className="group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer h-10 border-2 border-solid py-0 px-2 rounded-md overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500"
                >
                  <strong className="font-medium text-sm">Edit Profile</strong>
                  <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
                </button>
              </div>
            </div>
            }
          </div>
          <div className="mt-20 sm:mt-28 grid grid-cols-6 mx-2 text-sm sm:text-[15px]">
            <div className="col-span-4 flex flex-col gap-2 sm:ml-6">
              <div className="flex flex-col">
                <span className="font-semibold text-base md:text-[20px]">
                  {user?.name}
                </span>
                <span>{user?.username && '@' + user.username}</span>
              </div>
              <span className="text-xs">{user?.interest}</span>
            </div>
        
            <div className="col-span-2">
              <span
                onClick={() => {
                  setOpenModal(!openModal);
                }}
                className="cursor-pointer text-blue-600 text-[15px] hover:underline"
              >
                {session?.user?.uid == id
                  ? "Contact Info"
                  : "View contact info"}
              </span>
            </div>
          </div>
          <div
            className={`backdrop-blur-lg bg-white/30 sticky top-2 sm:top-5 z-10 grid grid-cols-4 pt-2 h-24 sm:h-28 w-full text-[15px]`}
          >
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
          {activeTab == 'post' && 
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
                <PostsData post={post} id={post.id} />
              </motion.div>
            ))}
          </AnimatePresence>
          }
          {activeTab == 'likes' && <LikeSection userId={id}/>}
          {activeTab == 'reply' && <ReplySection userId={id}/>}
          {activeTab == 'media' && <MediaSection userId={id}/>}
        </div>
      </div>
    </LayoutCover>
  );
}

export default Profile;
