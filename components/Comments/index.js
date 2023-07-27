import { db, storage } from "@components/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@components/atom/modalAtom";
import IdentityFormat from "../space/Posts/identityFormat";

const Comments = ({ comment, commentId, originalPostId }) => {
  const { data: session } = useSession();
  const [hasLikded, setHasLikded] = useState(false);
  const [likes, setLikes] = useState([]);
  const [user, setuser] = useState(null);
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  if (!session.user) {
    return router.push("/");
  }

//retrieving a single user
useEffect(() => {
  if (comment?.data()?.userId) {
    const unsubscribe = onSnapshot(doc(db, "users", comment?.data()?.userId), (snapshot) => {
      setuser(snapshot.data())
    }
    );
    return () => unsubscribe();
  }
}, [db, comment?.data()?.userId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, originalPostId, commentId]);

  useEffect(() => {
    setHasLikded(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes, session?.user?.uid]);

  async function likeComment() {
    if (session?.user) {
      if (hasLikded) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user?.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user?.uid
          ),
          {
            username: session?.user?.username,
          }
        );
      }
    } else {
      router.push("/auth/signin");
    }
  }

  async function deleteComment() {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    }
  }

  return (
    <>
      <div className="hover:bg-gray-100 cursor-pointer border-t-[1px] sm:border-collapse py-4 sm:py-8 border-gray-300 sm:px-10 px-2 grid grid-cols-12">
        <Link href={"/profile"}>
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg relative">
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
        </Link>
        <div className="col-span-11 ml-2 sm:ml-5 flex flex-col sm:gap-4">
          <IdentityFormat post={comment.data()} id={originalPostId} user={user}/>
          <div className="flex flex-col gap-4 text-sm sm:text-[15px] ">
            <span className="line-clamp-5">{comment?.data()?.comment}</span>
          </div>
          <div className="flex gap-4">
            <div
              onClick={() => {
                setPostId(originalPostId);
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
              <span>{comment.length}</span>
            </div>
            <div className="flex items-center text-sm gap-1 group cursor-pointer opacity-80">
              <button
                onClick={() => likeComment(comment)}
                className="group-hover:bg-red-200 p-2 rounded-full"
              >
                <svg
                  className={`${
                    hasLikded
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
              {likes.length > 0 && (
                <span className={`${hasLikded && "text-red-600"}`}>
                  {likes.length}
                </span>
              )}
            </div>
            {session?.user.uid === comment?.data()?.userId && (
              <div className="flex items-center text-sm gap-1 group cursor-pointer opacity-80">
                <button
                  onClick={deleteComment}
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

export default Comments;
