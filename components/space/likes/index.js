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
  getDoc,
} from "firebase/firestore";
import { db } from "@components/firebase";
import { AnimatePresence, motion } from "framer-motion";
import LoadingState from "@components/components/space/loadingState";
import Link from "next/link";
import IdentityFormat from "../Posts/identityFormat";

function LikeSection({ userId }) {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/");
    },
  });
  const [likedPosts, setLikedPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [user, setuser] = useState(null);
  // const [postId, setPostId] = useState(null)

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

  //retrieving likes of a particular user
  useEffect(() => {
    // const fetchLikedPosts = async () => {
    //   try {
    //     const likedPosts = [];
    //     const q = query(
    //       collectionGroup(db, "likes"),
    //       where("userId", "==", userId)
    //     );
    //     const querySnapshot = await getDocs(q);

    //     // Loop through the likes subcollections and get the parent post IDs
    //     querySnapshot.forEach((likeDoc) => {
    //          const postId = likeDoc.ref.parent.parent.id;
    //          const postData = likeDoc.ref.parent.parent.data();
    //       if (!likedPosts.includes(postId)) {
    //         likedPosts.push({ id: postId, ...postData });
    //       }
    //     });

    //     // Fetch the posts corresponding to the liked post IDs
    //     const posts = await Promise.all(
    //       likedPosts.map(async (postId) => {
    //         const postDocRef = doc(db, "posts", postId);
    //         const postDocSnapshot = await getDoc(postDocRef);
    //         if (postDocSnapshot.exists()) {
    //           return { id: postDocSnapshot.id, ...postDocSnapshot.data() };
    //         }
    //         return null;
    //       })
    //     );

    //     const filteredPosts = posts.filter((post) => post !== null);
    //     setPostLoading(false);
    //     setLikedPosts(filteredPosts);
    //   } catch (error) {
    //     setLikedPosts([]);
    //   }
    // };
    const fetchLikedPosts = async () => {
      try {
        const likedPosts = [];
        const q = query(collectionGroup(db, "likes"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
    
        // Loop through the likes subcollections and get the parent post IDs
        querySnapshot.forEach((likeDoc) => {
          const postId = likeDoc.ref.parent.parent.id;
          if (!likedPosts.some((post) => post.id === postId)) {
            likedPosts.push({ postId });
          }
        });
    
        // Fetch the posts corresponding to the liked post IDs
        const postFetchPromises = likedPosts.map(async (post) => {
          const postDocRef = doc(db, "posts", post.postId);
          const postDocSnapshot = await getDoc(postDocRef);
          if (postDocSnapshot.exists()) {
            post.data = postDocSnapshot.data();
          }
        });
    
        await Promise.all(postFetchPromises); // Wait for all post data to be fetched
    
        setPostLoading(false);
        setLikedPosts(likedPosts);
      } catch (error) {
        setLikedPosts([]);
      }
    };
    
    fetchLikedPosts();
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
          {likedPosts.map((likedPost, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="hover:bg-gray-100 cursor-pointer border-t-[1px] sm:border-collapse py-4 sm:py-8 border-gray-300 sm:px-10 px-2 grid grid-cols-12"
            >
              <Link
                href={`/profile/${userId}`}
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
                  post={likedPost.data}
                  id={likedPost.postId}
                  user={user}
                />
                <Link
                  href={`/posts/${likedPost.postId}`}
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
                      {likedPost?.data.text}
                    </span>
                    {showMore && (
                      <span className="text-blue-600 text-opacity-70">
                        Show more
                      </span>
                    )}
                  </span>
                  <div
                    className={`${
                      likedPost?.data.image == ""
                        ? "hidden"
                        : "image-container bg-gray-300"
                    } `}
                  >
                    {likedPost?.data.image && (
                      <img
                        src={likedPost?.data.image}
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

export default LikeSection;