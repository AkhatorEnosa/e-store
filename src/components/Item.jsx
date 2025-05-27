import React, { useContext, useState } from 'react';
import {AiOutlineClose, AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import { AppContext } from '../context/AppContext';

const Item = ({ item = {} }) => {
  const { toggleItem, convertToUSD, cart, setCart } = useContext(AppContext);
  const [num, setNum] = useState(1)

  const {
      id,
      image,
      title,
      price,
      category
     } = item;

  const findItem = cart.find((cartItem) => cartItem?.id === id);
  const defaultPrice = findItem?.price

  const handleNumAdd = () => {
    const newNum = num + 1;
    setNum(newNum);
    
    // setCart(cart.map(item => 
    //   item.id === id 
    //     ? { ...item, price: defaultPrice * newNum } 
    //     : item
    // ));

    console.log(cart)
  }

  const handleNumMinus = () => {
      if(num > 1){
        const newNum = num - 1
        setNum(newNum)
        // setCart(cart.map((item) => {
        //   item.id === id 
        //     ?
        //   { ...item, price: defaultPrice * newNum }
        //     :
        //   item
        // }))
      } else {
        setNum(1)
        // findItem.price = price * num;
      }

      console.log(cart)
  }

  return (
    <div className='w-full grid grid-cols-10 py-2 justify-between items-center'>

      <div className='col-span-5 flex justify-start gap-2 items-center'>
        <div className='w-[100px] h-[80px] flex justify-center items-center rounded-lg shadow shadow-[#342718]/10 object-cover overflow-hidden'>
          <img src={image} alt={title} className="h-16"/>
        </div>
        <div className='w-full flex flex-col items-start'>
          <p className='text-sm text-semibold'>{title}</p>
          <p className='w-fit text-[10px] px-2 py-1 bg-gray-100 text-justify'>{category}</p>
        </div>
      </div>


      <div className='col-span-2 grid grid-cols-4 justify-center items-center gap-2'>
        <AiOutlineMinus className={`${num === 1 && "opacity-50 font-bold cursor-default"} col-span-1 w-full text-center text-sm cursor-pointer`} onClick={() => handleNumMinus()}/>
        <span className='col-span-2 p-2 w-full h-fit text-center border-[1px] border-[#342718]/10 bg-gray-400/5 rounded-md'>{num}</span>
        <AiOutlinePlus className='col-span-1 w-full text-center text-sm cursor-pointer' onClick={() => handleNumAdd()}/>
      </div>

      <div className='col-span-2 flex justify-end'>
        <p className='text-sm font-semibold'>{convertToUSD((price * num))}</p>
      </div>

      <div className='col-span-1 flex justify-end'>
        {/* <p>{price}</p> */}
        <button className='text-red-500 hover:text-red-700' onClick={() => toggleItem(item)}>
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
