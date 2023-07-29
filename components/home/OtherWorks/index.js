import Image from "next/image";
import Link from 'next/link'

const OtherWorks = () => {
  return (
    <div className="contain">
      <div className="heading mb-6">Guides to Help You Grow</div>
      <div className="grid grid-cols-none sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-4 text-sm sm:text-base">
      <Link href="/resources/guides/wordpress">
        <div>
          <div className="relative w-[100%] h-60 md:h-52 lg:h-60 bg-[#c7ebeb] text-light rounded-md">
            <Image
              src={"https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fwordpress.png?alt=media&token=fb45ac62-d75f-4aa5-9aa7-a741fff40818"}
              fill={true}
              alt="wordpress-image-cover"
              className="absolute rounded-md"
            />
          </div>
          <div className="mt-3">
            <span className="font-semibold text-lg text-secondary_dark">
              How to build a Wordpress website for your small business
            </span>{" "}
            <br />
            <span className="opacity-70 line-clamp-4">
              Learn the steps required to build a professional WordPress site
              for your business. Anyone can build a WordPress site. And we show
              you how!
            </span>
          </div>
        </div>
      </Link>
      <Link href="/resources/guides/logo">
        <div>
          <div className="relative w-[100%] h-60 md:h-52 lg:h-60 bg-[#c7ebeb] rounded-md text-light">
            <Image
              src={"https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Flogo_design.jpg?alt=media&token=75e71038-6251-458f-ab87-cd1dfa9d103c"}
              fill={true}
              alt="logo-design"
              className="absolute rounded-md"
            />
          </div>
          <div className="mt-3">
            <span className="font-semibold text-lg text-secondary_dark">
              How to design a logo from Scratch
            </span>{" "}
            <br />
            <span className="opacity-70">
              12 steps to creating a business logo from scratch
            </span>
          </div>
        </div>
        </Link>
        <Link href="/resources/guides/online-business">
        <div>
          <div className="relative w-[100%] h-60 md:h-52 lg:h-60 bg-[#c7ebeb] rounded-md text-light">
            <Image
              src={"https://firebasestorage.googleapis.com/v0/b/twitter-v4-93513.appspot.com/o/myProjectImages%2Fdigital_market.png?alt=media&token=fcb45185-b24f-4c6b-b1ad-ab21ce97da03"}
              fill={true}
              alt="online-business"
              className="absolute rounded-md"
            />
          </div>
          <div className="mt-3">
            <span className="font-semibold text-lg text-secondary_dark">
              How to start an online business from home
            </span>{" "}
            <br />
            <span className="opacity-70">
              A step-by-step guide to learn everything you need to know about
              successfully starting an online business from home to find the
              flexibility, and freedom you desire.
            </span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default OtherWorks;
