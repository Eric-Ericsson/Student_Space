import Link from "next/link";
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

  const media = [
    {
      id: 1,
      title: "Artificial Intelligent",
      image: "/eric.png",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 2,
      title: "Fashionist",
      image: "/eric.png",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 3,
      title: "Graphic Designer",
      image: "/eric.png",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 4,
      title: "Artist",
      image: "/eric.png",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 5,
      title: "Riverdale",
      image: "/eric.png",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 6,
      title: "AI",
      image: "/eric.png",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 7,
      title: "Data Science",
      image: "/eric.png",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 8,
      title: "School of Business",
      image: "/eric.png",
      data: "hello",
      date: "12/02/2023",
    },
  ];

  return (
    <>
      <div className="contain-content heading px-2">
        Explore Services and Skills
      </div>
      <div className="relative work-swiper overflow-hidden px-2 mt-4 md:px-10">
        <div className="swiper-wrapper">
          {media.map((slide, index) => (
            <div key={index} className="swiper-slide w-20 h-60 bg-[#c7ebeb]">
              <Link href={`/explore/${slide.id}`}>
                <div className="w-full h-full bg-[#c7ebeb]">{slide.title}</div>
              </Link>
            </div>
          ))}
        </div>
        <div class="work-swiper-button-prev swiper-button-prev contain-flex drop-shadow-lg shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g transform="rotate(180 12 12)">
              <path
                fill="none"
                stroke="#01364b"
                stroke-width="6"
                d="m7 2l10 10L7 22"
              />
            </g>
          </svg>
        </div>
        <div class="work-swiper-button-next swiper-button-next contain-flex drop-shadow-lg shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#01364b"
              stroke-width="6"
              d="m7 2l10 10L7 22"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Works;
