import React, { useContext } from 'react';
import { AiFillStar } from 'react-icons/ai';
import {AiOutlineStar} from 'react-icons/ai';
import { AppContext } from '../context/AppContext';
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md';
// import { AiFillHeart, AiTwotoneShopping} from "react-icons/ai";

const NewProductsCard = ({ item }) => {
  const { cart, toggleItem, convertToUSD } = useContext(AppContext);
  
  const {image, title, price, description} = item;
  const itemInCart = cart.some(cartItem => cartItem.id === item.id);
  
  return (
    <div className={`relative flex flex-col justify-center lg:justify-between md:text-xs lg:text-sm items-center border-[1px] ${itemInCart ? "border-[#fe4343] shadow-md" : "hover:border-[#fe4343] hover:shadow-md"} gap-3 py-5 px-2 group rounded-xl duration-150 text-center`}>

        <div className={`absolute flex opacity-100 p-2 w-full justify-end group-hover:text-[#fe4343] -top-5 -right-5 z-50 `}>
          {/* <span className='bg-white hover:bg-[#fe4362] hover:text-[#fff] shadow-md px-2 py-2 rounded-full text-black duration-500'><AiFillHeart size={25}/></span> */}
          <span className={`${itemInCart ? "bg-[#fe4343] text-white" : "bg-white hover:bg-[#fe4343] group-hover:border-[#fe4343] hover:text-[#ffffff] shadow"} border-[1px] px-2 py-2 rounded-full cursor-pointer transition-all duration-150`} onClick={()=>toggleItem(item)}>{itemInCart ? <MdOutlineRemoveShoppingCart size={20} title='Remove from cart'/> : <MdOutlineAddShoppingCart size={20} title='Add to cart'/>}</span>
        </div>

        <div className="flex flex-col justify-center items-center size-56 px-4 overflow-hidden">
          <img src={image} alt="bag" className='h-60'/>
        </div>

        <div className='w-full flex flex-col justify-center items-center gap-1 leading-4'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <p className='w-[80%] font-semibold'>{title}</p>
            <p className='w-[60%] line-clamp-2 text-[10px] text-black/80 capitalize'>{description}</p>
          </div>

          <div className='text-small flex'>
            <AiFillStar className='text-[#fe4343]'/>
            <AiFillStar className='text-[#fe4343]'/>
            <AiFillStar className='text-[#fe4343]'/>
            <AiFillStar className='text-[#fe4343]'/>
            <AiOutlineStar/>
            </div>
          <p className='font-bold text-xl'>{convertToUSD(price)}</p>
          {/* <p className='bg-slate-600/20 rounded-md text-xs'>{category}</p> */}
        </div>

    </div>
  );
};

export default NewProductsCard;
