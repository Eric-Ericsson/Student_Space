import { useEffect, useState } from "react";
import { Content } from "./content";
import Image from "next/image";

const LandingPage = () => {
  const [backgroundImage, setBackgroundImage] = useState("/girl.png");
  const [backgroundColor, setBackgroundColor] = useState("#012E40");

  useEffect(() => {
    const colors = ["#012E40", "#3CA6A6", "#8C1F28"];
    const images = ["/girl.png", "/chef.png", "/camera_girl.png"];

    let currentIndex = 0;

    // Function to change the background color
    const changeBackground = () => {
      setBackgroundColor(colors[currentIndex]);
      setBackgroundImage(images[currentIndex]);
      // console.log(backgroundImage)
      currentIndex = (currentIndex + 1) % colors.length;
    };

    const interval = setInterval(changeBackground, 4000); // 2 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{backgroundColor: backgroundColor}}
      className={`w-full relative md:min-h-screen overflow-hidden transition delay-0 duration-300 ease-in `}
    >
      <div className="relative h-[450px] bg-[#024864] md:hidden"></div>
      <div className="hidden absolute -right-20 bottom-0 md:flex lg:h-[90%] lg:w-[650px] w-[500px] h-[500px]">
        <Image
          src={backgroundImage}
          fill={true}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          alt="landing-page-background-image"
        />
      </div>
      <Content />
    </div>
  );
};

export default LandingPage;
