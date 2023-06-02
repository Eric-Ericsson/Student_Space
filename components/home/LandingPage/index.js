import React, { useEffect, useRef } from 'react'
import Swiper, { Autoplay, EffectFade } from 'swiper'
import { SearchBar } from './searchbar'

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
    <div className=" landing-swiper w-full min-h-screen bg-blue-40">
      <div className="swiper-wrapper h-screen relative">
        <div
          className={`swiper-slide pl-10 bg-blue-300 h-full flex flex-col gap-5 justify-center `}
        ></div>
        <div
          className={`swiper-slide pl-10 bg-blue-600 h-full flex flex-col gap-5 justify-center `}
        ></div>
        <div
          className={`swiper-slide pl-10 bg-blue-900 h-full flex flex-col gap-5 justify-center `}
        ></div>
        <div className="absolute inset-0 pl-10 h-full flex flex-col gap-5 justify-center">
          <div>
            <span className="text-5xl font-bold text-light w-[600px] flex-wrap flex drop-shadow-sm">
              Find the right freelance service, right away
            </span>
          </div>
          <div className="relative">
            <SearchBar />
          </div>
          <div className="pt-10 flex gap-4 text-sm text-white">
            <button className="rounded-3xl border-[1px] px-2">
              Intenships
            </button>
            <button className="rounded-3xl border-[1px] px-2">Business</button>
            <button className="rounded-3xl border-[1px] px-2">
              Programming
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
