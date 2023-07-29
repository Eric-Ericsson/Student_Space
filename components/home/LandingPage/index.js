import { useEffect, useState } from "react";
import { Content } from "./content";
import Image from "next/image";

const LandingPage = () => {
  const [backgroundImage, setBackgroundImage] = useState("https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fgirl-min.png?alt=media&token=7617ad1c-7bb2-4db3-8b87-6fd9c0fbd50e");
  const [backgroundColor, setBackgroundColor] = useState("#012E40");

  useEffect(() => {
    const colors = ["#012E40", "#3CA6A6", "#8C1F28"];
    const images = ["https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fgirl-min.png?alt=media&token=7617ad1c-7bb2-4db3-8b87-6fd9c0fbd50e", "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fchef-min.png?alt=media&token=bf087f2e-3666-4644-8e9b-b083c1ec1917", "https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fcamera_girl-min.png?alt=media&token=c8deb920-f74d-43f9-830f-7883681879ba"];

    let currentIndex = 0;

    // Function to change the background color
    const changeBackground = () => {
      setBackgroundColor(colors[currentIndex]);
      setBackgroundImage(images[currentIndex]);
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
        {backgroundImage && (  <Image
          src={backgroundImage}
          fill={true}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          alt="landing-page-background-image"
        />)}
      </div>
      <Content />
    </div>
  );
};

export default LandingPage;
