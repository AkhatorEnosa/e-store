import React, { useContext } from 'react';
import {AiFillHeart, AiFillStar, AiTwotoneShopping} from 'react-icons/ai';
import {AiOutlineStar} from 'react-icons/ai';
import { AppContext } from '../context/AppContext';
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md';
// import { AiFillHeart, AiTwotoneShopping} from "react-icons/ai";

const NewProductsCard = ({ cart, item }) => {
  const { addItem, removeItem } = useContext(AppContext);
  
  const {image, title, price, description} = item;
  const toggleAddItem = () => {
    if (cart.includes(item)) {
      removeItem(item)
    } else {
      addItem(item)
    }
  }
  return (
    <div className='relative flex flex-col justify-center lg:justify-between md:text-xs lg:text-sm items-center border-[1px] hover:border-[#fe4343] hover:shadow-md gap-3 py-5 px-2 group rounded-xl duration-300 text-center'>

        <div className="absolute flex opacity-0 group-hover:opacity-100 p-2 w-full justify-end -top-5 -right-5 z-50 duration-300 ">
          {/* <span className='bg-white hover:bg-[#fe4362] hover:text-[#fff] shadow-md px-2 py-2 rounded-full text-black duration-500'><AiFillHeart size={25}/></span> */}
          <span className={`bg-white ${cart.includes(item) ? "bg-[#000000] text-[#fff]" : "text-[#fe4343] hover:bg-[#000000]hover:text-[#fff] shadow"} border-[1px] border-[#fe4343] px-2 py-2 rounded-full cursor-pointer transition-all duration-500`} onClick={()=>toggleAddItem()}>{cart.includes(item) ? <MdOutlineRemoveShoppingCart size={20} title='Remove from cart'/> : <MdOutlineAddShoppingCart size={20} title='Add to cart'/>}</span>
        </div>

        <div className="flex flex-col justify-center items-center size-64 px-4 overflow-hidden">
          <img src={image} alt="bag" className='h-60'/>
        </div>

        <div className='w-full flex flex-col justify-center items-center gap-1'>
          <div>
            <p className='font-semibold'>{title}</p>
            <p className='line-clamp-2 text-xs'>{description}</p>
          </div>

          <div className='text-small flex'>
            <AiFillStar className='text-[#fe4343]'/>
            <AiFillStar className='text-[#fe4343]'/>
            <AiFillStar className='text-[#fe4343]'/>
            <AiFillStar className='text-[#fe4343]'/>
            <AiOutlineStar/>
            </div>
          <p className='font-bold text-xl'>₦{(price) * 500}</p>
          {/* <p className='bg-slate-600/20 rounded-md text-xs'>{category}</p> */}
          
          {/* <button className={!cart.includes(item) ? "p-4 py-2 w-fit lg:mt-2 hover:bg-[#fe4343] bg-[#000]/90 text-white rounded-md shadow-md duration-300" : "p-4 py-2 w-fit lg:mt-2 bg-[#fe4343] text-white opacity-30 rounded-md cursor-not-allowed"} onClick={()=>handleClick(item)}>
            {cart.includes(item) ? "Already In Cart" : "Add to Cart"}
          </button> */}
        </div>

    </div>
  );
};

export default NewProductsCard;
