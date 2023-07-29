import { useSession } from "next-auth/react";
import Link from "next/link";

const Oftheday = () => {
  const { data: session } = useSession();

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
        <div className="contain py-20 flex flex-col md:grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex flex-col text-[#012E40]">
              <span className="heading">Content of the Day</span>
              <div className="flex flex-col gap-2 text-lg sm:text-xl md:text-2xl">
                <span className="font-[playball]">Artificial Intilligence</span>
                <span className="">Eric Ericsson</span>
                <Link
                  href={
                    session
                      ? `/profile/Dj7DSZGEzOP5Ct3feir7fj4vSqy2`
                      : "/auth/signin"
                  }
                >
                  <button
                    className={`group font-medium tracking-wide select-none overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 hover:text-white h-10 border-[1px] border-solid px-8 rounded-3xl relative inline-flex items-center justify-center bg-white text-blue-600 border-blue-600 w-44`}
                  >
                    <strong className="font-medium text-xs sm:text-sm">
                      View Profile
                    </strong>
                    <span className="absolute bg-blue-600 bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1]"></span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative md:col-span-2 w-[100%] sm:w-[80%] md:w-full lg:w-[700px] h-80 sm:h-96 md:h-[400px] lg:h-[500px] rounded-3xl bg-gray-100">
            <div className={`image-container`}>
              <img
                src={"https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/posts%2FdILjkOMsUCsAAM1ILknQ%2Fimage?alt=media&token=f3e0c19e-a62e-46db-bc5a-5bab623539a8"}
                alt="content-of-the-day"
                className="imageClass"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oftheday;
