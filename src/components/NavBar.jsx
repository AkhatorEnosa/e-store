import React, { useContext } from "react";
import { NAVLINKS } from "../constants/navlinks";
import { AppContext } from "../context/AppContext";
import Navigator from "./Navigator";

const NavBar = (props) => {
  const { nav, handleNav } = useContext(AppContext)

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

        <ul className='others flex tracking-widest text-sm text-black justify-end align-bottom items-center'>
          <li className='mr-6 hidden lg:flex hover:text-accent-700 cursor-pointer duration-150 underline'>Login/Register</li>
          <li className='mr-6 hidden lg:flex cursor-pointer hover:text-accent-700 text-lg'><i className="bi bi-search"></i></li>
          <li className='mr-6 p-2' onClick={props.handleShow}>
            <div className="cursor-pointer">
              <span className='absolute w-4 h-4 bg-accent-700 rounded-full text-center top-6 text-white font-bold text-xs lg:top-6 lg:right-12'>{props.itemCount}</span>
              <p className="flex justify-center text-xl"><i className="bi bi-bag-fill"></i></p>
            </div>
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
