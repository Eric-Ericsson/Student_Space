import { useState } from 'react'

const GeneralPage = () => {
  const [isShown, setIsShown] = useState(false)

  const handleActiveLogin = (e) => {
    setIsShown(true)
  }

  const handleUnActiveLogin = () => {
    setIsShown('')
  }
  const handleActiveSignup = (e) => {
    setIsShown(false)
  }

  const handleUnActiveSignup = () => {
    setIsShown('')
  }

  return (
    <div className="bg-blue-600 w-full h-screen m-auto">
      <div className="grid md:grid-cols-2">
      <div className="hidden relative md:block bg-[url('/social_network_bg.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="bg-[#243b76] bg-opacity-90 w-full h-screen flex items-center justify-center"> 
          <svg
                className="w-52 lg:w-60 h-56 lg:h-64"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 84.85 109.92"
              >
                <g className='fill-white' data-name="Layer 2">
                  <path
                    d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z"
                  />
                </g>
              </svg>
        </div>
        </div>
       <div className="bg-[url('/social_network_bg.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="bg-[#243b76] bg-opacity-90 md:bg-white w-full h-screen flex flex-cols items-center">
          <div className="ml-10 md:ml-16 w-full">
            <div>
              <svg
                className="w-10 h-16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 84.85 109.92"
              >
                <g className='fill-white md:fill-[#243b76]' data-name="Layer 2">
                  <path
                    d="M80 9.75C76.9 7.68 58-4.41 34.39 1.72A56.42 56.42 0 0 0 5.46 20.36c-.82 1.25-7 10.92-3.21 22.18a25.11 25.11 0 0 0 9.64 12.54Q5.95 77.41 0 99.75a64.82 64.82 0 0 0 39.54 10 63.67 63.67 0 0 0 29.25-10C80.17 92.28 86.34 79.46 84.54 67c-1.9-13.13-11.82-20.44-13.83-21.86Z"
                  />
                </g>
              </svg>
            </div>
            <div className="flex flex-col gap-2 my-5">
              <span className="heading text-white">
                Let's find out...
              </span>
              <span className="text-[16px] text-light md:text-secondary_dark opacity-90">
                Join Student Space today
              </span>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <button className="flex items-center justify-center gap-2 text-[16px] md:border-primary-200 bg-white md:bg-none border-primary-600 rounded-3xl w-[90%] sm:w-[70%] md:w-[80%] lg:w-[60%] h-10 border-[2px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                  continue with google
                </button>
              </div>
              <div>
                <button
                  onMouseEnter={handleActiveSignup}
                  onMouseLeave={handleUnActiveSignup}
                  className={`${
                    isShown == false
                      ? 'bg-primary-600 text-light font-[550] border-none'
                      : 'border-[2px] text-primary-200 bg-white md:bg-none'
                  } rounded-3xl w-[90%] sm:w-[70%] md:w-[80%] lg:w-[60%] border-primary-600 md:border-primary-200 h-10 hover:border-[1px] font-[550] text-[16px]`}
                >
                  Sign up
                </button>
              </div>
              <div>
                <button
                  onMouseEnter={handleActiveLogin}
                  onMouseLeave={handleUnActiveLogin}
                  className={`${
                    isShown == true
                      ? 'bg-primary-600 text-white border-none shadow-md'
                      : 'border-[2px] text-primary-200 bg-white'
                  } rounded-3xl w-[90%] sm:w-[70%] md:w-[80%] lg:w-[60%] border-primary-600 md:border-primary-200 h-10 font-[550] text-[16px]`}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralPage
