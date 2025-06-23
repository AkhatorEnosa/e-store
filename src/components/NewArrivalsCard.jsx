import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navigator from './Navigator';
import { motion } from 'motion/react';

const NewArrivalsCard = ({ item }) => {
   const { convertToUSD } = useContext(AppContext);
  
  const { id, image, title, price, category } = item;
//   const itemInCart = findItemInGroup(cart, item);
//   const itemInWishlist = findItemInGroup(wishlist, item);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1}}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      viewport={{ amount: 0.2 }}
      className={`relative w-[200px] md:w-[250px] h-full flex flex-col justify-center lg:justify-between md:text-xs lg:text-sm items-center border-[1px] gap-3 p-2 group rounded-2xl bg-gray-50 duration-150 text-center hover:cursor-pointer`}>
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
            <p className='font-semibold text-xs group-hover:underline group-hover:text-accent-700 line-clamp-2'>{title}</p>
            {/* {show !== 'wishlist' && <p className='hidden sm:line-clamp-2 text-[10px] md:mt-[12px] text-black/80 capitalize'>{description}</p>} */}
          </div>

          <div className="w-full flex justify-between text-left md:items-center gap-2 mt-2">
            <p className='font-bold md:text-xl'>{convertToUSD(price)}</p>
            <div className='text-[10px] flex gap-1'>
              <i className="bi bi-star-fill text-secondary-600"></i>
              <i className="bi bi-star-fill text-secondary-600"></i>
              <i className="bi bi-star-fill text-secondary-600"></i>
              <i className="bi bi-star-fill text-secondary-600"></i>
              <i className="bi bi-star text-secondary-600"></i>
            </div>
          </div>
        </div>

        <p className='absolute w-fit bg-primary-50 px-1 rounded-md text-[8px] right-2 shadow'>{category}</p>
    </motion.div>
  );
};

export default NewArrivalsCard;
