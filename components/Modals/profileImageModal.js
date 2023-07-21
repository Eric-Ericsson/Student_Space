import {
    containerZIndex,
    imageBannerModalState,
    navZIndex,
    imageCategory,
  } from "@components/atom/modalAtom";
  import { useSession } from "next-auth/react";
  import { useRecoilState } from "recoil";
  import Modal from "react-modal";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { doc, onSnapshot } from "firebase/firestore";
  import { db } from "@components/firebase";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import ImageUploader from "../ImageUploader";
  
  function ImageBannerModal() {
    const { data: session } = useSession();
    const router = useRouter(null);
    const [user, setuser] = useState(null);
    const { id } = router.query;
    const [openImageBannerModal, setOpenImageBannerModal] = useRecoilState(
        imageBannerModalState
    );
    const [headerZIndex, setheaderZIndex] = useRecoilState(navZIndex);
    const [conZIndex, setConZIndex] = useRecoilState(containerZIndex);
const [imageCat] = useRecoilState(imageCategory)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState();
  
    // retrieving a single user
    useEffect(() => {
      if (id) {
        const unsubscribe = onSnapshot(doc(db, "users", id), (snapshot) =>
          setuser(snapshot.data())
        );
        setPhoneNumber(user?.phone);
        setAddress(user?.address);
        return () => unsubscribe();
      }
    }, [db, id]);
  
    return (
      <>
        {openImageBannerModal && (
          <Modal
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(50, 50, 50, 0.75)",
                backdropFilter: "blur(4px)",
              },
            }}
            shouldCloseOnEsc={true}
            isOpen={openImageBannerModal}
            ariaHideApp={false}
            onAfterOpen={() => {
              document.body.style.top = `-${window.scrollY}px`;
              document.body.style.position = "fixed";
              setConZIndex("-z-10");
              setheaderZIndex("z-0");
            }}
            onAfterClose={() => {
              const scrollY = document.body.style.top;
              document.body.style.position = "";
              document.body.style.top = "";
              window.scrollTo(0, parseInt(scrollY || "0") * -1);
              setConZIndex("z-10");
              setheaderZIndex("z-50");
              setOpenImageBannerModal(false)
            }}
            onRequestClose={() => setOpenImageBannerModal(false)}
            className={
              "max-w-2xl w-[90%] overflow-scroll ease-in-out drop-shadow-2xl example delay-75 duration-300 max-h-[30rem] absolute top-20 left-[50%] translate-x-[-50%] bg-white rounded-xl"
            }
          >
            <div className="p-1 border-[1px] border-gray-300">
              <div className="flex items-center justify-between border-b-[1px] p-2 ">
                <span className="font-semibold">Update profile image</span>
                <svg
                  onClick={() => setOpenImageBannerModal(!openImageBannerModal)}
                  className="cursor-pointer hover:bg-gray-200 rounded-full p-2 opacity-75"
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="currentColor"
                    d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12z"
                  />
                  <path
                    fill="currentColor"
                    d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
                  />
                </svg>
              </div>
              <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  <ImageUploader imageUser={imageCat == 'profileImage' ? user?.profileImage : user?.bannerImage}/>
            </div>
          </Modal>
        )}
      </>
    );
  }
  
  export default ImageBannerModal;
  