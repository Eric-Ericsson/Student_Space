import { SearchBar } from "./searchbar";

export const Content = () => {
  return (
    <div className="absolute inset-0 pl-4 sm:pl-6 md:pl-10 h-[70%] md:h-full flex flex-col gap-5 justify-center">
      <div>
        <span className="text-3xl md:text-5xl font-bold text-light w-[80%] sm:w-[70%] md:w-[600px] flex-wrap flex drop-shadow-sm">
          Find the right freelance service, right away
        </span>
      </div>
      <div className="relative">
        <SearchBar />
      </div>
      <div className="pt-5 sm:pt-10 flex gap-2 sm:gap-4 text-xs sm:text-sm text-white">
        <button className="rounded-3xl border-[1px] px-2">Intenships</button>
        <button className="rounded-3xl border-[1px] px-2">Business</button>
        <button className="rounded-3xl border-[1px] px-2">Programming</button>
      </div>
    </div>
  );
};
