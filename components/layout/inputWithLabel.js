import { useState } from "react";

function InputWithLabel({ label, type, value, onChange, error, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative inputFieldContainer">
      <label
        htmlFor={rest.id}
        className={`absolute left-4 transition-all duration-200 ${
          isFocused || value
            ? "-top-2 text-xs bg-[#2E4278] md:bg-white px-2"
            : "top-1/2 -translate-y-1/2 text-sm"
        } ${isFocused || value ? "text-white md:text-gray-600" : "text-gray-300 md:text-gray-600"}`}
      >
        {label}
      </label>
      <input
        {...rest}
        className={`inputField me`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        value={value}
        onChange={onChange}
        />
        {label == 'Password' && (<p className="mt-1 text-light opacity-90 md:text-black cursor-pointer text-xs absolute right-2 -bottom-9">forgot password?</p>)}
         {error && (
        <p className="mt-1 text-red-500 text-xs absolute left-2 -bottom-9">{error}</p>
      )}
    </div>
  );
}

export default InputWithLabel;
