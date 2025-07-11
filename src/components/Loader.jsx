import React from 'react'
import Icon from '../assets/icon.webp'

const Loader = () => {
  return (
    <div className="h-screen bg-black text-white">
      <div className="w-full h-full flex flex-col justify-center items-center gap-5 animate-pulse">
        <div className="logo text-8xl font-extrabold items-center">
          <img src={Icon} alt="icon" className='w-24'/>
        </div>
        <p className='self-center'>Loading...</p>
      </div>
    </div>
  )
}

export default Loader