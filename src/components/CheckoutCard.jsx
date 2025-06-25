import React from 'react'
import { motion } from 'framer-motion'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navigator from './Navigator';

const CheckoutCard = ({ item = {} }) => {
  const { convertToUSD, handleShow } = useContext(AppContext);
  
  const {
    id,
    image,
    title,
    price,
    category,
    quantity,
  } = item;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      viewport={{ amount: 0.2 }}
      layout
    
    className='w-full grid grid-cols-10 py-2 gap-4 justify-between items-center'>

      <div className='col-span-5 h-full flex justify-start gap-4 items-center'>
        <div className='min-w-[60px] h-[60px] md:w-[100px] md:h-[80px] flex justify-center items-center overflow-hidden'>
          <img src={image} alt={title} className="h-full w-full object-contain mix-blend-darken"/>
        </div>

        <div className='w-full h-full flex flex-col gap-1'>
          <Navigator 
            url={`/products/${id}`}
            variants={'text-inherit hover:text-accent-600 font-semibold transition-all duration-150'}
          >
            <p className='text-[10px] lg:text-xs text-semibold tracking-tight line-clamp-2' onClick={() => handleShow()}>{title}</p>
          </Navigator>
          <p className='w-fit bg-secondary-50 px-1 rounded-md text-[8px] text-justify line-clamp-1'>{category}</p>
        </div>
      </div>


      <div className='col-span-4 flex justify-end'>
        <p className='text-xs md:text-sm font-semibold text-secondary-600'>{convertToUSD((price))}</p>
      </div>

      <div className='col-span-1 flex justify-end'>
          <i className="bi bi-x"></i> {quantity}
      </div>
    </motion.div>
  )
}

export default CheckoutCard