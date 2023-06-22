import Image from "next/image";

const Oftheday = () => {
  const svgCode = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M87,70.5Q74,91,50,91Q26,91,17.5,70.5Q9,50,19,32Q29,14,47,18.5Q65,23,82.5,36.5Q100,50,87,70.5Z" stroke="none" stroke-width="0" fill="#133441"></path></svg>`;

  const containerStyle = {
    background: `url("data:image/svg+xml,${encodeURIComponent(svgCode)}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "none",
    backgroundAttachment: "fixed",
  };
  return (
    <div style={containerStyle} className="parallax_container">
      <div className="parallax_overlay">
        <div className="contain py-20 flex flex-col md:grid md:grid-cols-3 gap-10  bg-green-4">
          <div className="">
            <div className="flex flex-col text-[#012E40]">
              <span className="heading">Content of the Day</span>
              <div className="flex flex-col gap-2 text-lg sm:text-xl md:text-2xl">
                <span className="font-[playball]">Artificial Intilligence</span>
                <span className="">James White</span>
                <button className="text-xs sm:text-sm opacity-95 p-1 border-[1px] border-[#012E40] w-24 rounded-3xl">
                  View Profile
                </button>
              </div>
            </div>
          </div>
          <div className="relative md:col-span-2 w-[90%] sm:w-[80%] md:w-full lg:w-[700px] h-80 sm:h-96 md:h-[400px] lg:h-[500px] rounded-3xl bg-black">
            <Image
              src={"/fashion.jpg"}
              fill={true}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              alt="content-of-the-day"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oftheday;
