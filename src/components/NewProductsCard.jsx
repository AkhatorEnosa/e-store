import React, { useContext } from 'react';
import { AiFillStar } from 'react-icons/ai';
import {AiOutlineStar} from 'react-icons/ai';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
// import { AiFillHeart, AiTwotoneShopping} from "react-icons/ai";

const NewProductsCard = ({ item }) => {
  const { cart, toggleItem, convertToUSD, findItemInCart } = useContext(AppContext);
  
  const { id, image, title, price, description } = item;
  const itemInCart = findItemInCart(cart, item);
  
  return (
    <div className={`relative flex flex-col justify-center lg:justify-between md:text-xs lg:text-sm items-center border-[1px] ${itemInCart ? "shadow-md" : "hover:shadow-md"} gap-3 py-5 px-2 group rounded-xl duration-150 text-center hover:cursor-pointer`}>
        <Link to={`/${id}`} className='w-full h-full absolute top-0 left-0 z-40'></Link>
        

        <div className={`absolute flex opacity-100 p-2 w-full justify-end ${itemInCart ? "top-2 right-2" : "-top-5 -right-5"} transition-all duration-150 z-50 `}>
          
          {/* <span className='bg-white hover:bg-[#fe4362] hover:text-[#fff] shadow-md px-2 py-2 rounded-full text-black duration-500'><AiFillHeart size={25}/></span> */}
          <i className={`flex bi ${itemInCart ? "bi-bag-check-fill bg-primary-600 text-white" : "bi-bag-fill bg-black/90 text-white hover:bg-primary-600 hover:text-[#fff] shadow-md"} text-lg border-[1px] px-2 py-2 rounded-full cursor-pointer transition-all duration-150`} onClick={()=>toggleItem(item)}></i>
        </div>

        <div className="flex flex-col justify-center items-center lg:size-44 px-4 overflow-hidden">
          <img src={image} alt="bag" className='h-20 lg:h-40 group-hover:scale-110 transition-all duration-150'/>
        </div>

        <div className='w-full flex flex-col justify-center items-center gap-1 leading-4'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <p className='w-[80%] font-semibold text-xs lg:text-base'>{title}</p>
            <p className='w-[60%] line-clamp-2 text-[10px] text-black/80 capitalize'>{description}</p>
          </div>

          <div className='text-xs flex gap-1'>
            <i className="bi bi-star-fill text-primary-600"></i>
            <i className="bi bi-star-fill text-primary-600"></i>
            <i className="bi bi-star-fill text-primary-600"></i>
            <i className="bi bi-star-fill text-primary-600"></i>
            <i className="bi bi-star text-primary-600"></i>
            </div>
          <p className='font-bold text-xl'>{convertToUSD(price)}</p>
          {/* <p className='bg-slate-600/20 rounded-md text-xs'>{category}</p> */}
        </div>

    </div>
  );
};

export default NewProductsCard;
