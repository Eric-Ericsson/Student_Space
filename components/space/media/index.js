import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  doc,
  query,
  onSnapshot,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "@components/firebase";
import { AnimatePresence, motion } from "framer-motion";
import LoadingState from "@components/components/space/loadingState";
import Link from "next/link";
import IdentityFormat from "../Posts/identityFormat";

function MediaSection({ userId }) {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);
  const [userPosts, setUserPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [user, setuser] = useState(null);

  //retrieving a single user
  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(
        doc(db, "users", userId),
        (snapshot) => {
          setuser(snapshot.data());
        }
      );
      return () => unsubscribe();
    }
  }, [db, userId]);

  //retrieving post that contains a media of a particular user
  useEffect(() => {
    const fetchUserPostsWithImages = async () => {
      try {
        const q = query(collection(db, "posts"), where("id", "==", userId));
        const querySnapshot = await getDocs(q);

        const userPosts = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((post) => post.image);
        setPostLoading(false);
        setUserPosts(userPosts);
        //   return userPosts;
      } catch (error) {
        console.error(error.message);
        return [];
      }
    };

    fetchUserPostsWithImages();
  }, [userId]);

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
      {postLoading ? (
        <LoadingState />
      ) : (
        <AnimatePresence>
          {userPosts.map((likedPosts, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="hover:bg-gray-100 cursor-pointer border-t-[1px] sm:border-collapse py-4 sm:py-8 border-gray-300 sm:px-10 px-2 grid grid-cols-12"
            >
              <Link
                href={`/profile/${likedPosts?.userId}`}
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
                <IdentityFormat
                  post={likedPosts}
                  id={likedPosts.id}
                  user={user}
                />
                <Link
                  href={`/posts/${likedPosts.id}`}
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
                      {likedPosts?.text}
                    </span>
                    {showMore && (
                      <span className="text-blue-600 text-opacity-70">
                        Show more
                      </span>
                    )}
                  </span>
                  <div
                    className={`${
                      likedPosts?.image == ""
                        ? "hidden"
                        : "image-container bg-gray-300"
                    } `}
                  >
                    {likedPosts?.image && (
                      <img
                        src={likedPosts?.image}
                        alt="Image"
                        className="imageClass"
                      />
                    )}
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
}

export default MediaSection;
