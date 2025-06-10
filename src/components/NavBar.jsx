import React, { useContext } from "react";
import { NAVLINKS } from "../constants/navlinks";
import { AppContext } from "../context/AppContext";
import Navigator from "./Navigator";

const NavBar = () => {
  const { nav, handleNav, handleShow, cartItemsCount, wishlistItemsCount } = useContext(AppContext)

  return (
    <div className='w-full px-6 py-4 mb-4 flex justify-between items-center shadow fixed bg-white z-50'>

      <div className="logo text-black text-5xl font-extrabold items-center">
        <Navigator 
          url={'/'}
        >{'Shaup'}</Navigator>
      </div>

      {/* fullscreen menu */}
        <ul className='links hidden lg:flex p-0 tracking-wider text-sm'>
          {
            NAVLINKS.map((link, index) => (
              <Navigator 
                key={index}
                url={link.path}
                variants={'mr-8 cursor-pointer duration-150 hover:text-accent-700'}
              ><li onClick={handleNav}>{link.label}</li></Navigator>
            ))
          }
        </ul>

        <ul className='others flex h-fit text-sm justify-center items-center'>
          <li className="relative p-2 cursor-pointer">
            <p className="flex justify-center text-xl"><i className={`bi bi-search`}></i></p>
          </li>
          <li className="relative p-2 cursor-pointer" onClick={() => handleShow('wishlist')}>
            <span className='absolute w-5 h-5 bg-accent-700 rounded-full text-center right-0 top-0 text-white border-[2px] border-white font-bold text-xs'>{wishlistItemsCount}</span>
            <p className="flex justify-center text-xl"><i className={`bi ${wishlistItemsCount > 0 ? "bi-heart-fill" : "bi-heart"} duration-300`}></i></p>
          </li>
          <li className="relative p-2 cursor-pointer" onClick={() => handleShow('cart')}>
            <span className='absolute w-5 h-5 bg-accent-700 rounded-full text-center right-0 top-0 text-white border-[2px] border-white font-bold text-xs'>{cartItemsCount}</span>
            <p className="flex justify-center text-xl"><i className={`bi ${cartItemsCount > 0 ? "bi-bag-fill" : "bi-bag"} duration-300`}></i></p>
          </li>
          <li className="relative p-2 cursor-pointer">
            <p className="flex justify-center text-2xl"><i className={`bi bi-person`}></i></p>
          </li>
        </ul>
        {/* fullscreen menu ends here */}

      <div onClick={handleNav} className="flex justify-center items-center rounded-full bg-white size-10 cursor-pointer lg:hidden relative z-50">
        <i className={`bi ${nav ? "bi-x-lg text-accent-600" : "bi-list"} text-lg transition-all duration-150`}></i>
      </div>


        {/* mobile side menu */}

        <div className={`top-0 left-0 w-screen h-screen ${nav ? "fixed bg-black/50 z-40" : "hidden"}  lg:hidden transition-all duration-150`}>
          
          <div className={`fixed w-[60%] h-full top-0 ${nav ? "left-0" : "-left-full"} px-6 py-4 bg-white overflow-y-scroll shadow-lg transition-all duration-150 z-40`}>
            <div className="logo text-black text-5xl font-extrabold items-center">
              <p>Shaup</p>
            </div>

            <ul className='links flex flex-col p-4 uppercase tracking-wider text-xs md:text-sm'>
              {
                NAVLINKS.map((link, index) => (
                  <Navigator 
                    key={index}
                    url={link.path}
                    variants={'w-full p-6 px-3 hover:border-b-[1px] hover:border-b-accent-700 hover:translate-x-4 duration-200 cursor-pointer'}
                  ><li onClick={handleNav}>{link.label}</li></Navigator>
                ))
              }
            </ul>

            <ul className='others flex flex-col p-7 tracking-widest text-sm text-[#737373] font-thin'>
              <li className='hover:font-extrabold align-left cursor-pointer underline'>Login/Register</li>
              <li className='my-10'> <input className="border border-opacity-50 rounded-md py-4 px-3 w-full active:border-black active:outline-none" type="search" name="search" id="" placeholder="Search..."/></li>
            </ul>
          </div>

        </div>
    </div>
  );
};

export default NavBar;
