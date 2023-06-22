import Link from "next/link";
import Image from "next/image";
import LayoutCover from "@components/components/layout/LayoutCover";

const Exhibit = () => {
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
    <LayoutCover title={"media | student clinic"}>
      <div
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/564x/c6/7b/b9/c67bb954ceece0e88b7995c7c87ba090.jpg')",
        }}
        className="PageHeader_wrapper__1j1-M relative pt-28 h-96 bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute bottom-20 left-4">
          <span className="font-['Playfair_Display'] text-3xl sm:text-5xl font-black text-dark lg:px-[72px]">
            Explore
          </span>
        </div>
      </div>

      <div className="layoutPadding mb-12 uppercase text-white md:mb-60">
        <div className="mt-8 grid gap-7 text-center md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:text-left lg:gap-7">
          {media.map((slide, index) => (
            <div
              key={index}
              className="bg-gray-300 relative h-[250px] rounded-2xl border-shadow-xl sm:h-[400px] md:h-[350px]"
            >
              <Image
                src={slide.image}
                fill={true}
                alt={slide.title}
                priority
                className="rounded-2xl"
              />
              <div className="absolute inset-0 rounded-2xl">
                <div className="absolute bottom-0 left-0 right-0 py-2 bg-black bg-opacity-30 flex flex-col font-semibold text-xs sm:text-sm md:text-base lg:px-4">
                  <span>{slide.date}</span>
                  <Link href={`/news/${slide.id}`}>
                    <div
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                      className="text-sm sm:text-base"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutCover>
  );
};

export default Exhibit;
