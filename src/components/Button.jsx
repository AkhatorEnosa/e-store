import React from 'react'
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";

const Button = ({ title, operation, variants, handleClick }) => {
  return (
    <button className={`max-w-[96] min-w-fit flex items-center justify-center gap-4 px-5 py-2 lg:px-10 lg:py-4 lg:w-[80%] rounded-lg ${variants} ${operation ? "bg-primary-600 text-white" : "bg-black/90 text-white hover:bg-primary-600 hover:text-[#fff] shadow-md"} duration-150`} onClick={()=>  handleClick()}>
      <i className={`bi ${!operation ? "bi-bag-fill" : "bi-bag-check-fill"} text-2xl`}></i> 
      {title}
    </button>
  )
}

export default Button

{/* <i class="bi bi-bag-check"></i> */}
{/* <i className="bi bi-bag-fill"></i> */}