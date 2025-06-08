import React from 'react'
import { Link } from 'react-router-dom'

const Navigator = ({ children, url, variants}) => {
  return (
    <Link to={url} onClick={() => 
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })} 
      className={variants}>{children}</Link>
  )
}

export default Navigator