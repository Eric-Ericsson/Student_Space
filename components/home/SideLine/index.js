const SideLine = () => {
  return (
    <div className="container-content h-80 sm:h-96 flex items-center bg-[#024959] text-light rounded-md">
      <div className="flex justify-between w-full px-4 md:px-10">
        <div className="flex flex-col font-semibold gap-4">
          <span className="text-4xl">
            {/* Suddenly it's all so <span className="font-[playball]">doable</span>  */}
            Suddenly, It's All Within <span className="font-[playball]">reach</span> 
          </span>
          <button className="bg-green-700 w-44 p-2 rounded">
            Join Student Space
          </button>
        </div>
        <div className="hidden md:inline">Image</div>
      </div>
    </div>
  );
};

export default SideLine;
