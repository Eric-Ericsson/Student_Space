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

function ContactInfoModal() {
  const { data: session } = useSession();
  const router = useRouter(null);
  const [user, setuser] = useState(null);
  const { id } = router.query;
  const [openContactInfoModal, setOpenContactInfoModal] = useRecoilState(
    contactInfoModalState
  );
  const [aModalIsOpened, setAModalIsOpened] = useRecoilState(
    aModalOpened
  );
  const [openProfileoModal, setOpenProfileoModal] = useRecoilState(
    profileModalState
);
  const [headerZIndex, setheaderZIndex] = useRecoilState(navZIndex);
  const [conZIndex, setConZIndex] = useRecoilState(containerZIndex);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState();
  const [editComponent, setEditComponent] = useState(false);

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

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const validatePhoneNumber = () => {
    const numberPattern =
      /^(\+233|0)(20|50|24|54|55|27|57|26|56|28|58|23|53|25|55|59|21|51|29|59|22|52|59|55)\d{7}$/;
    if (!phoneNumber.length == 0) {
      if (!numberPattern.test(phoneNumber)) {
        setError("contact error");
        toast.error("invalid contact");
      }
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleContactInfoUpdate = async (e) => {
    e.preventDefault();
    validatePhoneNumber();
    if (!error) {
      try {
        await updateDoc(doc(db, "users", id), {
          phone: phoneNumber,
          address: address,
        });
        toast.success('contact info updated successfully')
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
    }
  };
console.log(aModalIsOpened)
  const handleOtherModalIsOpen = () => {
    if(aModalIsOpened){
      setOpenProfileoModal(!openProfileoModal)
      setAModalIsOpened(!aModalIsOpened)
    }
  }

  return (
    <>
      {openContactInfoModal && (
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
          isOpen={openContactInfoModal}
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
            setEditComponent(false)
            handleOtherModalIsOpen()
          }}
          onRequestClose={() => setOpenContactInfoModal(false)}
          className={
            "max-w-lg w-[90%] overflow-scroll ease-in-out drop-shadow-2xl example delay-75 duration-300 max-h-[25rem] absolute top-28 left-[50%] translate-x-[-50%] bg-white rounded-xl"
          }
        >
          <div className="p-1 border-[1px] border-gray-300">
            <div className="flex items-center justify-between border-b-[1px] p-2 ">
              <span className="font-semibold">{!editComponent ? user?.name : 'Edit contact Info'}</span>
              <svg
                onClick={() => {setOpenContactInfoModal(false); handleOtherModalIsOpen()}}
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
            {!editComponent && (
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">Contact Info</span>
                  <svg onClick={() =>setEditComponent(true)}
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L5 16ZM15 6l3 3m-5 11h8"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-12 items-center">
                    <div className="">
                      <svg
                        className="w-5 h-10"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 84.85 109.92"
                      >
                        <g className="fill-gray-500" data-name="Layer 2">
                          <path d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z" />
                        </g>
                      </svg>
                    </div>
                    <div className="col-span-11">Your Profile</div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div></div>
                    <div className="col-span-11 text-sm text-blue-600 cursor-pointer">
                      {router.asPath}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-12 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M220.78 162.13L173.56 141a12 12 0 0 0-11.38 1a3.37 3.37 0 0 0-.38.28L137 163.42a3.93 3.93 0 0 1-3.7.21c-16.24-7.84-33.05-24.52-40.89-40.57a3.9 3.9 0 0 1 .18-3.69l21.2-25.21c.1-.12.19-.25.28-.38a12 12 0 0 0 1-11.36L93.9 35.28a12 12 0 0 0-12.48-7.19A52.25 52.25 0 0 0 36 80c0 77.2 62.8 140 140 140a52.25 52.25 0 0 0 51.91-45.42a12 12 0 0 0-7.13-12.45Zm-.78 11.45A44.23 44.23 0 0 1 176 212c-72.78 0-132-59.22-132-132a44.23 44.23 0 0 1 38.42-44a3.87 3.87 0 0 1 .48 0a4 4 0 0 1 3.67 2.49l21.11 47.14a4 4 0 0 1-.23 3.6l-21.19 25.2c-.1.13-.2.25-.29.39a12 12 0 0 0-.78 11.75c8.69 17.79 26.61 35.58 44.6 44.27a12 12 0 0 0 11.79-.87l.37-.28l24.83-21.12a3.93 3.93 0 0 1 3.57-.27l47.21 21.16a4 4 0 0 1 2.44 4.12Z"
                        />
                      </svg>
                    </div>
                    <div className="col-span-11">Phone</div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div></div>
                    <div className="col-span-11 text-sm">{user?.phone}</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-12 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none">
                          <path
                            fill="currentColor"
                            d="M3 5v-.5a.5.5 0 0 0-.5.5H3Zm18 0h.5a.5.5 0 0 0-.5-.5V5ZM3 5.5h18v-1H3v1ZM20.5 5v12h1V5h-1ZM19 18.5H5v1h14v-1ZM3.5 17V5h-1v12h1ZM5 18.5A1.5 1.5 0 0 1 3.5 17h-1A2.5 2.5 0 0 0 5 19.5v-1ZM20.5 17a1.5 1.5 0 0 1-1.5 1.5v1a2.5 2.5 0 0 0 2.5-2.5h-1Z"
                          />
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m3 5l9 9l9-9"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="col-span-11">Email</div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div></div>
                    <div className="col-span-11 text-sm text-blue-600">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Edit contact Info */}
            {editComponent && (
              <div className="p-5 flex flex-col gap-3">
                
                <div className="flex flex-col">
                  <div className="">Your Profile</div>
                  <div className="text-sm text-blue-600 cursor-pointer">
                    {router.asPath}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="">Email</div>
                  <div className="text-sm text-blue-600">{user?.email}</div>
                </div>
                <div className="flex flex-col">
                  <div className="">Phone</div>
                  <div className="text-sm">
                    <input
                      type="phone"
                      maxLength={13}
                      value={phoneNumber}
                      placeholder="phone"
                      onChange={handlePhoneNumberChange}
                      className="w-full h-9 text-base px-4 rounded-md ring-1 ring-black focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="">Address</div>
                  <div className="text-sm">
                    <input
                      type="text"
                      placeholder="address"
                      maxLength={50}
                      value={address}
                      onChange={handleAddressChange}
                      className="w-full h-9 text-base px-4 rounded-md ring-1 ring-black focus:ring-blue-400 focus:outline-none placeholder:text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleContactInfoUpdate}
                    className={`${"group font-medium tracking-wide select-none overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 hover:text-blue-500 focus:text-blue-500"} h-10 border-2 border-solid px-8 rounded-md relative inline-flex items-center justify-center bg-blue-500 text-white border-blue-500`}
                  >
                    <strong className="font-medium text-base">Save</strong>
                    <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default ContactInfoModal;
