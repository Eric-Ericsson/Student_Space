import Image from "next/image";
import Link from 'next/link'

const OtherWorks = () => {
  return (
    <div className="contain">
      <div className="heading mb-6">Guides to Help You Grow</div>
      <div className="grid grid-cols-none sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-4">
      <Link href="/resources/guides/wordpress">
        <div>
          <div className="relative w-[100%] h-60 md:h-52 lg:h-60 bg-[#c7ebeb] text-light rounded-md">
            <Image
              src={"/wordpress.png"}
              layout="fill"
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
              src={"/logo_design.jpg"}
              layout="fill"
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
              src={"/digital_market.png"}
              layout="fill"
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
