import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navigator = ({ children, url, variants, title}) => {
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
    <Link to={url} className={variants} onClick={handleClick} title={title}>
        {children}
      </Link>
  )
}

export default Navigator