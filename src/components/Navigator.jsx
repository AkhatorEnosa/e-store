import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navigator = ({ children, url, variants}) => {
  const { handleShow } = useContext(AppContext);
  const handleClick = () => {
    handleShow('');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  return (
    <Link to={url} onClick={handleClick} 
      className={variants}>{children}</Link>
  )
}

export default Navigator