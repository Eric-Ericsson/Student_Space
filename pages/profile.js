import React, { useEffect, useRef, useState } from 'react'

function Profile() {
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
    <div className="relative md:grid grid-cols-5 sm:mx-16 md:mx-5">
      {/* Left Sidebar */}
      <div className="hidden lg:inline-block bg-gray-300 min-h-screen"></div>

      {/* Profile Section */}
      <div class="col-span-3 border-l-[1px] border-r-[1px] border-gray-300">
          <div className='relative w-full bg-black h-28 sm:h-44'>
            <div>image</div>
            <div className='absolute top-[60%] sm:top-[50%] left-5 w-20 sm:w-44 h-20 sm:h-44 rounded-full bg-gray-200'>image</div>
            <div className='absolute -bottom-16 right-4 sm:right-10'>
              <button className='rounded-3xl px-3 sm:px-6 py-2 border-black border-[1px] text-xs sm:text-[15px]'>Edit Profile</button>
            </div>
          </div>
          <div className='mt-20 sm:mt-28 grid grid-cols-6 mx-2 text-sm sm:text-[15px]'>
            <div className='col-span-4 flex flex-col gap-2 sm:ml-6'>
              <div className='flex flex-col'>
              <span className='font-semibold text-base md:text-[20px]'>Eric Ericsson</span>
              <span>@ericericsson39</span>
              </div>
              <span className='text-xs'>Kwame Nkhrumah University of Science and Technology</span>
            </div>
            <div className='col-span-2'>
              <span>Contact Info</span>
              <div className='flex space-x-2 text-xs'>
                <span>Follow</span>
                <span>Following</span>
              </div>
            </div>
          </div>
          <div className='flex justify-between mx-[10%] md:mx-[20%] mt-10'>
              <span className='underline underline-offset-[10px] decoration-sky-500 decoration-[5px] font-semibold'>Post</span>
              <span>Replies</span>
              <span>Media</span>
              <span>Likes</span>
            </div>
            <div className='-mt-3 sm:-mt-8'>
            <div className='divider'></div>
            </div>
            
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

        <div className='-mt-5'>
            <div className='divider'></div>
            </div>

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

      <div className='hidden md:inline example max-h-screen md:px-4 lg:px-8 sticky top-0 overflow-y-scroll'>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold text-[15px]">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
            <div className="flex flex-col ">
              <span className="text-[13px] opacity-80">Trending in Ghana</span>
              <span className="font-semibold">Ayeduase Gate</span>
            </div>
      </div>
    </div>
  )
}

export default Profile
