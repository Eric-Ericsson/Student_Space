import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion";

import LayoutCover from '@components/components/layout/LayoutCover'
import { useState } from 'react';

const Business = () => {
  const [selectedId, setSelectedId] = useState(null);

  const items = [
    {
      id: 1,
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fflip.jpg?alt=media&token=0a929e40-603b-4e91-a55c-9ad8fa1f39e2",
    },
    {
      id: 2,
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fkebab.jpg?alt=media&token=73bdd415-9321-464c-9502-862e1727f20f",
    },
    {
      id: 3,
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Flaptop.jpg?alt=media&token=98d05f51-3eef-4552-8c36-56d0e52d3f21",
    },
    {
      id: 4,
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fmid_sem_food.jpg?alt=media&token=94851bb3-72c7-4c6b-bf20-af8d39bfdac8",
    },
    {
      id: 5,
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fprime.jpg?alt=media&token=f636b756-3936-428e-824d-b9e8b3fd314c",
    },
    {
      id: 6,
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Frepair_services.jpg?alt=media&token=17abedce-69ea-49df-bdc7-c0f7ec052c58",
    },
    {
      id: 7,
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fvotex.jpg?alt=media&token=7f26c96c-02fe-41b3-9d6b-ee8cb9f98ceb",
    },
    {
      id: 8,
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fstorage_memory.jpg?alt=media&token=a6d94068-d38d-4b12-8719-fd1ceca28d98",
    },
    {
      id: 9,
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fsobolo.jpg?alt=media&token=7cda8dde-5221-42c0-af10-744caa9035d8",
    },
  ];

  return (
    <LayoutCover title={'media | student clinic'}>
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
         <div className="mt-8 grid gap-7 text-center md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:text-left lg:gap-7">
      {items.map((slide) => (
        <motion.div
          key={slide.id}
          layoutId={slide.id}
          onClick={() => setSelectedId(slide.id)}
          className={`bg-gray-300 relative h-[250px] rounded-2xl border-shadow-xl sm:h-[400px] md:h-[350px]`}
        >
          <Image
            src={slide.image}
            fill={true}
            alt={slide.title}
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
            {items.map((slide) => {
              if (slide.id === selectedId) {
                return (
                  <motion.div
                    layoutId={slide.id}
                    key={slide.id}
                    className="p-8 flex flex-col items-center relative h-[50%] w-[90%] md:h-[90%] md:w-[70%]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={slide.image}
                      fill={true}
                      alt={slide.title}
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
    </LayoutCover>
  )
}

export default Business
