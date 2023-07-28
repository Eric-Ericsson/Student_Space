import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import LayoutCover from "@components/components/layout/LayoutCover";
import { useEffect, useState } from "react";
import { businessModal } from "@components/atom/modalAtom";
import { useRecoilState } from "recoil";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@components/firebase";
import LoadingState from "@components/components/space/loadingState";

const Business = () => {
  const { data: session } = useSession();
  const [selectedId, setSelectedId] = useState(null);
  const [businessFlyers, setBusinessFlyers] = useState();
  const [postLoading, setPostLoading] = useState(true);
  const [openModal, setOpenModal] = useRecoilState(businessModal);

  //retrieving all business flyers in descending order
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "businesses"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setBusinessFlyers(snapshot.docs);
          setPostLoading(false);
        }
      ),
    []
  );

  return (
    <LayoutCover title={"media | student clinic"}>
      <div
        style={{
          backgroundImage:
            "url('https://www.searchenginejournal.com/wp-content/uploads/2023/04/marketplace-ecommerce-sellers-6436a446a2a18-sej.png')",
        }}
        className="PageHeader_wrapper__1j1-M relative pt-28 h-96 bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute bottom-20 left-4">
          <span className="font-['Playfair_Display'] text-3xl sm:text-5xl font-black text-dark lg:px-[72px]">
            Product Marketplace
          </span>
        </div>
      </div>

      <div className="layoutPadding mb-12 uppercase text-white md:mb-60">
        {postLoading && <LoadingState />}
        <div className="mt-8 grid gap-7 text-center md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:text-left lg:gap-7">
          {!postLoading &&
            businessFlyers?.map((slide, index) => (
              <motion.div
                key={index}
                layoutId={index}
                onClick={() => setSelectedId(index)}
                className={`bg-gray-300 relative h-[250px] rounded-2xl border-shadow-xl sm:h-[400px] md:h-[350px]`}
              >
                <Image
                  src={slide.data().image}
                  fill={true}
                  alt="flyer"
                  priority
                  className="rounded-2xl"
                />
              </motion.div>
            ))}
          <AnimatePresence>
            {selectedId && (
              <motion.div
                key={selectedId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
                onClick={() => setSelectedId(null)}
              >
                {businessFlyers?.map((slide, index) => {
                  if (index === selectedId) {
                    return (
                      <motion.div
                        layoutId={index}
                        key={index}
                        className="p-8 flex flex-col items-center relative h-[50%] w-[90%] md:h-[90%] md:w-[70%]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Image
                          src={slide.data().image}
                          fill={true}
                          alt="flyer"
                          priority
                          className="rounded-2xl"
                        />
                        <button
                          onClick={() => setSelectedId(null)}
                          className="absolute right-16 top-5 text-white "
                        >
                          <svg
                            className="absolute inset-2 cursor-pointer drop-shadow-md"
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill="white"
                              d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {session?.user && (
        <button
          onClick={() => setOpenModal(true)}
          className="fixed bottom-8 left-10 w-12 h-12 bg-green-600 drop-shadow-2xl shadow-2xl flex items-center justify-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path fill="#fff" d="M20 14h-6v6h-4v-6H4v-4h6V4h4v6h6v4Z" />
          </svg>
        </button>
      )}
    </LayoutCover>
  );
};

export default Business;
