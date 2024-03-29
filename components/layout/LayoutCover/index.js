import Head from "next/head";
import Navigation from "../MainNavigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CommentModal from "@components/components/Modals/commentModal";
import ContactInfoModal from "@components/components/Modals/contactInfo";
import ProfileModal from "@components/components/Modals/profileModal";
import ImageBannerModal from "@components/components/Modals/profileImageModal";
import PostModal from "@components/components/Modals/postModal";
import BusinessModal from "@components/components/Modals/businessModal";

const LayoutCover = ({ title, keyword, description, children }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [iconColor, setIconColor] = useState("white");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (router.pathname != "/") {
        setIsScrolled(true);
        setIconColor("#243b76");
      } else if (scrollTop > 0) {
        setIsScrolled(true);
        setIconColor("#243b76");
      } else {
        setIsScrolled(false);
        setIconColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll) && win;
    };
  }, []);

  return (
    <>
      <CommentModal />
      <BusinessModal />
      <PostModal />
      <ContactInfoModal />
      <ProfileModal />
      <ImageBannerModal />
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keyword} />
          <link rel="icon" href="" />
        </Head>
        <div id="content">
          <Navigation isScrolled={isScrolled} iconColor={iconColor} />
        </div>
        {children}
      </div>
    </>
  );
};

export default LayoutCover;

LayoutCover.defaultProps = {
  title: "home | student space",
  description: "Student Space: where students meet to be discovered and discover",
  keyword: "student space, entrepreneurship, advert, sell, network",
  isScrolled: false,
};
