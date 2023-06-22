import Head from 'next/head'
import Navigation from '../MainNavigation'
import { useEffect, useState } from "react";



const LayoutCover = ({ title, keyword, description, children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [iconColor, setIconColor] = useState("white");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > 0) {
        setIsScrolled(true);
        setIconColor("#243b76");
      } else {
        setIsScrolled(false);
        setIconColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Immediately trigger handleScroll to set initial state correctly
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll) && win;
    };
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <link rel="icon" href="" />
      </Head>

      <div id="content">
        <Navigation isScrolled={isScrolled} iconColor={iconColor}/>
      </div>
      {children}
    </div>
  )
}

export default LayoutCover

LayoutCover.defaultProps = {
  title: 'home | student space',
  description: 'Student Space',
  keyword: 'student space',
  isScrolled: false,
}
