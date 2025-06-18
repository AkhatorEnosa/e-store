import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import Navigator from './Navigator';

const SectionsCard = ({ id, img, title, price }) => {
    const { convertToUSD } = useContext(AppContext);
  return ( 
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
    viewport={{ amount: 0.2 }}
    >
        <Navigator 
            url={`/products/${id}`}
            variants={'flex gap-5 py-5 group'}
        >
            <div className='flex justify-center items-center w-24 h-24 md:w-32 md:h-32 overflow-hidden'>
                <img src={img} alt="item" className='w-24 object-contain'/>
            </div>
            <div className='flex flex-col justify-center'>
                <p className='text-xs md:text-sm mb-2 group-hover:text-accent-700 group-hover:underline'>{title}</p>
                <div className='text-[10px] md:text-sm flex'>
                    <i className="bi bi-star-fill text-secondary-600"></i>
                    <i className="bi bi-star-fill text-secondary-600"></i>
                    <i className="bi bi-star-fill text-secondary-600"></i>
                    <i className="bi bi-star text-secondary-600"></i>
                    <i className="bi bi-star text-secondary-600"></i>
                </div>
                <p className='font-bold md:text-md mt-2'>{convertToUSD(price)}</p>
            </div>
        </Navigator>
    </motion.div>
  )
}

export default SectionsCard