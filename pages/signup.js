const Signup = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2">
        <div className="hidden md:inline bg-blue-600 h-screen">2</div>
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-5 mb-4">
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
            <div className="text-center heading">
              Join Student Space today
            </div>
            <span className="font-bold text-[20px] text-primary-900">
              Sign up
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <div className="inputFieldContainer">
              <input
                className="inputField"
                type="text"
                placeholder="Full name"
              />
            </div>
            <div className="inputFieldContainer">
              <input
                className="inputField"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="inputFieldContainer">
              <input className="inputField" type="text" placeholder="Email" />
            </div>
            <div className="inputFieldContainer">
              <input
                className="inputField"
                type="text"
                placeholder="Password"
              />
            </div>
            <div className="inputFieldContainer">
              <input
                className="inputField"
                type="text"
                placeholder="Comfirm password"
              />
            </div>
          </div>
          <div className="mt-10 w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <button className="bStyle">
                <div className="flex justify-between px-10">
                  <span>Sign up</span>
                  <span>arrow</span>
                </div>
              </button>
              <div className="mt-2 text-xs opacity-80 cursor-pointer hover:text-primary-800 hover:font-semibold">
                Already have an acouunt? Log in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
