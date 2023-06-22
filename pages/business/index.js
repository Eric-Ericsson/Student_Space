import Link from 'next/link'
import Image from 'next/image'
import LayoutCover from '@components/components/layout/LayoutCover'

const Business = () => {
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
          image: "/girl.png",
          data: "hello",
          date: "12/02/2023",
        },
        {
          id: 3,
          title: "Graphic Designer",
          image: "/chef.png",
          data: "hello",
          date: "12/02/2023",
        },
        {
          id: 4,
          title: "Artist",
          image: "/camera_girl.png",
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
    <LayoutCover title={'media | student clinic'}>
      <div
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/564x/c6/7b/b9/c67bb954ceece0e88b7995c7c87ba090.jpg')",
        }}
        className="PageHeader_wrapper__1j1-M relative pt-28 h-96 bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute bottom-20">
          <span className="pl-[20px] font-['Playfair_Display'] text-[45px] font-bold text-dark lg:px-[72px]">
          Product Marketplace
          </span>
        </div>
      </div>

      <div className="layoutPadding mb-12 uppercase text-white md:mb-60">
        <div className="mt-8 grid gap-7 text-center md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:text-left lg:gap-7">
          {media.map((slide, index) => (
            <div
              key={index}
              className="bg-gray-300 relative h-[350px] rounded-2xl border shadow-xl sm:h-[400px] md:h-[350px]"
            >
              <Image src={slide.image} fill={true} alt={slide.title} priority className="rounded-2xl" />
              <div className="absolute inset-0 rounded-2xl">
                <div className="absolute bottom-10 left-0 right-0 flex flex-col gap-3 px-5 font-semibold lg:px-10">
                  <span>{slide.date}</span>
                  <Link href={`/news/${slide.id}`}>
                      <div dangerouslySetInnerHTML={{__html: slide.title}} className="text-[20px] lg:text-[26px]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutCover>
  )
}

export default Business
