import React from 'react'

const Button = ({ title, operation, variants, handleClick }) => {
  return (
    <button className={`w-full md:max-w-[300px] min-w-fit flex items-center justify-center font-medium gap-4 px-5 py-3 lg:px-10 md:py-4 lg:w-[80%] rounded-lg text-xs md:text-base ${operation ? "bg-primary-600 text-white" : "bg-black/90 text-white hover:bg-primary-600 hover:text-[#fff] shadow-md"} duration-150`} onClick={()=>  handleClick()}>
      <i className={`bi ${!operation ? "bi-bag" : "bi-bag-check-fill"} sm:text-lg md:text-2xl`}></i> 
      <span className={variants}>{title}</span>
    </button>
  )
}

export default Button