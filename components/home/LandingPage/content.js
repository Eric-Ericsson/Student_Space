import { SearchBar } from "./searchbar";

export const Content = () => {
  return (
    <div className="absolute inset-0 pl-4 sm:pl-6 md:pl-10 h-[70%] md:h-full flex flex-col gap-5 justify-center">
      <div>
        <div className="font-[Poppins] text-3xl md:text-5xl font-bold text-light w-[80%] sm:w-[70%] md:w-[700px] drop-shadow-sm">
          {/* Find the right<span className="font-[Playball]">&nbsp;freelance</span> service, right away */}
        Discover and be Discovered; Where <span className="font-[Playball]">Talents</span> Meet <span className="font-[Playball]">Opportunities.</span>
        </div>
      </div>
      <div className="relative">
        <SearchBar />
      </div>
      <div className="pt-8 sm:pt-10 flex gap-2 sm:gap-4 text-xs sm:text-sm text-white">
        <button className="rounded-3xl border-[1px] px-2">Intenships</button>
        <button className="rounded-3xl border-[1px] px-2">Business</button>
        <button className="rounded-3xl border-[1px] px-2">Programming</button>
      </div>
    </div>
  );
};
