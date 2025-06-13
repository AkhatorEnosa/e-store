import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navigator = ({ children, url, variants}) => {
  const { handleShow, handleNav, lockBodyScroll } = useContext(AppContext);
  const handleClick = () => {
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
    <Link to={url} className={variants} onClick={handleClick}>
        {children}
      </Link>
  )
}

export default Navigator