import { useState } from 'react'

const LoginPage = () => {
  const [activeButton, setActiveButton] = useState(true)
  const [placeholderContent, setPlaceholderContent] = useState('Email')

  const handleEmailButtonClick = () => {
    setActiveButton(true)
    setPlaceholderContent('Email')
  }
  const handleUsernameButtonClick = () => {
    setActiveButton(false)
    setPlaceholderContent('Username')
  }

  return (
    <div>
      <div className="grid md:grid-cols-2">
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <div>
              <svg
                className="w-14 h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 84.85 109.92"
              >
                <g data-name="Layer 2">
                  <path
                    d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z"
                    style={{
                      fill: '#243b76',
                    }}
                  />
                </g>
              </svg>
            </div>
            <span className="heading">Welcome Back</span>
            <span className="font-bold text-[20px] text-primary-900">
              Log in
            </span>
          </div>
          <div className="my-5 inputFieldContainer">
            <button
              onClick={handleEmailButtonClick}
              className={`${
                activeButton
                  ? 'bg-primary-600 hover:bg-opacity-100 text-light'
                  : 'bg-none hover:bg-primary-600'
              } border-2 rounded-s-xl h-10  hover:text-light hover:bg-opacity-50 border-primary-600 w-[50%]`}
            >
              Email
            </button>
            <button
              onClick={handleUsernameButtonClick}
              className={`${
                activeButton
                  ? 'bg-none'
                  : 'bg-primary-600 hover:bg-opacity-100 text-light'
              } border-2 rounded-e-xl h-10 hover:bg-primary-600 hover:bg-opacity-50 hover:text-light border-primary-600 w-[50%]`}
            >
              Username
            </button>
          </div>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="inputFieldContainer">
              <input
                className="inputField"
                type="text"
                placeholder={placeholderContent}
              />
            </div>
            <div className="inputFieldContainer">
              <input
                className="inputField"
                type="text"
                placeholder="Password"
              />
              <div className="flex flex-col items-end mt-1 text-xs opacity-80 cursor-pointer hover:text-primary-800 hover:font-semibold">
                forgot password?
              </div>
            </div>
          </div>
          <div className="mt-10 w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <button className="bStyle">
                <div className="flex justify-between px-10">
                  <span>Log in</span>
                  <span>arrow</span>
                </div>
              </button>
              <div className="mt-2 text-xs opacity-80 cursor-pointer hover:text-primary-800 hover:font-semibold">
                Don't have an acouunt? Sign up
              </div>
            </div>
          </div>
        </div>
        <div className='bg-blue-600'>1</div>
      </div>
    </div>
  )
}

export default LoginPage
