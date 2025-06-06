import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiTwotoneShopping} from "react-icons/ai";

const NewProductsCard = ({ item }) => {
   const { cart, wishlist, toggleItem, convertToUSD, findItemInGroup } = useContext(AppContext);
  
  const { id, image, title, price, category, description } = item;
  const itemInCart = findItemInGroup(cart, item);
  const itemInWishlist = findItemInGroup(wishlist, item);
  
  return (
    <div className={`relative flex flex-col justify-center lg:justify-between md:text-xs lg:text-sm items-center border-[1px] ${itemInCart ? "shadow-md" : "hover:shadow-md"} gap-3 py-5 md:px-2 group rounded-xl duration-150 text-center hover:cursor-pointer`}>
        <Link to={`/products/${id}`} onClick={() => 
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })} 
          className='w-full h-full absolute top-0 left-0 z-40'></Link>
        {/* <div className={`absolute flex opacity-100 p-2 w-full justify-end ${itemInCart ? "top-2 right-2" : "-top-5 -right-5"} transition-all duration-150 z-50 `}></div> */}

        <div className="flex flex-col justify-center items-center w-full h-32 lg:h-44 px-4 overflow-hidden">
          <img src={image} alt="bag" className='h-28 lg:h-40 group-hover:scale-110 transition-all duration-150'/>
        </div>

        <div className='w-full flex flex-col justify-center items-center gap-1 leading-4 px-4'>
          <div className='w-full flex flex-col gap-2 text-justify'>
            <p className='font-semibold text-xs group-hover:underline group-hover:text-accent-700 line-clamp-2'>{title}</p>
            <p className='w-fit bg-accent-50 px-1 rounded-md text-[8px]'>{category}</p>
            <p className='line-clamp-2 text-[10px] text-black/80 capitalize'>{description}</p>
          </div>

          <div className="w-full flex justify-between mt-5">
            <p className='font-bold text-xl'>{convertToUSD(price)}</p>
            <div className='text-xs flex gap-1'>
              <i className="bi bi-star-fill text-primary-600"></i>
              <i className="bi bi-star-fill text-primary-600"></i>
              <i className="bi bi-star-fill text-primary-600"></i>
              <i className="bi bi-star-fill text-primary-600"></i>
              <i className="bi bi-star text-primary-600"></i>
            </div>
          </div>

          <div className={`flex gap-2 lg:gap-4 mt-2 w-full font-semibold transition-all duration-150 z-50 `}>
            
            {/* <span className='bg-white hover:bg-[#fe4362] hover:text-[#fff] shadow-md px-2 py-2 rounded-full text-accent-500 duration-500'><AiFillHeart size={25}/></span> */}
            {/* <i className={`bi ${itemInCart ? "bi-bag-check-fill bg-primary-600 text-white" : "bi-bag-fill bg-white text-primary-600 hover:bg-primary-600 hover:text-[#fff] shadow-md"} text-lg px-2 py-2 rounded-full cursor-pointer duration-500`} onClick={()=>toggleItem(item)}></i> */}

            <button className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-[10px] rounded-lg ${itemInWishlist ? "bg-secondary-600 text-white" : "hover:bg-secondary-600 hover:text-[#fff] border-[1px] border-black"} duration-150`} onClick={()=>  toggleItem('wishlist', item)}>
              <i className={`bi ${!itemInWishlist ? "bi-heart" : "bi-heart-fill"} text-lg`}></i> 
              <span>{itemInWishlist ? "In Wishlist" : "Wishlist"}</span>
            </button>

            <button className={`w-full flex items-center justify-center gap-2 px-2 md:px-4 py-2 text-[10px] rounded-lg ${itemInCart ? "bg-primary-600 text-white" : "bg-black/90 text-white hover:bg-primary-600 hover:text-[#fff] shadow-md"} duration-150`} onClick={()=>  toggleItem('cart', item)}>
              <i className={`bi ${!itemInCart ? "bi-bag" : "bi-bag-check-fill"} text-lg`}></i> 
              <span>{itemInCart ? "Item in Cart" : "Add to Cart"}</span>
            </button>
            
          </div>
        </div>

    </div>
  );
};

export default NewProductsCard;
