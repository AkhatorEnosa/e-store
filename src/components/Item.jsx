import React, { useContext, useState } from 'react';
import {AiOutlineClose, AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import { AppContext } from '../context/AppContext';

const Item = ({ item = {} }) => {
  const { toggleItem, convertToUSD, cart, setCart } = useContext(AppContext);
  
  const {
    id,
    image,
    title,
    price,
    category,
    originalPrice
  } = item;
  
  const [num, setNum] = useState(1)
  const [clicked, setClicked] = useState('');
  // const findItem = cart.find((cartItem) => cartItem?.id === id);
  // const originalPrice = price;

  const updateItemInCartPrice = (x) => {
    return cart.map(item => 
      item.id === id 
        ? { ...item, price: originalPrice * x } 
        : item
    )
  }

  const handleNumAdd = () => {
    const newNum = num + 1;
    setNum(newNum);
    
    setCart(updateItemInCartPrice(newNum));
    setClicked("add");
    setTimeout(() => {
      setClicked("");
    }, 400);

    // console.log(cart)
  }

  const handleNumMinus = () => {
      const newNum = num - 1;
      setNum(newNum)
      if(num > 1){
        setClicked("minus");
        setTimeout(() => {
          setClicked("");
        }, 400);
        setCart(updateItemInCartPrice(newNum));
      } else {
        setClicked("");
        setNum(1)
        setCart(updateItemInCartPrice(num))
        // findItem.price = price * num;
      }
  }

  return (
    <div className='w-full grid grid-cols-10 py-2 justify-between items-center'>

      <div className='col-span-5 flex justify-start gap-2 items-center'>
        <div className='min-w-[60px] h-[60px] md:w-[100px] md:h-[80px] flex justify-center items-center rounded-lg shadow shadow-[#342718]/10 overflow-hidden'>
          <img src={image} alt={title} className="h-12 md:h-20 object-contain"/>
        </div>
        <div className='w-full flex flex-col items-start pr-4 gap-1'>
          <p className='text-xs text-semibold tracking-tight line-clamp-3'>{title}</p>
          <p className='w-fit text-[10px] p-1 bg-gray-100 text-justify line-clamp-1 rounded-full'>{category}</p>
        </div>
      </div>


      <div className='col-span-2 grid grid-cols-4 justify-center items-center gap-2'>
        <AiOutlineMinus className={`${num === 1 && "opacity-50 font-bold cursor-default"} col-span-1 w-full text-center text-sm cursor-pointer`} onClick={() => handleNumMinus()}/>
        <span className={`col-span-2 p-2 w-full h-fit text-center border-[1px] ${clicked === "add" ? "border-secondary-400" : clicked === "minus" ? "border-accent-600" : "border-[#342718]/10"} bg-gray-400/5 rounded-md transition-all duration-150`}>{num}</span>
        <AiOutlinePlus className='col-span-1 w-full text-center text-sm cursor-pointer' onClick={() => handleNumAdd()}/>
      </div>

      <div className='col-span-2 flex justify-end'>
        <p className='text-sm font-semibold'>{convertToUSD((price))}</p>
      </div>

      <div className='col-span-1 flex justify-end'>
        {/* <p>{price}</p> */}
        <button className='text-black/70 hover:text-[#fe4343]' onClick={() => toggleItem(item)}>
          <AiOutlineClose size={15} />
        </button>
      </div>


      {/* <div className="col-span-3">
        <div className="flex flex-col text-xs justify-between">
          <div className="w-full flex justify-between">
            <div>
              <p>{title}</p>
              <p className='font-bold'>₦ {(price) * 500}</p>
            </div>
            <AiFillCloseCircle size={20} className="cursor-pointer" onClick={()=> toggleItem(item)}/>
          </div>

          <div className='w-56 grid grid-cols-3 px-2 mt-4 justify-center items-center'>
            <AiFillMinusSquare className='col-span-1 text-xl hover:2xl cursor-pointer duration-75' onClick={() => handleMinus()}/>
            <span className='col-span-1 text-xl font-bold'>{itemNum}</span>
            <AiFillPlusSquare className='col-span-1 text-xl hover:2xl cursor-pointer duration-75' onClick={() => handleSum()}/>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Item;
