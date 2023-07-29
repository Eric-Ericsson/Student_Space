import {
  containerZIndex,
  modalState,
  navZIndex,
  postIdState,
  ueser_id,
} from "@components/atom/modalAtom";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@components/firebase";
import Image from "next/image";
import IdentityFormat from "../space/Posts/identityFormat";

function CommentModal() {
  const { data: session } = useSession();
  const router = useRouter();
  const textareaRef = useRef(null);
  const [openCommentModal, setOpenCommentmodal] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [id] = useRecoilState(ueser_id);
  const [headerZIndex, setheaderZIndex] = useRecoilState(navZIndex);
  const [conZIndex, setConZIndex] = useRecoilState(containerZIndex);
  const [post, setPost] = useState();
  const [textareaRows, setTextareaRows] = useState(1);
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState(null);


  //retrieving a single user
  useEffect(() => {
    if (id) {
      const unsubscribe = onSnapshot(doc(db, "users", id), (snapshot) => {
        setuser(snapshot.data())
      });
      return () => unsubscribe();
    }
  }, [db, id]);

  //sending user comment
  const sendComment = async () => {
    setLoading(true)
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: postContent,
      timestamp: serverTimestamp(),
      userId: session?.user?.uid,
      postId: postId,
    });
    setLoading(false)
    setPostContent("");
    setOpenCommentmodal(false);
  };

  //retrieving a particular post item
  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshort) => {
      setPost(snapshort);
    });
  }, [postId, db, sendComment]);

  //increasing the height of the textarea whiles the user types
  useEffect(() => {
    adjustTextareaHeight();
  }, [postContent]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  //dynamically render the text and the textarea height
  const handleTextareaChange = (event) => {
    setPostContent(event?.target?.value ?? "");
    setTextareaRows(event.target.value.split("\n").length);
  };

  return (
    <>
      {openCommentModal && (
        <Modal
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(50, 50, 50, 0.75)",
              backdropFilter: "blur(5px)",
            },
          }}
          shouldCloseOnEsc={true}
          isOpen={openCommentModal}
          ariaHideApp={false}
          onAfterOpen={() => {
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.position = "fixed";
            setConZIndex("-z-10");
            setheaderZIndex("z-0");
          }}
          onAfterClose={() => {
            const scrollY = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
            setConZIndex("z-10");
            setheaderZIndex("z-50");
            setPostContent("");
          }}
          onRequestClose={() => setOpenCommentmodal(false)}
          className={
            "max-w-lg w-[90%] overflow-scroll ease-in-out drop-shadow-2xl example delay-75 duration-300 max-h-[25rem] absolute top-28 left-[50%] translate-x-[-50%] bg-white rounded-xl"
          }
        >
          <div className="p-1 border-[1px] border-gray-300">
            <div className="border-b-[1px] p-2 ">
              <svg
                onClick={() => setOpenCommentmodal(false)}
                className="cursor-pointer hover:bg-gray-200 rounded-full p-2 opacity-75"
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z"
                />
                <path
                  fill="currentColor"
                  d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                />
              </svg>
            </div>
            <div className="flex flex-col p-3">
              <div
                className={`relative grid grid-cols-12 before:ml-4 before:sm:ml-6 before:absolute before:w-[1px] before:h-full before:border-l-[1px] before:border-black before:opacity-80 pb-10`}
              >
                <div className="sticky top-0 bg-white/30 w-8 h-8 sm:w-12 sm:h-12 rounded-lg">
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
                </div>
                <div className="col-span-11 ml-3 sm:ml-5 flex flex-col gap-2 line-climp-1 text-xs sm:text-[15px]">
                  <div className="sticky top-0 py-3 backdrop-blur-md bg-white/30 flex items-center gap-2 line-climp-1 text-xs sm:text-[15px]">
                    <IdentityFormat post={post} user={user}/>
                  </div>
                  <div className="flex flex-col gap-4 text-sm sm:text-[15px] ">
                    <span className="line-clamp-5">{post?.data()?.text}</span>
                    <div
                      className={`${
                        post?.data()?.image == "" ? "hidden" : "image-container"
                      } `}
                    >
                      {post?.data()?.image && (
                        <img
                          src={post.data().image}
                          alt="Image"
                          className="imageClass"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 ">
                <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-lg">
                  {session?.user?.image ? (
                    <Image
                    className="rounded-lg"
                    src={session?.user?.image}
                    fill="true"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    alt="profile image"
                  />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg sm:text-2xl rounded-md sm:font-semibold bg-blue-600 text-white">
                    {session?.user?.name.charAt(0)}
                  </div>
                  )}
                </div>
                <div className="col-span-11 ml-3 sm:ml-5 flex items-center">
                  <textarea
                    ref={textareaRef}
                    value={postContent}
                    onChange={handleTextareaChange}
                    className="w-full h-10 bg-inherit resize-none example border-b-[1px] focus:outline-none focus:border-b-secondary text-sm sm:text-base placeholder:text-xs"
                    type="text"
                    rows={textareaRows}
                    placeholder="enter your comment"
                  ></textarea>
                </div>
              </div>
              {!loading && (
                <div className="flex justify-end mt-3">
                  <button
                    onClick={sendComment}
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
        </Modal>
      )}
    </>
  );
}

export default CommentModal;
