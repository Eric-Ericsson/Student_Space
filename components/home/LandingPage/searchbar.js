import React, { useState, useEffect, useRef } from "react";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    const mockSuggestions = ["apple", "banana", "cherry", "grape", "orange"];
    const filteredSuggestions = mockSuggestions.filter((suggest) =>
      suggest.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setDropdownVisible(value.length > 0);
  };

  const handleCloseButton = () => {
    setDropdownVisible(false);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleInputField = () => {
    if (suggestions.length > 0) {
      setDropdownVisible(true);
    }
  };

  return (
    <div ref={ref} className="absolute inset-0">
      <div className="relative w-[90%] sm:w-[80%] md:w-[600px] flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleInputField}
          placeholder="Search for talents, services, or opportunities..."
          className="placeholder:text-xs sm:placeholder:text-sm text-xs sm:text-sm w-full p-2 md:p-3 pl-2 sm:pl-4 pr-16 sm:pr-20 focus:outline-none rounded-md"
        />
        <button className="absolute right-0 bg-green-500 bg-opacity-95 p-1 sm:p-[7px] md:p-[10px] rounded-tr-md rounded-br-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M14.385 15.446a6.75 6.75 0 1 1 1.06-1.06l5.156 5.155a.75.75 0 1 1-1.06 1.06l-5.156-5.155Zm-7.926-1.562a5.25 5.25 0 1 1 7.43-.005l-.005.005l-.005.004a5.25 5.25 0 0 1-7.42-.004Z" clipRule="evenodd"/></svg>
        </button>
        {searchTerm != "" && (
          <button
            onClick={handleCloseButton}
            className="z-10 -ml-14 sm:-ml-16 rounded-full w-4 h-4 bg-gray-300 container-flex"
          >
            x
          </button>
        )}
      </div>

      {dropdownVisible && (
        <div
          className={`${
            suggestions.length >= 1 && "p-2 sm:p-4 "
          }bg-light w-[90%] sm:w-[80%] md:w-[600px] mt-2 rounded-lg`}
        >
          <ul>
            {suggestions.map((suggest, index) => (
              <li
                key={index}
                className="hover:bg-slate-200 p-2 px-3 hover:duration-100 hover:ease-out"
              >
                {suggest}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
