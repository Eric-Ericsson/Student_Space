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
      id: 'step-into-the-world-of-artificial-intelligence',
      title: "Artificial Intelligence",
      username: "Eric Ericsson",
      image: "/ai.jpg",
    },
    {
      id: 'i-am-thrilled-to-share-my-passion',
      title: "Fashionist",
      username: "Esther Amoah",
      image: "/fashion.jpg",
    },
    {
      id: 'welcome-to-my-world-of-creativity-and-inspiration',
      title: "Art and Design",
      username: "Michael Owens",
      image: "/art_design.jpg",
    },
    {
      id: 'creative-writing-is-a-magical-journey-that-takes-us',
      title: "Creative Writing",
      username: "Maxwell",
      image: "/creative_writing.jpg",
    },
    {
      id: 'where-lines-of-code-build-bridges-between-imagination-and-reality',
      title: "Web Development",
      username: "James White",
      image: "/web_development.jpg",
    },
    {
      id: 'data-science-about-understanding-the-context-and-painting-a-vivid-picture-with-data-driven',
      title: 'Data Science',
      username: "Mary Edger",
      image: "/data_science.jpg",
    },
    {
      id: 'mobile-app-development-ideas-come-to-life-and-innovations',
      title: "Mobile App Development",
      username: "Kofi Asamoah",
      image: "/app_development.jpg",
    },
    {
      id: 'We-are-dedicated-to-providing-fast-efficient-and-reliable-solutions',
      title: "Delivery Service",
      username: "Ebenezer Annan",
      image: "/artist.png",
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
