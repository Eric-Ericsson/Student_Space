import {
  aModalOpened,
  contactInfoModalState,
  containerZIndex,
  navZIndex,
  profileModalState,
} from "@components/atom/modalAtom";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@components/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileModal() {
  const { data: session } = useSession();
  const router = useRouter(null);
  const [user, setuser] = useState(null);
  const { id } = router.query;
  const [openProfileoModal, setOpenProfileoModal] =
    useRecoilState(profileModalState);
  const [openContactInfoModal, setOpenContactInfoModal] = useRecoilState(
    contactInfoModalState
  );
  const [aModalIsOpened, setAModalIsOpened] = useRecoilState(aModalOpened);
  const [headerZIndex, setheaderZIndex] = useRecoilState(navZIndex);
  const [conZIndex, setConZIndex] = useRecoilState(containerZIndex);
  const [interest, setInterest] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [editComponent, setEditComponent] = useState(false);

  // retrieving a single user
  useEffect(() => {
    if (id) {
      const unsubscribe = onSnapshot(doc(db, "users", id), (snapshot) =>
        setuser(snapshot.data())
      );
      setName(user?.name);
      setInterest(user?.interest);
      return () => unsubscribe();
    }
  }, [db, id, openProfileoModal]);

  const handleInterestChange = (e) => {
    setInterest(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!error) {
      try {
        await updateDoc(doc(db, "users", id), {
          name: name,
          interest: interest,
        });
        setLoading(false);
        toast.success("Profile updated successfully");
      } catch (error) {
        setLoading(false);
        toast.error('profile was not able to update');
      }
    }
  };

  return (
    <>
      {openProfileoModal && (
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
          isOpen={openProfileoModal}
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
            setEditComponent(false);
          }}
          onRequestClose={() => setOpenProfileoModal(false)}
          className={
            "max-w-lg w-[90%] overflow-scroll ease-in-out drop-shadow-2xl example delay-75 duration-300 max-h-[25rem] absolute top-28 left-[50%] translate-x-[-50%] bg-white rounded-xl"
          }
        >
          <div className="p-1 border-[1px] border-gray-300">
            <div className="flex items-center justify-between border-b-[1px] p-2 ">
              <span className="font-semibold">Edit Profile</span>
              <svg
                onClick={() => setOpenProfileoModal(false)}
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
            <div className="p-5 flex flex-col gap-3">
              <div className="flex flex-col">
                <div className="">Name</div>
                <div className="text-sm">
                  <input
                    type="text"
                    maxLength={256}
                    value={name}
                    placeholder="your name"
                    onChange={handleNameChange}
                    className="w-full h-9 text-base px-4 rounded-md ring-1 ring-black focus:ring-blue-400 focus:outline-none placeholder:text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="">interest</div>
                <div className="text-sm">
                  <input
                    type="text"
                    placeholder="your interest"
                    maxLength={50}
                    value={interest}
                    onChange={handleInterestChange}
                    className="w-full h-9 text-base px-4 rounded-md ring-1 ring-black focus:ring-blue-400 focus:outline-none placeholder:text-sm"
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  setOpenContactInfoModal(!openContactInfoModal);
                  setOpenProfileoModal(!openProfileoModal),
                    setAModalIsOpened(!aModalIsOpened);
                }}
                className="mt-5 text-sm text-blue-600 cursor-pointer"
              >
                Edit Contact Info
              </div>
            {!loading && 
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleProfileUpdate}
                  className={`${"group font-medium tracking-wide select-none overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 sm:hover:text-blue-500 sm:focus:text-blue-500"} h-10 border-2 border-solid px-8 rounded-md relative inline-flex items-center justify-center bg-blue-500 text-white border-blue-500`}
                >
                  <strong className="font-medium text-base">Save</strong>
                  <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 sm:group-hover:w-[105%] -z-[1] sm:group-focus:w-[105%]"></span>
                </button>
              </div>
              }
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProfileModal;
