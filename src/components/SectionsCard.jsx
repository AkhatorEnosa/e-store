import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const SectionsCard = ({ id, img, title, price }) => {
    const { convertToUSD } = useContext(AppContext);
  return ( 
        <Link to={`/products/${id}`} className="flex gap-5 py-5 group">
            <img src={img} alt="item" className='w-24 h-28'/>
            <div className='flex flex-col justify-center'>
                <p className='text-sm mb-2 group-hover:text-accent-700 group-hover:underline'>{title}</p>
                <div className='text-sm flex'>
                    <i className="bi bi-star-fill text-primary-600"></i>
                    <i className="bi bi-star-fill text-primary-600"></i>
                    <i className="bi bi-star-fill text-primary-600"></i>
                    <i className="bi bi-star text-primary-600"></i>
                    <i className="bi bi-star text-primary-600"></i>
                </div>
                <p className='font-bold text-md mt-2'>{convertToUSD(price)}</p>
            </div>
        </Link> 
  )
}

export default SectionsCard