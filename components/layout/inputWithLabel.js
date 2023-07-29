import { useState } from "react";
import { useRouter } from "next/router";
import { showConfirmPassword, showPassword } from "@components/atom/modalAtom";
import { useRecoilState } from "recoil";

function InputWithLabel({ label, type, value, onChange, error, ...rest }) {
  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false);
  const [showPass, setShowPass] = useRecoilState(showPassword);
  const [showConPassword, setShowConPassword] = useRecoilState(showConfirmPassword);

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
            : "top-1/2 -translate-y-1/2 text-xs"
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

        {label == 'Password' && (<div onClick={() => setShowPass(!showPass)} className=" text-light opacity-90 md:text-black cursor-pointer text-xs absolute right-3 bottom-[9px] sm:bottom-[10px] hover:text-secondary"> 
        {showPass ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3c1.641 0 3-1.358 3-3c0-1.641-1.359-3-3-3z"/><path fill="currentColor" d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5c-.504 1.158-2.578 5-7.926 5z"/></svg>
            ) : ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038c-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293L2.293 3.707l18 18l1.414-1.414l-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558l-2.28-2.28c.19-.39.308-.819.308-1.278c0-1.641-1.359-3-3-3c-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5c-.302.692-1.166 2.342-2.954 3.558z"/></svg>)
          }
        </div>)}

        {label == 'Confirm Password' && (<div onClick={() => setShowConPassword(!showConPassword)} className=" text-light opacity-90 md:text-black cursor-pointer text-xs absolute right-3 bottom-[9px] sm:bottom-[10px] hover:text-secondary">
          {showConPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3c1.641 0 3-1.358 3-3c0-1.641-1.359-3-3-3z"/><path fill="currentColor" d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5c-.504 1.158-2.578 5-7.926 5z"/></svg>
            ) : ( <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038c-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293L2.293 3.707l18 18l1.414-1.414l-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558l-2.28-2.28c.19-.39.308-.819.308-1.278c0-1.641-1.359-3-3-3c-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5c-.302.692-1.166 2.342-2.954 3.558z"/></svg>)
          }
        </div>)}
        {rest.id == 'login' && (<div onClick={() => router.replace('/auth/reset')} className=" text-light opacity-90 md:text-black cursor-pointer text-xs absolute right-2 -bottom-5 hover:text-secondary">forgot password?</div>)}
         {error && (
        <p className="mt-1 text-red-500 text-xs absolute left-2 -bottom-9">{error}</p>
      )}
    </div>
  );
}

export default InputWithLabel;
