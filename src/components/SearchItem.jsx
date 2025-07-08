import React from 'react';
import { AppContext } from '../context/AppContext';
import Navigator from './Navigator';
import { motion } from 'motion/react'

const SearchItem = ({ item = {} }) => {
  
  const {
    id,
    image,
    title,
    category
  } = item;

  return (

    <Navigator 
      url={`/products/${id}`}
      variants={'w-full text-inherit font-semibold transition-all duration-150'}
    >

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      
      className='w-full flex gap-2 justify-start items-start bg-white hover:bg-secondary-50/50 rounded-md p-4 transition-all duration-150 ease-in-out'>
          <div className='min-w-[30px] w-[60px] h-[40px] flex justify-center items-center overflow-hidden'>
            <img src={image} alt={title} className="h-full w-full object-contain"/>
          </div>

          <div className='w-full flex flex-col gap-1'>
            <p className='text-[10px] text-semibold tracking-tight leading-4 line-clamp-2'>{title}</p>
            <p className='w-fit bg-secondary-50 px-1 rounded-md text-[8px] text-justify line-clamp-1'>{category}</p>
            {/* <p className='text-xs md:text-sm font-semibold text-secondary-600'>{convertToUSD((originalPrice))}</p> */}
          </div>
      </motion.div>
    </Navigator>
  );
};

export default SearchItem;
