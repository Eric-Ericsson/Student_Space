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
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/posts%2FdILjkOMsUCsAAM1ILknQ%2Fimage?alt=media&token=f3e0c19e-a62e-46db-bc5a-5bab623539a8",
    },
    {
      id: 'i-am-thrilled-to-share-my-passion',
      title: "Fashionist",
      username: "Esther Amoah",
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/posts%2F8EMeCctooOSiOqN7Hncm%2Fimage?alt=media&token=426d8964-2772-472a-a9aa-0f35ae927bcc"
    },
    {
      id: 'welcome-to-my-world-of-creativity-and-inspiration',
      title: "Art and Design",
      username: "Michael Owens",
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/posts%2FoZeogdCvpgAT7jk8T1cc%2Fimage?alt=media&token=3b7f2b7a-df23-4b71-b81f-6ea2c34d2bde",
    },
    {
      id: 'creative-writing-is-a-magical-journey-that-takes-us',
      title: "Creative Writing",
      username: "Maxwell",
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/posts%2FzNGr83Qd1yuRRuAErAMA%2Fimage?alt=media&token=45ff9234-5e97-47de-bec8-ca03d8951b63",
    },
    {
      id: 'where-lines-of-code-build-bridges-between-imagination-and-reality',
      title: "Web Development",
      username: "James White",
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/posts%2FWOHFd8lBTi6uJv5XGR50%2Fimage?alt=media&token=70214a2a-72c1-477e-b1f4-4a7a48f2325d",
    },
    {
      id: 'data-science-about-understanding-the-context-and-painting-a-vivid-picture-with-data-driven',
      title: 'Data Science',
      username: "Mary Edger",
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/posts%2FfTR0WZjs32cAMlRaLQMP%2Fimage?alt=media&token=e9fdf00a-b0a9-49c8-8071-33c7e9ee6ef0",
    },
    {
      id: 'mobile-app-development-ideas-come-to-life-and-innovations',
      title: "Mobile App Development",
      username: "Kofi Asamoah",
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/posts%2FC7fTZv67TpcRI89BclPm%2Fimage?alt=media&token=e92ff3c5-0668-47fc-85bd-8ad87c8103c1",
    },
    {
      id: 'We-are-dedicated-to-providing-fast-efficient-and-reliable-solutions',
      title: "Delivery Service",
      username: "Ebenezer Annan",
      image: "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/posts%2FDLwvZ0Ut0mIAE4DFsoWh%2Fimage?alt=media&token=8a380b43-898e-4cdd-86dc-f024bd15406f",
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
