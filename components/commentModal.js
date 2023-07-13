import { modalState } from "@components/atom/modalAtom";
import { useRecoilState } from "recoil"

function CommentModal() {
    const [openCommentModal, setOpenCommentmodal] = useRecoilState(modalState);
  return (
    <div>
      {openCommentModal && 'modal'}
    </div>
  )
}

export default CommentModal
