import { useState, useEffect } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Use a timer to throttle the handleSearch function
    const timer = setTimeout(() => {
      handleSearch(searchTerm);
    }, 200); // Adjust the delay time (milliseconds) as needed

    // Clean up the timer to prevent calling handleSearch multiple times
    return () => clearTimeout(timer);
  }, [searchTerm, handleSearch]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Check if the search term is not empty before triggering the search
      if (searchTerm.trim() !== '') {
        handleSearch(searchTerm);
      }
    }
  };

  const handleClear = () => {
    // Clear the search term when the input is cleared
    setSearchTerm('');
    // Trigger handleSearch with an empty search term to clear the results
    handleSearch('');
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for users..."
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="bg-gray-5 px-4 py-2 rounded-md w-full focus:shadow-none"
      />
      {searchTerm && (
        <button
          className="absolute top-2 right-4 text-gray-500"
          onClick={handleClear}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
