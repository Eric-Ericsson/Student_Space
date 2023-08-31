import {
    businessModal,
    containerZIndex,
    navZIndex,
    ueser_id,
  } from "@components/atom/modalAtom";
  import { useSession } from "next-auth/react";
  import { useRecoilState } from "recoil";
  import Modal from "react-modal";
  import { useEffect, useState, useRef } from "react";
  import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    serverTimestamp,
    updateDoc,
  } from "firebase/firestore";
  import { db, storage } from "@components/firebase";
  import { getDownloadURL, ref, uploadString } from "firebase/storage";
  
  function BusinessModal() {
    const { data: session } = useSession();
    const filePickerRef = useRef();
    const [openModal, setOpenModal] = useRecoilState(businessModal);
    const [id] = useRecoilState(ueser_id);
    const [headerZIndex, setheaderZIndex] = useRecoilState(navZIndex);
    const [conZIndex, setConZIndex] = useRecoilState(containerZIndex);
    const [textareaRows, setTextareaRows] = useState(1);
    const [postContent, setPostContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setuser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
  
    //retrieving a single user
    useEffect(() => {
      if (id) {
        const unsubscribe = onSnapshot(doc(db, "users", id), (snapshot) => {
          setuser(snapshot.data());
        });
        return () => unsubscribe();
      }
    }, [db, id]);
  
    //sending a business flyer to firebase
    const sendPost = async () => {
      if (loading) return;
      setLoading(true);
      const docRef = await addDoc(collection(db, "businesses"), {
        userId: session?.user?.uid,
        timestamp: serverTimestamp(),
      });
  
      const imageRef = ref(storage, `businesses/${docRef.id}/image`);
  
      //adding an image to post if an image is selected
      if (selectedFile) {
        await uploadString(imageRef, selectedFile, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "businesses", docRef.id), {
            image: downloadURL,
          });
        });
      }
  
      setPostContent("");
      setTextareaRows(1);
      setSelectedFile(null);
      setLoading(false);
    };
  
    //selects an image from the file explorer
    const addImageToPost = (e) => {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
  
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
      };
    };
  
    return (
      <>
        {openModal && (
          <Modal
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(50, 50, 50, 0.75)",
                backdropFilter: "blur(5px)",
              },
            }}
            shouldCloseOnEsc={true}
            isOpen={openModal}
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
              setPostContent("");
            }}
            onRequestClose={() => {
              setOpenModal(false);
            }}
            className={
              "max-w-lg w-[90%] overflow-scroll ease-in-out drop-shadow-2xl example delay-75 duration-300 max-h-[25rem] absolute top-28 left-[50%] translate-x-[-50%] bg-white rounded-xl"
            }
          >
            <div className="p-1 border-[1px] border-gray-300">
              <div className="flex items-center gap-5 border-b-[1px] p-2 ">
                <svg
                  onClick={() => {
                    setOpenModal(false);
                  }}
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
                <span className="text-lg font-semibold cursor-default">
                  Add Flyer
              </span>
              </div>
              <div className="mb-5 sm:mb-0 sm:mx-10 mx-2 mt-6">
                <div className=" ml-2 sm:ml-5 flex flex-col sm:gap-4">
                  <div className="flex flex-col gap-4 sm:mb-4">
                    <div>
                      <span className="heading">Your Business Flyer</span>
                    </div>
                    {selectedFile && (
                      <div className="relative">
                        <svg
                          onClick={() => setSelectedFile(null)}
                          className="absolute inset-2 cursor-pointer drop-shadow-md"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="white"
                            d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"
                          />
                        </svg>
                        <img
                          src={selectedFile}
                          className={`${loading && "animate-pulse"}`}
                        />
                      </div>
                    )}
   
                    {!loading && (
                      <div className="flex justify-between">
                        <div className="flex gap-2 sm:gap-5">
                          <div onClick={() => filePickerRef.current.click()}>
                            <button className="hover:bg-blue-200 p-2 gap-1 text-xs rounded-full flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#243b76"
                                  d="M5 3h13a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v11.59l4.29-4.3l2.5 2.5l5-5L20 16V6a2 2 0 0 0-2-2H5m4.79 13.21l-2.5-2.5L3 19a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-1.59l-5.21-5.2l-5 5M7.5 6A2.5 2.5 0 0 1 10 8.5A2.5 2.5 0 0 1 7.5 11A2.5 2.5 0 0 1 5 8.5A2.5 2.5 0 0 1 7.5 6m0 1A1.5 1.5 0 0 0 6 8.5A1.5 1.5 0 0 0 7.5 10A1.5 1.5 0 0 0 9 8.5A1.5 1.5 0 0 0 7.5 7Z"
                                />
                              </svg>{" "}
                              image
                            </button>
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              ref={filePickerRef}
                              onChange={addImageToPost}
                            />
                          </div>
                        </div>
                        <button
                          onClick={sendPost}
                          disabled={!selectedFile}
                          className={`${
                            !selectedFile
                              ? "cursor-not-allowed disabled bg-opacity-60"
                              : "group font-medium tracking-wide select-none overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 sm:hover:text-blue-500 sm:focus:text-blue-500"
                          } h-10 border-2 border-solid px-8 rounded-md relative inline-flex items-center justify-center bg-blue-500 text-white border-blue-500`}
                        >
                          <strong className="font-medium text-base">Post</strong>
                          <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 sm:group-hover:w-[105%] -z-[1] sm:group-focus:w-[105%]"></span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
    );
  }
  
  export default BusinessModal;
  