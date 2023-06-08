import { useEffect, useRef } from "react";
import Swiper, { Navigation } from "swiper";

Swiper.use([Navigation]);
const Works = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) {
      swiperRef.current = new Swiper(".work-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        reverseDirection: true,
        navigation: {
          nextEl: ".work-swiper-button-next",
          prevEl: ".work-swiper-button-prev",
        },
        breakpoints: {
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        },
      });
    }
  }, []);

  return (
    <>
      <div className="px-2 mx-4 md:mx-10 mt-10 font-[Poppins] font-semibold text-3xl">Services</div>
      <div className="relative work-swiper px-2 mx-4 md:mx-10 overflow-hidden mt-4">
        <div className="swiper-wrapper">
          <div className="swiper-slide w-20 h-60 bg-blue-100">one</div>
          <div className="swiper-slide w-20 h-60 bg-blue-300">two</div>
          <div className="swiper-slide w-20 h-60 bg-blue-400">3</div>
          <div className="swiper-slide w-20 h-60 bg-blue-500">4</div>
          <div className="swiper-slide w-20 h-60 bg-blue-600">5</div>
          <div className="swiper-slide w-20 h-60 bg-blue-700">6</div>
          <div className="swiper-slide w-20 h-60 bg-blue-600">7</div>
          <div className="swiper-slide w-20 h-60 bg-blue-700">8</div>
        </div>
        <div class="work-swiper-button-prev swiper-button-prev flex items-center justify-center drop-shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z"/></svg>
        </div>
        <div class="work-swiper-button-next swiper-button-next flex items-center justify-center drop-shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
        </div>
      </div>
    </>
  );
};

export default Works;
