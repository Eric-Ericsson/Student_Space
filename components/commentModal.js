import {
  containerZIndex,
  modalState,
  navZIndex,
  postIdState,
} from "@components/atom/modalAtom";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { useEffect, useState, useRef } from "react";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@components/firebase";
import Image from "next/image";
import TimeAgo from "./space/timeAgo";
import moment from "moment";

function CommentModal() {
  const { data: session } = useSession();
  const textareaRef = useRef(null);
  const [openCommentModal, setOpenCommentmodal] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [headerZIndex, setheaderZIndex] = useRecoilState(navZIndex);
  const [conZIndex, setConZIndex] = useRecoilState(containerZIndex);
  const [post, setPost] = useState();
  const [textareaRows, setTextareaRows] = useState(1);
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: postContent,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });

    setPostContent("");
    setLoading(false);
  };

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshort) => {
      setPost(snapshort);
    });
  }, [postId, db]);

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
  

  const handleTextareaChange = (event) => {
    setPostContent(event?.target?.value ?? "");
    setTextareaRows(event.target.value.split("\n").length);
  };

  return (
    <>
      {openCommentModal && (
        <Modal
          isOpen={openCommentModal}
          preventScroll={true}
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
          }}
          onRequestClose={() => setOpenCommentmodal(false)}
          className={
            "max-w-lg w-[90%] overflow-scroll ease-in-out example delay-75 duration-300 max-h-[25rem] absolute top-44 left-[50%] translate-x-[-50%] bg-white border-2 rounded-xl"
          }
        >
          <div className="p-1 drop-shadow-2xl">
            <div className="border-b-[1px] p-2">
              <div>
                <svg onClick={() => setOpenCommentmodal(false)}
                className="cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
            </div>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex space-x-2">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg relative">
                  {post?.data()?.userImg === "" ? (
                    <div className="w-full h-full flex items-center justify-center text-lg sm:text-2xl rounded-md sm:font-semibold bg-blue-600 text-white">
                      {post?.data()?.name.charAt(0)}
                    </div>
                  ) : (
                    <Image
                      className="rounded-lg"
                      src={post?.data()?.userImg}
                      fill="true"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                      alt="profile image"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 line-climp-1 text-xs sm:text-[15px]">
                  <div className="font-bold">{post?.data()?.name}</div>
                  <div className="text-xs">@{post?.data()?.username}</div>
                  <div className="text-xs font-thin">
                    <TimeAgo
                      date={moment(post?.data()?.timestamp?.toDate())
                        .startOf("hour")
                        .fromNow()}
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-lg">
                  {session?.user?.image === "" ? (
                    <div className="w-full h-full flex items-center justify-center text-lg sm:text-2xl rounded-md sm:font-semibold bg-blue-600 text-white">
                      {session?.user?.name.charAt(0)}
                    </div>
                  ) : (
                    <Image
                      className="rounded-lg"
                      src={session?.user?.image}
                      fill="true"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                      alt="profile image"
                    />
                  )}
                </div>
                <textarea
                  ref={textareaRef}
                  value={postContent}
                  onChange={handleTextareaChange}
                  className="w-full h-10 bg-inherit resize-none example border-b-[1px] focus:outline-none focus:border-b-secondary text-sm sm:text-base placeholder:text-xs"
                  type="text"
                  rows={textareaRows}
                  placeholder="enter your post"
                ></textarea>
              </div>
              {!loading && (
                <div className="flex justify-end">
                  <button
                    onClick={sendPost}
                    disabled={!postContent.trim()}
                    className={`${
                      postContent.trim() == ""
                        ? "cursor-not-allowed disabled"
                        : "group font-medium tracking-wide select-none overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 hover:text-blue-500 focus:text-blue-500"
                    } h-10 border-2 border-solid px-8 rounded-md relative inline-flex items-center justify-center bg-blue-500 text-white border-blue-500`}
                  >
                    <strong className="font-medium text-base">Post</strong>
                    <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
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
