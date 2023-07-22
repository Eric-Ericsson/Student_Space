import LayoutCover from "@components/components/layout/LayoutCover";
import SideNav from "@components/components/layout/SideNavigation";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  collection,
  doc,
  getDoc,
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
  const [activeTabSPace, SetActiveTabSPace] = useState(true);
  const [activeTabFollowing, SetActiveTabFollowing] = useState(false);
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

  const handleActiveTab = (tab) => {
    if (tab == "space") {
      SetActiveTabSPace(true);
      SetActiveTabFollowing(false);
    } else {
      SetActiveTabSPace(false);
      SetActiveTabFollowing(true);
    }
  };

  return (
    <LayoutCover>
      <div
        className={`relative ${conZIndex} mx-2 sm:mx-8 md:mx-20 lg:mx-40 border-[1px] min-h-screen`}
      >
        <SideNav path={'/posts'} session={session} />
        {/* Main content */}
        <div className="sm:ml-16 md:ml-24 lg:ml-56 border-b-[1px] border-gray-300">
          <div
            className={`backdrop-blur-lg bg-white/30 sticky top-2 sm:top-5 z-10 grid grid-cols-2 border-b-[1px] border-gray-300 pt-2 h-24 sm:h-28 w-full text-[15px]`}
          >
            <button
              onClick={() => handleActiveTab("space")}
              className={`font-semibold self-end pt-10 pb-3 ${
                activeTabSPace ? "underline font-semibold" : "font-normal"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px] hover:bg-slate-100 hover:bg-opacity-70`}
            >
              Space
            </button>
            <button
              onClick={handleActiveTab}
              className={`font-semibold self-end pt-10 hover:bg-slate-100 hover:bg-opacity-70 pb-3 ${
                activeTabFollowing ? "underline font-semibold" : "font-normal"
              } underline-offset-[13px] decoration-sky-500 decoration-[5px]`}
            >
              Following
            </button>
          </div>
          {postLoading && <LoadingState />}
          {post && post.data && <PostsData post={post} id={id} />}
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
