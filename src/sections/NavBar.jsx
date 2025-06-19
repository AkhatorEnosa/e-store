import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navigator from "../components/Navigator";
import Logo from '../assets/logo.webp'

const NavBar = () => {
  const { nav, formulateLinks, products, handleNav, handleShow, lockBodyScroll, cartItemsCount, wishlistItemsCount } = useContext(AppContext)
    const navLinks = formulateLinks([...products])
    const [expandSearchBar, setExpandSearchBar] = useState(false);

    const handleExpandSearchBar = () => { 
      setExpandSearchBar(!expandSearchBar);
    }

  return (
    <div className='w-full px-6 py-4 mb-4 flex justify-between items-center fixed bg-white z-[100]'>

      <div className="logo text-black text-5xl font-extrabold items-center">
        <Navigator 
          url={'/'}
        ><img src={Logo} alt="logo" className="w-32"/></Navigator>
      </div>

      {/* fullscreen menu */}
        <ul className='hidden w-fit gap-6 lg:flex text-sm'>
          {
            navLinks.map((link, index) => (
              <Navigator 
                key={index}
                url={link.url}
                variants={'hover:text-accent-700 capitalize cursor-pointer duration-150'}
              ><li>{link.title}</li></Navigator>
            ))
          }
        </ul>

        <ul className='others flex w-full lg:w-fit h-fit text-sm justify-end items-center'>
          <li className={`relative ${expandSearchBar && "border border-black rounded-full pr-2"} gap-2 justify-center items-center hidden lg:flex duration-150`}>
            <input className={`${expandSearchBar ? "w-fit h-fit rounded-full px-3 " : "w-0"} py-2 outline-none duration-300`} type="search" name="search" id="" placeholder="Search..."/>
            <button className="flex justify-center text-xl" onClick={() => handleExpandSearchBar()}><i className={`bi bi-search`}></i></button>
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

      <div onClick={() => handleNav() & lockBodyScroll(!nav ? "active" : "")} className="absolute right-5 flex justify-center items-center rounded-full bg-white size-10 cursor-pointer lg:hidden z-50">
        <i className={`bi ${nav ? "bi-x-lg text-accent-600" : "bi-list"} text-xl transition-all duration-150`}></i>
      </div>


        {/* mobile side menu */}

        <div className={`top-0 left-0 w-screen h-screen ${nav ? "fixed bg-black/50 z-40" : "hidden"}  lg:hidden transition-all duration-150`}>
          
          <div className={`fixed w-[60%] h-full top-0 ${nav ? "left-0" : "-left-full"} px-6 py-4 bg-white overflow-y-scroll shadow-lg transition-all duration-150 z-40`}>
            <div className="logo text-black text-5xl font-extrabold items-center">
              <p>Shaup</p>
            </div>

            <ul className='links flex flex-col p-4 tracking-wider text-xs md:text-sm'>
              {
                navLinks.map((link, index) => (
                  <Navigator 
                    key={index}
                    url={link.url}
                    variants={'w-full p-6 px-3 hover:border-b-[1px] hover:border-b-accent-700 hover:translate-x-4 capitalize duration-200 cursor-pointer'}
                  ><li>{link.title}</li></Navigator>
                ))
              }
            </ul>

            <ul className='others flex flex-col p-7 tracking-widest text-sm text-[#737373] font-thin'>
              <li className='my-10'> <input className="border border-opacity-50 rounded-full py-4 px-3 w-full outline-none active:outline-black" type="search" name="search" id="" placeholder="Search..."/></li>
            </ul>
          </div>

        </div>
    </div>
  );
};

export default NavBar;
