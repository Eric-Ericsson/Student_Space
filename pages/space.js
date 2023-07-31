import LayoutCover from "@components/components/layout/LayoutCover";
import SideNav from "@components/components/layout/SideNavigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "@components/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import PostsData from "@components/components/space/Posts";
import { AnimatePresence, motion } from "framer-motion";
import { containerZIndex } from "@components/atom/modalAtom";
import { useRecoilState } from "recoil";
import LoadingState from "@components/components/space/loadingState"
import Link from "next/link";

function Homepage() {
  const router = useRouter();
  const filePickerRef = useRef();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/')
    }
  });
  const textareaRef = useRef(null);
  const [activeTabSPace, SetActiveTabSPace] = useState(true);
  const [activeTabFollowing, SetActiveTabFollowing] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [conZIndex] = useRecoilState(containerZIndex);
  const [postLoading, setPostLoading] = useState(true);
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

//sending a post content to firebase
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session?.user?.uid,
      text: postContent,
      // userImg: user?.profileImage,
      timestamp: serverTimestamp(),
      // name: user?.name,
      // username: user?.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    //adding an image to post if an image is selected
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setPostContent("");
    setTextareaRows(1);
    setSelectedFile(null);
    setLoading(false);
  };

  //retrieving all post content in descending order
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
          setPostLoading(false);
        }
      ),
    []
  );

  //increasing the height of the textarea as the user types
  useEffect(() => {
    adjustTextareaHeight();
  }, [postContent]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  //handle the textarea and its text as the user types
  const handleTextareaChange = (event) => {
    setPostContent(event?.target?.value ?? "");
    setTextareaRows(event.target.value.split("\n").length);
  };

  //selects an image from the file explorer
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <LayoutCover title='space | student space'>
      <div
        className={`relative ${conZIndex} mx-2 sm:mx-8 md:mx-20 lg:mx-40 border-[1px] min-h-screen`}
      >
        <SideNav path='/space' session={session} />
        {/* Main content */}
        <div className="sm:ml-16 mb-14 sm:mb-0 md:ml-24 lg:ml-56 border-b-[1px] border-gray-300">
          <div
            className={`backdrop-blur-lg bg-white/30 sticky top-2 sm:top-5 z-10 flex justify-center border-b-[1px] border-gray-300 pt-2 h-24 sm:h-28 w-full text-[15px]`}
          >
            <button
              className={`font-bold pt-12 sm:pt-16 cursor-default text-lg underline underline-offset-[8px] decoration-sky-500 decoration-[5px] sm:hover:bg-slate-100 sm:hover:bg-opacity-70`}
            >
              Space
            </button>
          </div>

          <div className="mb-5 sm:mb-0 sm:mx-10 mx-2 grid grid-cols-12 mt-6 sm:mt-14">
            <Link href={`/profile/${session?.user?.uid}`} className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-lg">
              {user?.profileImage ? (
                  <Image
                  className="rounded-lg"
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
            </Link>
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
                    <svg
                      onClick={() => setSelectedFile(null)}
                      className="absolute inset-2 cursor-pointer drop-shadow-md"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="white"
                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"
                      />
                    </svg>
                    <img
                      src={selectedFile}
                      className={`${loading && "animate-pulse"}`}
                    />
                  </div>
                )}

                {!loading && (
                  <div className="flex justify-between">
                    <div className="flex gap-2 sm:gap-5">
                      <div onClick={() => filePickerRef.current.click()}>
                        <button className="sm:hover:bg-blue-200 p-2 gap-1 text-xs rounded-full flex items-center justify-center">
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
                          accept="image/*"
                          hidden
                          ref={filePickerRef}
                          onChange={addImageToPost}
                        />
                      </div>
                    </div>
                    <button
                      onClick={sendPost}
                      disabled={!postContent.trim()}
                      className={`${
                        postContent.trim() == ""
                          ? "cursor-not-allowed disabled"
                          : "group font-medium tracking-wide select-none overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 sm:hover:text-blue-500 sm:focus:text-blue-500"
                      } h-10 border-2 border-solid px-8 rounded-md relative inline-flex items-center justify-center bg-blue-500 text-white border-blue-500`}
                    >
                      <strong className="font-medium text-base">Post</strong>
                      <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 sm:group-hover:w-[105%] -z-[1] sm:group-focus:w-[105%]"></span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
         
          {postLoading || loading ? (
            <LoadingState />
          ) : (
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
                  <PostsData post={post.data()} id={post.id} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
        </div>
      </div>
    </LayoutCover>
  );
}

export default Homepage;
