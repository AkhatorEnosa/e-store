import React from 'react'

const Button = ({ title, operation, icon, variants, handleClick }) => {
  return (
    <button className={`flex items-center justify-center font-medium gap-4 px-5 py-3 lg:px-10 md:py-4 rounded-lg text-xs md:text-base ${operation ? "bg-primary-600 hover:bg-primary-700 text-white w-full md:max-w-[300px] min-w-fit lg:w-[80%]" : "w-full bg-black/90 text-white hover:bg-primary-600 hover:text-[#fff] shadow-md"} duration-150`} onClick={()=>  handleClick()}>
      {icon && <i className={`bi ${!operation ? "bi-bag" : "bi-bag-check-fill"} sm:text-lg md:text-2xl`}></i> }
      <span className={variants}>{title}</span>
    </button>
  )
}

export default Button