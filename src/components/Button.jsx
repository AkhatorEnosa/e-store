import React from 'react'
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";

const Button = ({ title, operation, handleClick }) => {
  return (
    <button className={`px-10 py-4 w-full lg:mt-4 lg:w-[80%] ${operation ? "bg-primary-600 text-white" : "bg-black/90 text-white hover:bg-primary-600 hover:text-[#fff] shadow-md"} duration-150`} onClick={()=>  handleClick()}>
    {operation ? <span className="w-full h-full flex justify-center items-center gap-6"><MdOutlineRemoveShoppingCart size={25}/> {title}</span> : <span className="w-full h-full flex justify-center items-center gap-6"><MdOutlineAddShoppingCart size={25}/> {title}</span>}
    </button>
  )
}

export default Button