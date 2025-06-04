import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

const Product = () => {
    const { cart, products, toggleItem, findItemInCart, updateQuantity} = useContext(AppContext);
    const { convertToUSD } = useContext(AppContext);
    const { id } = useParams()
    const navigate = useNavigate();

    const getProduct = products?.find((product) => product?.id === parseInt(id)); // Find product by ID
    const itemInCart = findItemInCart(cart, getProduct) ; // Check if item is in cart
    
    useEffect(() => {
        if (!id) navigate('/not-found'); // Redirect if missing
      }, [id]);

    const originalPrice = getProduct?.price || 0; // Fallback to 0 if price is undefined
    const [clicked, setClicked] = useState('');

  const handleNumAdd = () => {
    updateQuantity(itemInCart?.id, itemInCart?.quantity + 1, originalPrice)
    setClicked("add");
    setTimeout(() => {
      setClicked("");
    }, 400);
  }

  const handleNumMinus = () => {
      if(itemInCart?.quantity > 1){
        setClicked("minus");
        setTimeout(() => {
          setClicked("");
        }, 400);
        updateQuantity(itemInCart?.id, itemInCart?.quantity - 1, originalPrice)
      } else {
        setClicked("");
        updateQuantity(itemInCart?.id, 1, originalPrice)
      }
  }


  return (
    <div className='w-full h-fit lg:h-screen flex flex-col px-8 md:px-16 lg:px-32 pt-24 gap-10 mb-32'>
        <Breadcrumbs />
        <div className='w-full h-full flex flex-col md:grid grid-cols-2 gap-4'>
            <div className='w-full max-h-[500px] flex justify-center items-center col-span-1 p-4 rounded-lg overflow-hidden'>
                <img src={getProduct?.image} alt={`${getProduct?.image}`} className='w-full h-full object-contain'/>
            </div>
            <div className='col-span-1 flex flex-col justify-start items-start gap-4'>
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='leading-5 lg:text-2xl font-bold'>{getProduct?.title}</h1>
                    <span className='w-fit text-[10px] bg-gray-200 p-1 rounded-full font-semibold'>{getProduct?.category}</span>
                </div>
                <p className='text-xs text-gray-700'>{getProduct?.description}</p>
                <div className='w-full flex  justify-between items-center gap-4'>
                  <div className='w-fit md:w-full flex justify-center items-center gap-6'>
                    <p className='text-lg font-semibold'>{convertToUSD(getProduct?.price)}</p>

                    <div className='flex flex-col md:flex-row justify-center items-center md:items-center gap-2 w-full'>
                        {/* <p className='text-xs'>Quantity(ies)</p> */}

                        <div className='w-[150px] grid grid-cols-3 justify-center items-center gap-2 border rounded-lg'>
                            <i className={`flex justify-center items-center size-10 bi bi-dash-lg ${itemInCart?.quantity === 1 && "opacity-50 font-bold cursor-default"} col-span-1 w-full text-sm cursor-pointer`} onClick={() => handleNumMinus()}></i>
                            <span className={`p-2 w-full h-fit text-center border-[1px] ${clicked === "add" ? "border-secondary-400 bg-secondary-50" : clicked === "minus" ? "border-accent-600 bg-accent-50" : "border-inherit/10 bg-gray-400/5"} rounded-md transition-all duration-150`}>{itemInCart?.quantity || 1}</span>
                            <i className="bi bi-plus-lg col-span-1 w-full text-center text-sm cursor-pointer" onClick={() => handleNumAdd()}></i>
                        </div>
                    </div>

                  </div>

                    <Button 
                        title={itemInCart ? "Remove from Cart" : "Add to Cart"}
                        operation={itemInCart}
                        handleClick={() => toggleItem(getProduct)}
                        variants={"text-sm hidden lg:flex"}
                    />
                </div>
                {/* <button className='bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200' onClick={() => navigate('/')}>Back to Products</button> */}
            </div>
        </div>
    </div>
  )
}

export default Product