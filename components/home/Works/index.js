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
      <div className="px-2 mx-4 md:mx-10 mt-10 heading">Services</div>
      <div className="relative work-swiper px-2 md:mx-10 overflow-hidden mt-4">
        <div className="swiper-wrapper">
          <div className="swiper-slide w-20 h-60 bg-[#c7ebeb]">one</div>
          <div className="swiper-slide w-20 h-60 bg-[#c7ebeb]">two</div>
          <div className="swiper-slide w-20 h-60 bg-[#c7ebeb]">3</div>
          <div className="swiper-slide w-20 h-60 bg-[#c7ebeb]">4</div>
          <div className="swiper-slide w-20 h-60 bg-[#c7ebeb]">5</div>
          <div className="swiper-slide w-20 h-60 bg-[#c7ebeb]">6</div>
          <div className="swiper-slide w-20 h-60 bg-[#c7ebeb]">7</div>
          <div className="swiper-slide w-20 h-60 bg-[#c7ebeb]">8</div>
        </div>
        <div class="work-swiper-button-prev swiper-button-prev flex items-center justify-center shadow-lg drop-shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="rotate(180 12 12)"><path fill="none" stroke="#01364b" stroke-width="6" d="m7 2l10 10L7 22"/></g></svg>
        </div>
        <div class="work-swiper-button-next swiper-button-next flex items-center justify-center shadow-lg drop-shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#01364b" stroke-width="6" d="m7 2l10 10L7 22"/></svg>
        </div>
      </div>
    </>
  );
};

export default Works;
