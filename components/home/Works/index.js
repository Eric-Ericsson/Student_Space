import Image from "next/image";
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
      title: "Artificial Intelligence",
      username: "Eric Ericsson",
      image: "/ai.jpg",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 2,
      title: "Fashionist",
      username: "Ruth Doe",
      image: "/fashion.jpg",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 3,
      title: "Art and Design",
      username: "Michael Smith",
      image: "/art_design.jpg",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 4,
      title: "Artist",
      username: "James Mensah",
      image: "/artist.png",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 5,
      title: "Creative Writing",
      username: "Patrick Akoto",
      image: "/creative_writing.jpg",
      data: "hello",
      date: "12/02/2023",
    },
    {
      id: 6,
      title: "Web Development",
      username: "Joe Quaye",
      image: "/web_development.jpg",
      data: "Web Development",
      date: "12/02/2023",
    },
    {
      id: 7,
      title: "Data Science",
      username: "Mary Edger",
      image: "/data_science.jpg",
      data: "Data Science",
      date: "12/02/2023",
    },
    {
      id: 8,
      title: "Mobile App Development",
      username: "Kofi Asamoah",
      image: "/app_development.jpg",
      data: "Hello",
      date: "12/02/2023",
    },
  ];

  return (
    <>
      <div className="contain-content heading px-2">
        Explore Services and Skills
      </div>
      <div className="relative work-swiper overflow-hidden px-2 mt-4 md:px-10">
        <div className="swiper-wrapper rounded-lg">
          {media.map((slide, index) => (
            <div key={index} className="swiper-slide w-20 h-60 bg-gray-100 rounded-lg">
              <Link href={`/explore/${slide.id}`}>
                <div className="relative w-full h-full">
                  <Image src={slide.image} fill={true} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw" alt={slide.title} className="rounded-lg"/>
                  <div className="absolute top-0 flex flex-col p-2 md:p-4 text-light text-sm font-bold bg-gray-700 bg-opacity-50 w-full">
                    <span>{slide.username}</span>
                    <span className="text-base md:text-xl line-clamp-2">{slide.title}</span>
                  </div>
                  </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="work-swiper-button-prev swiper-button-prev contain-flex drop-shadow-lg shadow-lg">
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
                strokeWidth="6"
                d="m7 2l10 10L7 22"
              />
            </g>
          </svg>
        </div>
        <div className="work-swiper-button-next swiper-button-next contain-flex drop-shadow-lg shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#01364b"
              strokeWidth="6"
              d="m7 2l10 10L7 22"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Works;
