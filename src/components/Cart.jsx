import React, { useContext, useEffect, useState } from 'react'
import Item from './Item';
import { TiShoppingCart } from 'react-icons/ti';
import { AiOutlineClose } from 'react-icons/ai';
import { AppContext } from '../context/AppContext';

const Cart = ({ show, handleShow }) => {
    const { cart, convertToUSD } = useContext(AppContext)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const sumPrices =  cart.reduce((sum, item) => {
            return sum + (item.price || 0);
          }, 0);

          setTotal(sumPrices)
    }, [cart])

  return ( 
    <div className={`w-screen h-screen ${show ? "flex" : "hidden"} flex-col justify-center items-center bg-black/50 fixed z-50`}>
        <div className='w-[80%] h-[95%] bg-white shadow-lg rounded-lg flex flex-col justify-between items-center p-6'>
            <div className='w-full flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Your Cart</h2>
                <AiOutlineClose className='w-10 h-10 p-2 hover:bg-black/90 hover:text-white rounded-full text-md md:text-xl duration-150 cursor-pointer' onClick={()=>handleShow(show)}/>
            </div>
            <div className={`w-full h-full ${cart?.length > 0 && "grid grid-cols-5 gap-6" }`}>
                {
                    cart?.length > 0 ? 
                        <>
                            <div className='col-span-3 w-full h-full flex flex-col gap-4 divide-y divide-[#342718]/10 overflow-y-scroll'>
                                {/* Cart items will be displayed here */}
                                {
                                        cart?.map((item) => {
                                            return(
                                                <Item key={item.id} item={item}/>
                                            )
                                        })
                                }
                            </div>

                            <div className='col-span-2 w-full h-fit p-4 border-[1px] border-[#342718]/10 rounded-lg'>
                                <h3 className='text-lg font-semibold mb-4'>Summary</h3>
                                <div className='flex justify-between items-center mb-2'>
                                    <p>Subtotal:</p>
                                    <p>{convertToUSD(total)}</p>
                                </div>
                                <div className='flex justify-between items-center mb-2'>
                                    <p>Tax:</p>
                                    <p>$0.00</p>
                                </div>
                                <div className='flex justify-between items-center font-semibold mb-4'>
                                    <p>Total:</p>
                                    <p>$0.00</p>
                                </div>
                                <button className={`px-10 py-2 lg:py-4 w-full lg:mt-4 bg-[#2ECC71] hover:bg-[#27AE60] font-semibold text-white shadow-md rounded-lg duration-150`}>Checkout</button>
                            </div>
                        </> 
                        
                            :

                        <div className='flex flex-col justify-center items-center h-full text-inherit/50'>
                            <TiShoppingCart size={200}/>
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