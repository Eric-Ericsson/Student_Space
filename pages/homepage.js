import LayoutCover from '@components/components/layout/LayoutCover';
import React, { useEffect, useRef, useState } from 'react'

function Homepage() {
  // const lineClampRef = useRef(null);
  const [clampedUsername, setClampedUsername] = useState('Eric Ericcson @ericericsson39')

  useEffect(() => {
    const originalText = clampedUsername;
    const words = originalText.split(' ');
    
    let clampedText = '';
    let clampedIndex = 0;

    // Manually adjust the desired word limits
    const maxWords = 3; // Number of words before the ellipsis
    const maxWordLength = 5; // Maximum length of each word
    // console.log(words)

    for (let i = 0; i < maxWords; i++) {
      const word = words[i];

      if (word.length > maxWordLength) {
        clampedText += word.substring(0, maxWordLength) + '.';
      } else {
        clampedText += word;
      }

      if (i < maxWords - 1) {
        clampedText += ' ';
      }
    }

    setClampedUsername(clampedText)
  }, []);

  return (
    <LayoutCover>
    <div className="relative">
    {/* Main content */}
      <div class="mx-2 sm:mx-8 md:mx-20 lg:mx-60 border-l-[1px] border-r-[1px] border-gray-300">
        <div className="sticky top-0 flex justify-between bg-[#024864] border-b-[1px] border-gray-300 pt-28 h-20 w-full text-[15px]">
          <div className="font-semibold ml-[10%] sm:ml-[20%] self-end pb-3 underline underline-offset-[13px] decoration-sky-500 decoration-[5px]">Space</div>
          <div className="mr-[10%] sm:mr-[20%] self-end pb-3">Following</div>
        </div>

        <div className="sm:mx-10 mx-2 grid grid-cols-12 mt-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black"></div>
          <div className="col-span-11 ml-6 flex flex-col sm:gap-4">
          <div className="flex flex-col gap-4 sm:mb-4">
            <div>
              <span className="heading">Let's find out</span>
            </div>
            <input className="inputField h-2 inputFieldContainer" type="text" />
            <div className="flex gap-2 sm:gap-5">
              <button className="hover:bg-blue-200 w-5 sm:w-8 h-5 sm:h-8 bg-black rounded-full">
                ic
              </button>
              <button className="hover:bg-blue-200 w-5 sm:w-8 h-5 sm:h-8 bg-black rounded-full">
                ic
              </button>
              <button className="hover:bg-blue-200 w-5 sm:w-8 h-5 sm:h-8 bg-black rounded-full">
                ic
              </button>
            </div>
          </div>
          </div>
        </div>

        <div className="divider"></div>
        <div className="sm:mx-10 mx-2 grid grid-cols-12">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black"></div>
          <div className="col-span-11 ml-6 flex flex-col sm:gap-4">
            <div className="text-xs sm:text-[15px]">
            <div className="sm:hidden ">{clampedUsername}</div>
            <div className="hidden sm:inline lime line-clamp-1">Eric Ericcson @ericericsson39</div>
            </div>
            <div className="flex flex-col gap-4 text-sm sm:text-[15px] ">
              <span className='line-clamp-5'>
                Quisque molestie id Etiam lacinia tincidunt tortor, non viverra
                justo facilisis semper. Sed vitae arcu ut dolor gravida
                molestie.Quisque molestie id Etiam lacinia tincidunt tortor, non
                viverra justo facilisis semper. Sed vitae arcu ut dolor gravida
                molestie.
              </span>
              <div className="w-full h-36 sm:h-72 md:h-96 bg-black rounded-2xl"></div>
            </div>
            <div>Icons</div>
          </div>
        </div>
        <div className="divider"></div>

        <div className="sm:mx-10 mx-2 grid grid-cols-12">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black"></div>
          <div className="col-span-11 ml-6 flex flex-col sm:gap-4">
            <div className="text-xs sm:text-[15px]">
            <div className="sm:hidden ">{clampedUsername}</div>
            <div className="hidden sm:inline lime line-clamp-1">Eric Ericcson @ericericsson39</div>
            </div>
            <div className="flex flex-col gap-4 text-sm sm:text-[15px] ">
              <span className='line-clamp-5'>
                Quisque molestie id Etiam lacinia tincidunt tortor, non viverra
                justo facilisis semper. Sed vitae arcu ut dolor gravida
                molestie.Quisque molestie id Etiam lacinia tincidunt tortor, non
                viverra justo facilisis semper. Sed vitae arcu ut dolor gravida
                molestie.
              </span>
              <div className="w-full h-36 sm:h-72 md:h-96 bg-black rounded-2xl"></div>
            </div>
            <div>Icons</div>
          </div>
        </div>
      </div>
    </div>
    </LayoutCover>
  )
}

export default Homepage
