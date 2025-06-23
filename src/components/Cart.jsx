import React, { useContext, useMemo, useState } from 'react'
import Item from './Item';
import { AppContext } from '../context/AppContext';
import Checkout from './Checkout';

const Cart = () => {
    const { cart, show, handleShow, convertToUSD } = useContext(AppContext)
    const [total, setTotal] = useState(0)

    useMemo(() => {
        const sumPrices =  cart?.reduce((sum, item) => {
            return sum + (item.price || 0);
          }, 0);

          setTotal(sumPrices)

        //   console.log("cart", cart)
    }, [cart])

    const TaxPercentage = (x) => {
        const taxRate = 0.07; // 7% tax rate
        const result = (x * taxRate);
        return result
    }

  return ( 
    <div className={`w-screen h-screen ${show === 'cart' ? "flex" : "hidden"} flex-col justify-center items-center bg-black/50 fixed z-[100]`}>
        <div className='w-[95%] md:w-[60%] lg:w-[80%] max-h-[80%] lg:max-h-[95%] bg-gray-100 shadow-lg rounded-[1rem] flex flex-col justify-between items-center gap-2 p-4 lg:p-6'>
            <div className='w-full flex justify-between items-center md:mb-4 px-2'>
                <h2 className='w-fit md:w-full tracking-tighter text-center text-xl md:text-3xl font-semibold'>You have {cart?.length} items in your cart.</h2>
                <div onClick={()=>handleShow('')} className="flex justify-center items-center rounded-full bg-white size-10 cursor-pointer">
                    <i className={`bi bi-x-lg hover:text-accent-600 text-lg transition-all duration-150`}></i>
                </div>
            </div>
            <div className={`w-full h-full ${cart?.length > 0 && "flex flex-col lg:grid grid-cols-5 gap-3 md:gap-6 overflow-scroll" }`}>
                {
                    cart?.length > 0 ? 
                        <>
                            <div className='col-span-3 w-full h-full flex flex-col gap-4 bg-white divide-y divide-[#342718]/10 border-[1px] border-[#342718]/10 p-4 rounded-[1.5rem] overflow-y-scroll'>
                                {/* Cart items will be displayed here */}
                                {
                                        cart.map((x) => (
                                            // console.log(item)
                                            <Item 
                                              key={x?.id}  // unique key
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
        </div>
    </div>
  )
}

export default Cart