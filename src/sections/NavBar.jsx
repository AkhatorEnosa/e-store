import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navigator from "../components/Navigator";
import Logo from '../assets/logo.webp'
import SearchItem from "../components/SearchItem";
import { useDebounce } from "react-use";

const NavBar = () => {
  const { nav, formulateLinks, products, handleNav, expandSearchBar, setExpandSearchBar, searchQuery, setSearchQuery, handleShow, lockBodyScroll, cartItemsCount, wishlistItemsCount } = useContext(AppContext)
  const navLinks = formulateLinks([...products])
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
  const inputRef = useRef(null);
  const topNavRef = useRef(null);
  
  // change class of topNavRef if body is scrolled to 200px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        topNavRef.current.classList.add('fixed', 'top-0', 'bg-white', 'shadow');
      } else {
        topNavRef.current.classList.remove('fixed', 'top-0', 'bg-white', 'shadow');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    // Scroll to the top of the page when the search bar is expanded

  const handleExpandSearchBar = () => { 
    setExpandSearchBar(!expandSearchBar);
    setSearchQuery('')
    // Focus the search input when the search bar is expanded
    if (!expandSearchBar) {
      inputRef.current.focus();
    }
  }

  useDebounce(() => {
    setDebouncedSearchInput(searchQuery)
    }, 500, [searchQuery]
  )

  useMemo(() => {
    const foundItems = products.filter(item =>
      item.title.toLowerCase().includes(debouncedSearchInput.toLowerCase())
    )
    // Update search results with found items
    if (debouncedSearchInput.length === 0) {
      setSearchResults([]);
    } else if (foundItems.length === 0) {
      setSearchResults([]);
    } else {
      // Set search results to found items
      setSearchResults(foundItems)
    }

  }
  , [debouncedSearchInput]);

  return (
    <nav className='absolute w-full flex justify-between items-center z-[100]'>
      <div ref={topNavRef} className="w-full px-6 py-4 mb-4 flex justify-between items-center gap-4 lg:gap-10">
        <div className="w-fit lg:w-full flex justify-left items-center gap-10 " onClick={() => setExpandSearchBar(false)}>
          {/* logo */}
          <div className="logo text-black text-5xl font-extrabold items-center">
            <Navigator 
              url={'/'}
            ><img src={Logo} alt="logo" className="w-28"/></Navigator>
          </div>

          {/* fullscreen menu */}
          <ul className={`hidden ${expandSearchBar ? "w-[60%] overflow-clip" : "w-fit"} whitespace-nowrap gap-4 lg:flex text-sm duration-300`}>
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
        </div>


        <ul className='others flex w-full lg:w-fit h-fit text-sm justify-end items-center'>
          <li className="relative flex flex-col justify-center items-center p-2 cursor-pointer">
            {/* search bar */}
            <div className={`relative ${expandSearchBar && "border-[1px] border-black rounded-full pl-2"} py-1 justify-center items-center flex duration-300`}>
              {/* search bar */}
              <button className="flex justify-center text-base md:text-xl" onClick={() => handleExpandSearchBar()}><i className={`bi bi-search hover:text-primary-600 ${expandSearchBar && "text-sm"} delay-75 duration-300`}></i></button>
              {/* search input */}
              <input ref={inputRef} className={`${expandSearchBar ? "w-[150px] md:w-[250px] h-fit rounded-full px-3 " : "w-0"} text-xs placeholder:text-xs focus:placeholder:text-sm border-gray-300 focus:border-black placeholder:text-black outline-none duration-300`} type="search" name="search" id="" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoComplete="off"/>
            </div>
            <div className={`${expandSearchBar ? "absolute w-full top-14 block z-40" : "hidden"}`}>
              <div className="fixed h-screen w-screen top-0 left-0 block z-20" onClick={() => handleExpandSearchBar()}></div>
              <div className={`${searchQuery.length > 0 ? "flex flex-col gap-4" : "hidden"} w-[300px] lg:w-[350px] rounded-lg px-4 py-4 border-[1px] absolute bg-white shadow-lg z-50`}>
                {
                  searchResults.length > 5 ?
                    <>
                      {searchResults.splice(0,5).map((result, index) => (
                        <SearchItem 
                          key={result?.id*index}  // Add this unique key
                          item={result} 
                          />
                      ))}
                      <Navigator
                        url={`/search/${searchQuery}`}
                        variants={'flex justify-center items-center border-t pt-2 text-xs gap-1 hover:gap-3 hover:text-accent-700 font-semibold transition-all duration-150'}
                      >View More <i className="bi bi-arrow-right text-lg"></i></Navigator>
                      
                    </>

                  : 

                  searchResults.length > 0 ?
                    searchResults.map((result, index) => (
                      <SearchItem
                      key={result?.id*index}  // Add this unique key
                      item={result}
                      />
                    ))
                  
                  // If there are no search results, display a message
                  : <p className="flex gap-2 font-semibold text-[10px]"><i className="bi bi-search"></i> No search result</p>
                }
              </div>
            </div>
          </li>
          <li className="relative p-2 cursor-pointer" onClick={() => handleShow('wishlist')}>
            <button>
              <span className='absolute flex justify-center items-center w-4 h-5 px-2 md:px-0 md:w-5 md:h-5 bg-accent-700 rounded-full -right-1 md:right-0 -top-1 md:top-0 text-white border-[2px] border-white font-bold text-[10px] md:text-xs'>{wishlistItemsCount}</span>
              <p className="flex justify-center text-base md:text-xl hover:text-primary-600"><i className={`bi ${wishlistItemsCount > 0 ? "bi-heart-fill" : "bi-heart"} duration-300`}></i></p>
            </button>
          </li>
          <li className="relative p-2 cursor-pointer" onClick={() => handleShow('cart')}>
            <button>
              <span className='absolute flex justify-center items-center w-4 h-5 px-2 md:px-0 md:w-5 md:h-5 bg-accent-700 rounded-full -right-1 md:right-0 -top-1 md:top-0 text-white border-[2px] border-white font-bold text-[10px] md:text-xs'>{cartItemsCount}</span>
              <p className="flex justify-center text-base md:text-xl hover:text-primary-600"><i className={`bi ${cartItemsCount > 0 ? "bi-bag-fill" : "bi-bag"} duration-300`}></i></p>
            </button>
          </li>
          <li className="relative p-2 cursor-pointer">
            <p className="flex justify-center text-base md:text-2xl hover:text-primary-600"><i className={`bi bi-person`}></i></p>
          </li>
          <li className={`lg:hidden p-2 flex justify-center items-center rounded-full bg-white size-8 cursor-pointer z-[200]`} onClick={() => handleNav() & lockBodyScroll(!nav ? "active" : "")}>
            <p className={`text-base md:text-xl`}><i className={`bi ${nav ? "bi-x-lg text-accent-600 rotate-180" : "bi-list rotate-0"} duration-300`}></i></p>
          </li>
        </ul>
      </div>
      {/* fullscreen menu ends here */}

        {/* mobile side menu */}
        <div className={`w-screen h-fit lg:hidden fixed ${nav ? "opacity-100" : "opacity-0"} top-0 py-6 px-6 flex justify-end z-[100]`}>
          <p className={`p-2 flex justify-center items-center rounded-full bg-white size-8 cursor-pointer z-[200]`} onClick={() => handleNav() & lockBodyScroll(!nav ? "active" : "")}>
            <p className={`text-base md:text-xl`}><i className={`bi ${nav ? "bi-x-lg text-accent-600 rotate-180" : "bi-list rotate-0"} duration-300`}></i></p>
          </p>
        </div>

        <div className={`top-0 left-0 w-screen h-screen ${nav ? "fixed bg-black/50 z-40" : "hidden"}  lg:hidden transition-all duration-150`}>
          
          <div className={`fixed flex flex-col gap-6 w-[60%] h-full top-0 ${nav ? "left-0" : "-left-full"} px-6 py-4 bg-white overflow-y-scroll shadow-lg transition-all duration-150 z-40`}>
            <div className="logo text-black text-5xl font-extrabold items-center">
              <Navigator 
                url={'/'}
              ><img src={Logo} alt="logo" className="w-28"/></Navigator>
            </div>

            <ul className='links flex flex-col tracking-wider text-xs md:text-sm pr-5'>
              {
                navLinks.map((link, index) => (
                  <Navigator 
                    key={index}
                    url={link.url}
                    variants={'w-full p-4 hover:border-b-[1px] hover:border-b-accent-700 hover:translate-x-4 capitalize duration-200 cursor-pointer'}
                  ><li>{link.title}</li></Navigator>
                ))
              }
            </ul>
          </div>

        </div>
    </nav>
  );
};

export default NavBar;
