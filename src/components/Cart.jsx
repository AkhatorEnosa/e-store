import React, { useContext, useEffect, useState } from 'react'
import Item from './Item';
import { TiShoppingCart } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import Checkout from './Checkout';

const Cart = ({ show, handleShow }) => {
    const { cart, convertToUSD } = useContext(AppContext)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const sumPrices =  cart?.reduce((sum, item) => {
            return sum + (item.price || 0);
          }, 0);

          setTotal(sumPrices)
    }, [cart])

    const TaxPercentage = (x) => {
        const taxRate = 0.07; // 7% tax rate
        const result = (x * taxRate);
        return result
    }

  return ( 
    <div className={`w-screen h-screen ${show ? "flex" : "hidden"} flex-col justify-center items-center bg-black/50 fixed z-50`}>
        <div className='w-[90%] lg:w-[80%] h-[95%] bg-white shadow-lg rounded-lg flex flex-col justify-between items-center p-6'>
            <div className='w-full flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>You have {cart?.length} items in your cart.</h2>
                <div onClick={()=>handleShow(show)} className="flex justify-center items-center rounded-full bg-white size-10 cursor-pointer">
                    <i className={`bi bi-x-lg hover:text-accent-600 text-lg transition-all duration-150`}></i>
                </div>
            </div>
            <div className={`w-full h-full ${cart?.length > 0 && "flex flex-col md:grid grid-cols-5 gap-6 overflow-scroll" }`}>
                {
                    cart?.length > 0 ? 
                        <>
                            <div className='col-span-3 w-full h-full flex flex-col gap-4 divide-y divide-[#342718]/10 border-[1px] border-[#342718]/10 p-4 rounded-lg overflow-y-scroll'>
                                {/* Cart items will be displayed here */}
                                {
                                        cart.map((x) => (
                                            // console.log(item)
                                            <Item 
                                              key={x?.id}  // Add this unique key
                                              item={x} 
                                            />
                                          ))
                                }
                            </div>

                            <Checkout 
                                convertToUSD={convertToUSD} 
                                TaxPercentage={TaxPercentage} 
                                total={total}
                            />
                        </> 
                        
                            :

                        <div className='flex flex-col justify-center items-center h-full gap-6 text-inherit/50'>
                            <i className="bi bi-bag-fill text-9xl"></i>
                            <p>Your cart is empty</p>
                        </div>
                }
            </div>
            {/* <div className='w-full flex justify-between items-center mt-4'>
                <p className='text-lg font-semibold'>Total: $0.00</p>
                <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Checkout</button>
            </div> */}
        </div>
    </div>
  )
}

export default Cart