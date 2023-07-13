import { modalState, postIdState } from "@components/atom/modalAtom";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@components/firebase";

function CommentModal() {
  const [openCommentModal, setOpenCommentmodal] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState();

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshort) => {
      setPost(snapshort);
    });
  }, [postId, db]);

  return (
    <div>
      {openCommentModal && (
        <Modal
          isOpen={openCommentModal}
          onRequestClose={() => setOpenCommentmodal(false)}
          className={
            "max-w-lg w-[90%] h-96 absolute top-44 left-[50%] translate-x-[-50%] bg-white border-2 rounded-xl"
          }
        >
          <div className="p-1">
            <div className="border-b-2">
              <div onClick={() => setOpenCommentmodal(false)}> x</div>
            </div>
            <h1>{post?.data().username}</h1>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CommentModal;
