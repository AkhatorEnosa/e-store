import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navigator from './Navigator';
import { motion } from 'motion/react';

const ProductCard = ({ item }) => {
   const { cart, wishlist, toggleItem, convertToUSD, findItemInGroup, show } = useContext(AppContext);
  
  const { id, image, title, price, category, description } = item;
  const itemInCart = findItemInGroup(cart, item);
  const itemInWishlist = findItemInGroup(wishlist, item);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1}}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      viewport={{ amount: 0.2 }}
      className={`relative min-w-[100px] h-auto flex flex-col justify-center lg:justify-between md:text-xs lg:text-sm items-center border-[1px] gap-3 p-2 md:p-5 group rounded-2xl md:rounded-[1.75rem] bg-gray-50 duration-150 text-center hover:cursor-pointer`}>
        <Navigator 
          url={`/products/${id}`}
          variants={'w-full h-full absolute top-0 left-0 z-40'}
          title={title}
        ></Navigator>
        {/* <div className={`absolute flex opacity-100 p-2 w-full justify-end ${itemInCart ? "top-2 right-2" : "-top-5 -right-5"} transition-all duration-150 z-50 `}></div> */}

        <div className="flex flex-col justify-center items-center w-full h-full md:h-32 lg:h-44 px-4 overflow-hidden">
          <img src={image} alt="bag" className='h-16 md:h-28 lg:h-40 group-hover:scale-110 object-contain mix-blend-darken transition-all duration-150'/>
        </div>

        <div className='w-full flex flex-col justify-center items-center gap-1 leading-4'>
          <div className='w-full flex flex-col gap-2 text-left'>
            <p className='font-semibold text-xs group-hover:underline group-hover:text-accent-700 line-clamp-1'>{title}</p>
            <p className='w-fit bg-secondary-50 px-1 rounded-md text-[8px]'>{category}</p>
            {show !== 'wishlist' && <p className='hidden sm:line-clamp-2 text-[10px] md:mt-[12px] text-black/80 capitalize'>{description}</p>}
          </div>

          <div className="w-full flex justify-between text-left md:items-center gap-2 mt-2">
            <p className='font-bold md:text-xl'>{convertToUSD(price)}</p>
            <div className='text-xs flex gap-1'>
              <i className="bi bi-star-fill text-secondary-600"></i>
              <i className="bi bi-star-fill text-secondary-600"></i>
              <i className="bi bi-star-fill text-secondary-600"></i>
              <i className="bi bi-star-fill text-secondary-600"></i>
              <i className="bi bi-star text-secondary-600"></i>
            </div>
          </div>

          <div className={`flex gap-2 lg:gap-4 mt-2 w-full font-semibold transition-all duration-150 z-50 `}>
            <button className={`w-fit ${show !== 'wishlist' && "md:w-full"} flex items-center justify-center gap-2 px-2 sm:px-4 sm:py-2 py-1 text-sm sm:text-[10px] rounded-lg ${itemInWishlist ? "bg-secondary-600 text-white" : "hover:bg-secondary-600 hover:text-[#fff] border-[1px] border-black"} duration-150`} onClick={()=>  toggleItem('wishlist', item)}>
              <i className={`bi ${!itemInWishlist ? "bi-heart" : "bi-heart-fill"} sm:text-lg`}></i> 
              <span className={`${show == 'wishlist' ? "hidden" : "hidden md:flex"}`}>{itemInWishlist ? "In Wishlist" : "Wishlist"}</span>
            </button>

            <button className={`w-full flex items-center justify-center gap-2 px-2 sm:px-4 sm:py-2 py-1 text-sm sm:text-[10px] rounded-lg line ${itemInCart ? "bg-primary-600 text-white" : "bg-black/90 text-white hover:bg-primary-600 hover:text-[#fff] shadow-md"} duration-150`} onClick={()=>  toggleItem('cart', item)}>
              <i className={`bi ${!itemInCart ? "bi-bag" : "bi-bag-check-fill"} sm:text-lg`}></i> 
              <span className='text-[10px] sm:text-inherit'>{itemInCart ? "Item in Cart" : "Add to Cart"}</span>
            </button>
            
          </div>
        </div>

    </motion.div>
  );
};

export default ProductCard;
