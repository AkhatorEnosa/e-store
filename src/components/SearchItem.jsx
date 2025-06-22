import React, { useContext } from 'react';
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
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      viewport={{ amount: 0.2 }}
      layout
    
    className='w-full flex gap-2 justify-start items-start bg-white'>
        <div className='min-w-[30px] w-[60px] h-[40px] flex justify-center items-center overflow-hidden'>
          <img src={image} alt={title} className="h-full w-full object-contain"/>
        </div>

        <div className='w-full flex flex-col gap-1'>
          <Navigator 
            url={`/products/${id}`}
            variants={'w-full text-inherit hover:text-accent-600 font-semibold transition-all duration-150'}
          >
            <p className='text-[10px] text-semibold tracking-tight leading-4 line-clamp-2'>{title}</p>
          </Navigator>
          <p className='w-fit bg-secondary-50 px-1 rounded-md text-[8px] text-justify line-clamp-1'>{category}</p>
          {/* <p className='text-xs md:text-sm font-semibold text-secondary-600'>{convertToUSD((originalPrice))}</p> */}
        </div>
    </motion.div>
  );
};

export default SearchItem;
