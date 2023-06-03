import React, { useState, useEffect, useRef } from 'react'

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownVisible(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleInputChange = (event) => {
    const { value } = event.target
    setSearchTerm(value)

    const mockSuggestions = ['apple', 'banana', 'cherry', 'grape', 'orange']
    const filteredSuggestions = mockSuggestions.filter((suggest) =>
      suggest.toLowerCase().includes(value.toLowerCase()),
    )
    setSuggestions(filteredSuggestions)
    setDropdownVisible(value.length > 0)
  }

  const handleCloseButton = () => {
    setDropdownVisible(false)
    setSearchTerm('')
    setSuggestions([])
  }

  const handleInputField = () => {
    if (suggestions.length > 0) {
      setDropdownVisible(true)
    }
  }

  return (
    <div ref={ref} className="absolute inset-0">
      <div className="relative w-[90%] sm:w-[80%] md:w-[600px] flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={handleInputField}
          placeholder="Search..."
          className="placeholder:text-xs sm:placeholder:text-sm text-xs sm:text-sm w-full p-2 pl-2 sm:pl-4 pr-16 sm:pr-20 focus:outline-none rounded-md"
        />
        <button className="absolute right-0 bg-green-300 p-1 sm:p-2 rounded-tr-md rounded-br-md">
          sea
        </button>
        {searchTerm != '' && (
          <button
            onClick={handleCloseButton}
            className="z-10 -ml-14 sm:-ml-16 rounded-full w-4 h-4 bg-gray-300 flex items-center justify-center"
          >
            x
          </button>
        )}
      </div>

      {dropdownVisible && (
        <div
          className={`${
            suggestions.length >= 1 && 'p-2 sm:p-4 '
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
  )
}