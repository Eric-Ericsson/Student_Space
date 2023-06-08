const HighLights = () => {
  return (
    <div className="md:grid grid-cols-2 mt-20 px-4 md:px-10 py-20 bg-[#F1FDF7] items-center justify-center">
      <div>
        <div className="mb-6 text-3xl font-[Poppins] font-semibold">
          <span>The Best Part? <span className="font-[playball]">Everything</span></span>
        </div>
        <div className="flex flex-col gap-3 md:w-[80%] text-lg">
          <div>
            <div>
              <span className="font-semibold font-[Poppins]">Stick to your budget</span>
            </div>
            <span>
              Find the right service for every price point. No hourly rates,
              just project-based pricing.
            </span>
          </div>
          <div>
            <div>
              <span className="font-semibold font-[Poppins]">
                Get quality work done quickly
              </span>
            </div>
            <span>
              Hand your project over to a talented freelancer in minutes, get
              long-lasting results.
            </span>
          </div>
          <div>
            <div>
              <span className="font-semibold font-[Poppins]">Pay when you're happy</span>
            </div>
            <span>
              Upfront quotes mean no surprises. Payments only get released when
              you approve.
            </span>
          </div>
          <div>
            <div>
              <span className="font-semibold font-[Poppins]">Count on 24/7 support</span>
            </div>
            <span>
              Our round-the-clock support team is available to help anytime,
              anywhere.
            </span>
          </div>
        </div>
      </div>
      <div className="md:h-[90%] mt-4 md:mt-0 rounded-md h-[250px] sm:h-[300px] bg-gray-400">
        image
      </div>
    </div>
  );
};

export default HighLights;
