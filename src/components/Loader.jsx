import React from 'react'

const Loader = () => {
  return (
    <div className="h-screen bg-[#fe4343] text-white">
      <div className="w-full h-full flex flex-col justify-center items-center gap-5 animate-pulse">
        <div className="logo text-8xl font-extrabold items-center">
          <p>Shaup</p>
        </div>
        <p className='self-center'>Loading...</p>
      </div>
    </div>
  )
}

export default Loader