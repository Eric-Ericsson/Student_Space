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
import Moment from "react-moment";
import { signIn, useSession } from "next-auth/react";
import { deleteObject, ref } from "firebase/storage";

const PostsData = ({post}) => {
  const { data: session } = useSession();
  const [hasLikded, setHasLikded] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [post]);

  useEffect(() => {
    setHasLikded(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
  }, [likes])

  async function likePost(post) {
    if(session){
      if(hasLikded){
        await deleteDoc(doc(db, 'posts', post.id, 'likes', session?.user.uid))
      } else{
      await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
        username: session.user.username,
      })}
    } else signIn()
  }

  async function deletePost(){
    deleteDoc(doc(db, 'posts', post.id))
    if(post.data().image){
      deleteObject(ref(storage, `posts/${post.id}/image`))
    }
  }

  return (
        <div
          className="hover:bg-gray-100 cursor-pointer border-t-[1px] sm:border-collapse py-4 sm:py-8 border-gray-300 sm:px-10 px-2 grid grid-cols-12"
        >
          <Link href={"/profile"}>
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg relative">
              <Image
                className="rounded-lg"
                src={post.data().userImg}
                fill="true"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                alt="profile image"
              />
            </div>
          </Link>
          <div className="col-span-11 ml-2 sm:ml-5 flex flex-col sm:gap-4">
            <div className="flex items-center gap-2 line-climp-1 text-xs sm:text-[15px]">
              <div className="font-bold">{post.data().name}</div>
              <div className="text-xs">@{post.data().username}</div>
              <div className="text-xs font-thin">
                <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-sm sm:text-[15px] ">
              <span className="line-clamp-5">{post.data().text}</span>
              <div
                className={`${
                  post.data().image == "" ? "hidden" : "image-container"
                } `}
              >
                {
                  post.data().image && (
                    <img
                    src={post.data().image}
                    alt="Image"
                    className="imageClass"
                  />
                  )
                }
               
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
              </div>
              <div className="flex items-center text-sm gap-1 group cursor-pointer opacity-80">
                <button
                  onClick={() => likePost(post)}
                  className="group-hover:bg-red-200 p-2 rounded-full"
                >
                  <svg className={`${hasLikded ? 'fill-red-600 stroke-red-600' : 'fill-none stroke-current group-hover:stroke-red-600'}`}
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
                {likes.length > 0 && (<span className={`${hasLikded && 'text-red-600'}`}>{likes.length}</span>)}
              </div>
              {session?.user.uid === post?.data().id && (
              <div className="flex items-center text-sm gap-1 group cursor-pointer opacity-80">
                <button onClick={deletePost}
                  className="group-hover:bg-red-200 p-2 rounded-full"
                >
                 <svg className="group-hover:fill-red-700 fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path d="M20 10.5v.5h8v-.5a4 4 0 0 0-8 0Zm-2.5.5v-.5a6.5 6.5 0 1 1 13 0v.5h11.25a1.25 1.25 0 1 1 0 2.5h-2.917l-2 23.856A7.25 7.25 0 0 1 29.608 44H18.392a7.25 7.25 0 0 1-7.224-6.644l-2-23.856H6.25a1.25 1.25 0 1 1 0-2.5H17.5Zm-3.841 26.147a4.75 4.75 0 0 0 4.733 4.353h11.216a4.75 4.75 0 0 0 4.734-4.353L36.324 13.5H11.676l1.983 23.647ZM21.5 20.25a1.25 1.25 0 1 0-2.5 0v14.5a1.25 1.25 0 1 0 2.5 0v-14.5ZM27.75 19c.69 0 1.25.56 1.25 1.25v14.5a1.25 1.25 0 1 1-2.5 0v-14.5c0-.69.56-1.25 1.25-1.25Z"/></svg>
                </button>
              </div>
               )}
            </div>
          </div>
        </div>
  );
};

export default PostsData;
