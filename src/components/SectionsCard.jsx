import React, { useContext } from 'react'
import {AiFillStar} from 'react-icons/ai';
import {AiOutlineStar} from 'react-icons/ai';
import { AppContext } from '../context/AppContext';

const SectionsCard = ({ img, title, price }) => {
    const { convertToUSD } = useContext(AppContext);
  return ( 
        <div className="flex gap-5 py-5">
            <img src={img} alt="item" className='w-24 h-28'/>
            <div className='flex flex-col justify-center'>
                <span className='text-sm mb-2'>{title}</span>
                <div className='text-sm flex'>
                <AiFillStar className='text-primary-400'/>
                <AiFillStar className='text-primary-400'/>
                <AiFillStar className='text-primary-400'/>
                <AiFillStar className='text-primary-400'/>
                <AiOutlineStar/>
                </div>
                <p className='font-bold text-md mt-2'>{convertToUSD(price)}</p>
            </div>
        </div> 
  )
}

export default SectionsCard