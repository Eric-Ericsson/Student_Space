import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  doc,
  query,
  onSnapshot,
  collectionGroup,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@components/firebase";
import { AnimatePresence, motion } from "framer-motion";
import LoadingState from "@components/components/space/loadingState";
import Link from "next/link";
import IdentityFormat from "../Posts/identityFormat";

function ReplySection({ userId }) {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);
  const [userComments, setUserComments] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [user, setuser] = useState(null);

  //retrieving a single user
  useEffect(() => {
    if (session?.user?.uid) {
      const unsubscribe = onSnapshot(
        doc(db, "users", session?.user?.uid),
        (snapshot) => {
          setuser(snapshot.data());
        }
      );
      return () => unsubscribe();
    }
  }, [db, session?.user?.uid]);

  //retrieving comments of a particular user
  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const userComments = [];

        const q = query(
          collectionGroup(db, "comments"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((commentDoc) => {
          const commentData = commentDoc.data();
          userComments.push(commentData);
        });
        setPostLoading(false);
        setUserComments(userComments);
        return userComments;
      } catch (error) {
        return [];
      }
    };

    fetchUserComments();
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
          {userComments.map((likedPosts, index) => (
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
                  href={`/posts/${likedPosts.postId}`}
                  className="flex flex-col gap-4 text-sm sm:text-[15px] "
                >
                  <span>
                    {likedPosts.comment}
                    <span
                      ref={contentRef}
                      className={`${
                        router.pathname.includes("/posts")
                          ? "line-clamp-none"
                          : "line-clamp-5"
                      }`}
                    ></span>
                    {showMore && (
                      <span className="text-blue-600 text-opacity-70">
                        Show more
                      </span>
                    )}
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
}

export default ReplySection;
