import React, { useEffect, useRef } from 'react'
import Swiper, { Autoplay, EffectFade } from 'swiper'
import { SearchBar } from './searchbar'
import { Content } from './content'

Swiper.use([EffectFade, Autoplay])

const LandingPage = () => {
  const swiperRef = useRef(null)

  useEffect(() => {
    if (!swiperRef.current) {
      swiperRef.current = new Swiper('.landing-swiper', {
        // speed: 50,
        effect: 'fade',
        // autoplay: {
        //   delay: 4000,
        //   // reverseDirection: true,
        //   loop: true,
        // },
      })
    }
  }, [])

  return (
    <div className="overflow-x-hidden landing-swiper w-full sm:h-[70%] md:min-h-screen">
      <div className='relative h-[500px] bg-blue-900 md:hidden'></div>
      <div className="hidden md:flex swiper-wrapper h-[500px] md:h-screen relative">
        <div
          className={`swiper-slide pl-10 bg-blue-300 h-full flex flex-col gap-5 justify-center `}
        ></div>
        <div
          className={`swiper-slide pl-10 bg-blue-600 h-full flex flex-col gap-5 justify-center `}
        ></div>
        <div
          className={`swiper-slide pl-10 bg-blue-900 h-full flex flex-col gap-5 justify-center `}
        ></div>
        <Content />
      </div>
      <Content />
    </div>
  )
}

export default LandingPage
