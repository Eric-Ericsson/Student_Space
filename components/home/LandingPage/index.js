import { useEffect, useState } from "react";
import { Content } from "./content";
import Image from "next/image";

const LandingPage = () => {
  const [backgroundColor, setBackgroundColor] = useState('#012E40');
  const [backgroundImage, setBackgroundImage] = useState('/girl.png');


  useEffect(() => {
    const colors = ['#012E40', '#8C1F28', '#3CA6A6'];
    const images = [
      '/girl.png',
      '/chef.png',
      '/camera_girl.png'
    ];

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
    <div className={`w-full relative md:min-h-screen overflow-hidden transition delay-0 duration-300 ease-in bg-[${backgroundColor}]`}>
      <div className="relative h-[450px] bg-[#024864] md:hidden"></div>
      <div className="hidden absolute -right-20 bottom-0 md:flex md:h-screen w-[700px] h-[700px]">
          <Image src={backgroundImage} fill/>
      </div>
      <Content />
      </div>

  );
};

export default LandingPage;
