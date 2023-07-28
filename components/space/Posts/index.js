import { db, storage } from "@components/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState, ueser_id } from "@components/atom/modalAtom";
import IdentityFormat from "./identityFormat";

const PostsData = ({ post, id }) => {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [userId, setUserId] = useRecoilState(ueser_id);
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);
  const router = useRouter();
  const [user, setuser] = useState(null);

  //retrieving a single user
  useEffect(() => {
    if (post?.id) {
      const unsubscribe = onSnapshot(
        doc(db, "users", post?.id),
        (snapshot) => {
          setuser(snapshot.data());
        }
      );
      return () => unsubscribe();
    }
  }, [db, post?.id]);

  //retrieving likes on a particular post
  useEffect(() => {
    if (id) {
      const unSubscribe = onSnapshot(
        collection(db, "posts", id, "likes"),
        (snapshot) => setLikes(snapshot.docs)
      );
    }
  }, [db]);

  //retrieving commemts on a particular post
  useEffect(() => {
    if (id) {
      const unSubscribe = onSnapshot(
        collection(db, "posts", id, "comments"),
        (snapshot) => setComments(snapshot.docs)
      );
    }
  }, [db]);

  //checking if user as already liked post content
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes, session?.user]);

  //Adding a like if user has not liked post content already
  async function likePost() {
    if (session?.user) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          userId: session?.user?.uid,
          postId: id,
        });
      }
    } else signIn();
  }

  //deleting a particular post content
  async function deletePost() {
    deleteDoc(doc(db, "posts", id));
    if (post.image) {
      deleteObject(ref(storage, `posts/${id}/image`));
    }
  }

  //checking if text if being truncated
  useEffect(() => {
    const checkTruncation = () => {
      const element = contentRef.current;
      if (element) {
        setShowMore(element.scrollHeight > element.clientHeight);
      }
    };

    // Check truncation on mount and when content changes
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => {
      window.removeEventListener("resize", checkTruncation);
    };
  }, [content]);

  return (
    <>
      <div className="hover:bg-gray-100 cursor-pointer border-t-[1px] sm:border-collapse py-4 sm:py-8 border-gray-300 sm:px-10 px-2 grid grid-cols-12">
        <Link
          href={`/profile/${post?.id}`}
          className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg relative"
        >
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
          <IdentityFormat post={post} id={id} user={user} />
          <Link
            href={`/posts/${id}`}
            className="flex flex-col gap-4 text-sm sm:text-[15px] "
          >
            <span>
              <span
                ref={contentRef}
                className={`${
                  router.pathname.includes("/posts")
                    ? "line-clamp-none"
                    : "line-clamp-5"
                }`}
              >
                {post?.text}
              </span>
              {showMore && (
                <span className="text-blue-600 text-opacity-70">Show more</span>
              )}
            </span>
            <div
              className={`${
                post?.image == ""
                  ? "hidden"
                  : "image-container bg-gray-300"
              } `}
            >
              {post?.image && (
                <img
                  src={post?.image}
                  alt="Image"
                  className="imageClass"
                />
              )}
            </div>
          </Link>
          <div className="flex gap-4">
            <div
              onClick={() => {
                setPostId(id);
                setUserId(post?.id);
                setOpenModal(!openModal);
              }}
              className="flex items-center text-sm gap-1 group cursor-pointer opacity-80"
            >
              <button className="group-hover:bg-blue-200 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M10 2a8 8 0 1 1-3.613 15.14l-.121-.065l-3.645.91a.5.5 0 0 1-.62-.441v-.082l.014-.083l.91-3.644l-.063-.12a7.95 7.95 0 0 1-.83-2.887l-.025-.382L2 10a8 8 0 0 1 8-8Zm0 1a7 7 0 0 0-6.106 10.425a.5.5 0 0 1 .063.272l-.014.094l-.756 3.021l3.024-.754a.502.502 0 0 1 .188-.01l.091.021l.087.039A7 7 0 1 0 10 3Zm.5 8a.5.5 0 0 1 .09.992L10.5 12h-3a.5.5 0 0 1-.09-.992L7.5 11h3Zm2-3a.5.5 0 0 1 .09.992L12.5 9h-5a.5.5 0 0 1-.09-.992L7.5 8h5Z"
                  />
                </svg>
              </button>
              {comments.length > 0 && <span>{comments.length}</span>}
            </div>
            <div className="flex items-center text-sm gap-1 group cursor-pointer opacity-80">
              <button
                onClick={() => likePost()}
                className="group-hover:bg-red-200 p-2 rounded-full"
              >
                <svg
                  className={`${
                    hasLiked
                      ? "fill-red-600 stroke-red-600"
                      : "fill-none stroke-current group-hover:stroke-red-600"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8Z"
                  />
                </svg>
              </button>
              {hasLiked > 0 && (
                <span className={`${hasLiked && "text-red-600"}`}>
                  {likes.length}
                </span>
              )}
            </div>
            {session?.user.uid === post?.id && (
              <div className="flex items-center text-sm gap-1 group cursor-pointer opacity-80">
                <button
                  onClick={deletePost}
                  className="group-hover:bg-red-200 p-2 rounded-full"
                >
                  <svg
                    className="group-hover:fill-red-700 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                  >
                    <path d="M20 10.5v.5h8v-.5a4 4 0 0 0-8 0Zm-2.5.5v-.5a6.5 6.5 0 1 1 13 0v.5h11.25a1.25 1.25 0 1 1 0 2.5h-2.917l-2 23.856A7.25 7.25 0 0 1 29.608 44H18.392a7.25 7.25 0 0 1-7.224-6.644l-2-23.856H6.25a1.25 1.25 0 1 1 0-2.5H17.5Zm-3.841 26.147a4.75 4.75 0 0 0 4.733 4.353h11.216a4.75 4.75 0 0 0 4.734-4.353L36.324 13.5H11.676l1.983 23.647ZM21.5 20.25a1.25 1.25 0 1 0-2.5 0v14.5a1.25 1.25 0 1 0 2.5 0v-14.5ZM27.75 19c.69 0 1.25.56 1.25 1.25v14.5a1.25 1.25 0 1 1-2.5 0v-14.5c0-.69.56-1.25 1.25-1.25Z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsData;
