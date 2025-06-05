import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Item = ({ item = {} }) => {
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
    <div className='w-full grid grid-cols-10 py-2 justify-between items-center'>

      <div className='col-span-5 flex justify-start gap-2 items-center'>
        <div className='min-w-[60px] h-[60px] md:w-[100px] md:h-[80px] flex justify-center items-center rounded-lg shadow shadow-[#342718]/10 overflow-hidden'>
          <img src={image} alt={title} className="h-12 md:h-20 object-contain"/>
        </div>
        <div className='w-full flex flex-col items-start pr-4 gap-1'>
          <Link to={`/products/${id}`} className='text-sm md:text-base text-inherit hover:text-primary-600 font-semibold transition-all duration-150' onClick={() => handleShow()}>
            <p className='text-xs text-semibold tracking-tight line-clamp-3'>{title}</p>
          </Link>
          <p className='w-fit text-[10px] p-1 bg-gray-100 text-justify line-clamp-1 rounded-full'>{category}</p>
        </div>
      </div>


      <div className='col-span-2 grid grid-cols-4 justify-center items-center gap-2'>
        <i className={`bi bi-dash-lg ${quantity === 1 && "opacity-50 font-bold cursor-default"} col-span-1 w-full text-center text-sm cursor-pointer`} onClick={() => handleNumMinus()}></i>
        <span className={`col-span-2 p-2 w-full h-fit text-center border-[1px] ${clicked === "add" ? "border-secondary-400 bg-secondary-50" : clicked === "minus" ? "border-accent-600 bg-accent-50" : "border-inherit/10 bg-gray-400/5"} rounded-md transition-all duration-150`}>{quantity}</span>
        <i className="bi bi-plus-lg col-span-1 w-full text-center text-sm cursor-pointer" onClick={() => handleNumAdd()}></i>
      </div>

      <div className='col-span-2 flex justify-end'>
        <p className='text-sm font-semibold'>{convertToUSD((price))}</p>
      </div>

      <div className='col-span-1 flex justify-end'>
        <button className='text-black/70 hover:text-[#fe4343]' onClick={() => toggleItem(item)}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </div>
  );
};

export default Item;
