import Image from "next/image";

const HighLights = () => {
  return (
    <div className="contain lg:grid grid-cols-2 py-20 bg-[#c7ebeb] items-center justify-center">
      <div>
        <div className="mb-6 heading">
          <span>
            The Greatest Advantage?{" "}
            <span className="font-[playball]">All-Inclusive</span>
          </span>
        </div>
        <div className="flex flex-col gap-3 lg:w-[80%] text-lg">
          <div>
            <div>
              <span className="font-semibold font-[Poppins]">
                Follow your interest
              </span>
            </div>
            <span>
              Follow your interests, discover your passions, unleash your
              potential, and embark on a fulfilling journey of personal growth
              and success.
            </span>
          </div>
          <div>
            <div>
              <span className="font-semibold font-[Poppins]">
                Hear what people are talking about
              </span>
            </div>
            <span>
              Hear the whispers and echoes of conversations that shape opinions,
              spark curiosity, and ignite inspiration. Discover the trending
              topics, captivating stories, and thought-provoking discussions
              that are buzzing around.
            </span>
          </div>
          <div>
            <div>
              <span className="font-semibold font-[Poppins]">
                Join the conversation
              </span>
            </div>
            <span>
              In this dynamic world of ideas and discussions, there's a place
              for you to join in and make your voice heard. Step into a vibrant
              community where thoughts, opinions, and experiences converge.
              Engage with like-minded individuals, industry experts, and
              passionate enthusiasts who share your interests.
            </span>
          </div>
          <div>
            <div>
              <span className="font-semibold font-[Poppins]">Do business</span>
            </div>
            <span>
              Discover a supportive ecosystem that nurtures your entrepreneurial
              spirit, fuels your ambition, and propels your business forward.
            </span>
          </div>
          <div>
            <div>
              <span className="font-semibold font-[Poppins]">
                Be discovered
              </span>
            </div>
            <span>
              Step into the spotlight and let your abilities shine. This is the
              platform where your creativity, skills, and passions find
              recognition and appreciation.
            </span>
          </div>
        </div>
      </div>
       <div className="relative lg:h-[70%] mt-4 lg:mt-0 rounded-md h-[250px] sm:h-[300px] bg-white">
        <Image src={'/partnerships.gif'} fill={true} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw" alt="aside-image" style={{objectFit: "contain"}}/>
      </div>
    </div>
  );
};

export default HighLights;
