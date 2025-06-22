import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navigator = ({ children, url, variants, title}) => {
  const { handleShow, handleNav, setExpandSearchBar,  setSearchQuery, lockBodyScroll } = useContext(AppContext);

  // Reset any active show state and close the navigation menu  if it was open
  // This is useful for closing the search bar  or any other open modal
  // when a link is clicked This will also reset the scroll position  to the top of the page when a link is clicked
  const handleClick = () => {
    setExpandSearchBar(false);
    setSearchQuery('');
    handleShow('');
    handleNav('link');
    lockBodyScroll('');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  return (
    <Link to={url} className={`cursor-pointer ${variants}`} onClick={handleClick} title={title}>
      {children}
    </Link>
  )
}

export default Navigator