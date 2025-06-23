import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Navigator from './Navigator';
import { motion } from 'motion/react'

const ItemCard = ({ item = {} }) => {
  const { toggleItem, updateQuantity, convertToUSD, handleShow } = useContext(AppContext);
  
  const {
    id,
    image,
    title,
    price,
    category,
    quantity,
    originalPrice
  } = item;
  
  const [clicked, setClicked] = useState('');

  const handleNumAdd = () => {
    updateQuantity(id, quantity + 1, originalPrice)
    setClicked("add");
    setTimeout(() => {
      setClicked("");
    }, 400);
  }

  const handleNumMinus = () => {
      if(quantity > 1){
        setClicked("minus");
        setTimeout(() => {
          setClicked("");
        }, 400);
        updateQuantity(id, quantity - 1, originalPrice)
      } else {
        setClicked("");
        updateQuantity(id, 1, originalPrice)
      }
  }

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

      <div className='col-span-2 grid grid-cols-4 justify-center items-center text-[12px] md:text-sm gap-2'>
        <button>
          <i className={`bi bi-dash-lg ${quantity === 1 && "opacity-50 font-bold cursor-default"} col-span-1 w-full text-center cursor-pointer`} onClick={() => handleNumMinus()}></i>
        </button>

        <span className={`col-span-2 p-2 w-full h-fit text-center border-[1px] ${clicked === "add" ? "border-secondary-400 bg-secondary-50" : clicked === "minus" ? "border-accent-600 bg-accent-50" : "border-inherit/10 bg-gray-400/5"} rounded-md transition-all duration-150`}>{quantity}</span>

        <button>
          <i className="bi bi-plus-lg col-span-1 w-full text-center cursor-pointer" onClick={() => handleNumAdd()}></i>
        </button>
      </div>


      <div className='col-span-2 flex justify-end'>
        <p className='text-xs md:text-sm font-semibold text-secondary-600'>{convertToUSD((price))}</p>
      </div>

      <div className='col-span-1 flex justify-end'>
        <button className='text-black/70 hover:text-[#fe4343]' onClick={() => toggleItem('cart', item)}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </motion.div>
  );
};

export default ItemCard;
