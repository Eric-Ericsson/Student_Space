import LayoutCover from "@components/components/layout/LayoutCover";
import SideNav from "@components/components/layout/SideNavigation";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@components/firebase";
import PostsData from "@components/components/space/Posts";
import { containerZIndex } from "@components/atom/modalAtom";
import { useRecoilState } from "recoil";
import LoadingState from "@components/components/space/loadingState";
import Comments from "@components/components/Comments";

function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [post, setPost] = useState([]);
  const [conZIndex] = useRecoilState(containerZIndex);
  const [postLoading, setPostLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      const unsubscribe = onSnapshot(doc(db, "posts", id), (snapshot) =>
        setPost(snapshot)
      );
      setPostLoading(false);
      return () => unsubscribe();
    }
  }, [db, id]);

  //get comments of the post
  useEffect(() => {
    if (id) {
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      );
    }
  }, [db, id]);

  return (
    <LayoutCover>
      <div
        className={`relative ${conZIndex} mx-2 sm:mx-8 mb-10 sm:mb-0 md:mx-20 lg:mx-40 border-[1px] min-h-screen`}
      >
        <SideNav path={'/posts'} session={session} />
        {/* Main content */}
        <div className="sm:ml-16 md:ml-24 lg:ml-56 border-b-[1px] border-gray-300">
        <div
            className={`backdrop-blur-lg bg-white/30 sticky top-2 sm:top-5 z-10 flex justify-center border-b-[1px] border-gray-300 pt-2 h-24 sm:h-28 w-full text-[15px]`}
          >
            <button
              className={`font-bold pt-12 sm:pt-16  text-lg underline underline-offset-[8px] decoration-sky-500 decoration-[5px] sm:hover:bg-slate-100 hover:bg-opacity-70`}
            >
              Post
            </button>
          </div>
          {postLoading && <LoadingState />}
          {post && post.data && <PostsData post={post.data()} id={id} />}
          {comments.length > 0 &&
            comments.map((comment) => (
              <Comments
                key={comment.id}
                commentId={comment.id}
                originalPostId={id}
                comment={comment}
              />
            ))}
        </div>
      </div>
    </LayoutCover>
  );
}

export default PostPage;
