import LayoutCover from "@components/components/layout/LayoutCover";
import Image from "next/image";
import { useRouter } from "next/router";

const Expore = () => {
  const route = useRouter();

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
    <LayoutCover>
      {media.map(
        (slide, index) =>
          slide.id == route.query.id && (
            <div
              key={index}
              className="mx-[6%] md:mx-[10%] mb-24 md:mb-72 pt-28 text-center md:text-left"
            >
              <div className="mb-10 flex flex-col gap-2">
                <div>
                  <div
                    className="text-center md:text-left font-['playfair_Display'] text-[28px] font-black uppercase text-[#293a5a] sm:text-[32px] md:text-[40px] lg:text-[45px]"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />
                </div>
                <div>
                  <div
                    className="text-[20px] font-semibold text-blue"
                    dangerouslySetInnerHTML={{ __html: slide.date }}
                  />
                </div>
              </div>
              <div className="relative mb-14 h-[300px] sm:h-[400px] md:h-[400px] lg:h-[650px] bg-gray-300">
                <Image
                  src={slide.image}
                  alt=""
                  className="z-10 opacity-90"
                  layout="fill"
                />
              </div>
              <div className="text-[18px] text-dark opacity-95">
                <div dangerouslySetInnerHTML={{ __html: slide.data }} />{" "}
              </div>
            </div>
          )
      )}
    </LayoutCover>
  );
};

export default Expore;
