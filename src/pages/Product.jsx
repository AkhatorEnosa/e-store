import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Button from '../components/Button';

const Product = () => {
    const { cart, products, toggleItem, findItemInCart } = useContext(AppContext);
    const { convertToUSD } = useContext(AppContext);
    const { id } = useParams()
    const navigate = useNavigate();

    const getProduct = products?.find((product) => product?.id === parseInt(id)); // Find product by ID
    const itemInCart = findItemInCart(cart, getProduct); // Check if item is in cart

    // const [clicked, setClicked] = useState('');
    //   const [num, setNum] = useState(getProduct?.quantity || 1);


    console.log(getProduct)

    
    useEffect(() => {
        if (!id) navigate('/not-found'); // Redirect if missing
      }, [id]);
  return (
    <div className='w-full h-fit lg:h-screen flex flex-col px-8 md:px-16 lg:px-32 lg:pt-24 gap-10'>
        <Breadcrumbs />
        <div className='w-full h-full grid grid-cols-2 gap-4'>
            <div className='w-full max-h-[500px] flex justify-center items-center col-span-1 p-4 rounded-lg overflow-hidden'>
                <img src={getProduct?.image} alt={`${getProduct?.image}`} className='w-full h-full object-contain'/>
            </div>
            <div className='col-span-1 flex flex-col justify-start items-start gap-4'>
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='text-2xl font-bold'>{getProduct?.title}</h1>
                    <span className='w-fit text-[10px] bg-gray-200 p-1 rounded-full font-semibold'>{getProduct?.category}</span>
                </div>
                <p className='text-xs text-gray-700'>{getProduct?.description}</p>
                <div className='w-full flex justify-between items-center gap-4'>
                    <p className='text-lg font-semibold'>{convertToUSD(getProduct?.price)}</p>
                    
                    
                          {/* <div className='col-span-2 grid grid-cols-4 justify-center items-center gap-2'>
                            <AiOutlineMinus className={`${num === 1 && "opacity-50 font-bold cursor-default"} col-span-1 w-full text-center text-sm cursor-pointer`} onClick={() => handleNumMinus()}/>
                            <span className={`col-span-2 p-2 w-full h-fit text-center border-[1px] ${clicked === "add" ? "border-secondary-400" : clicked === "minus" ? "border-accent-600" : "border-[#342718]/10"} bg-gray-400/5 rounded-md transition-all duration-150`}>8</span>
                            <AiOutlinePlus className='col-span-1 w-full text-center text-sm cursor-pointer' onClick={() => handleNumAdd()}/>
                          </div> */}

                    <Button 
                        title={itemInCart ? "Remove from Cart" : "Add to Cart"}
                        operation={itemInCart}
                        handleClick={() => toggleItem(getProduct)}
                    />
                </div>
                {/* <button className='bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200' onClick={() => navigate('/')}>Back to Products</button> */}
            </div>
        </div>
    </div>
  )
}

export default Product