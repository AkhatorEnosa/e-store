import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import CheckoutCard from '../components/CheckoutCard'

const Checkout = () => {
    const { cart, convertToUSD, taxPercentage } = useContext(AppContext)
    const [total, setTotal] = useState(0)

    useMemo(() => {
        const sumPrices =  cart?.reduce((sum, item) => {
            return sum + (item.price || 0);
          }, 0);

          setTotal(sumPrices)

        //   console.log("cart", cart)
    }, [cart])
  return (
    <div className='relative w-full h-fit grid grid-cols-10 py-14 lg:py-20 mt-6 lg:mt-16 sm:px-8 md:px-16 lg:px-32 gap-2 md:gap-8 justify-evenly items-start p-10'>
        {/* <div className='flex flex-col max-w-[450px] md:px-5 py-2 mb-5'>
            <h3 className='text-md lg:text-lg font-semibold mb-4'>Checkout Summary</h3>
            <p className='font-extralight text-[10px] md:text-sm'>Your order is being processed. Please wait while we prepare your items for shipping.</p>
        </div> */}
        <div className='w-full col-span-6 flex flex-col gap-5'>
            <h3 className='text-md lg:text-xl font-semibold mb-4'>Shipping Information</h3>

            {/* Shipping form or details will go here */}
            <form className='w-full flex flex-col gap-6'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="firstname" className='text-xs font-semibold'>First Name</label>
                        <input 
                            id="firstname"
                            type="text" 
                            placeholder="Enter Firstname" 
                            className='p-2 border border-gray-300 rounded-lg focus:border-black outline-none placeholder:text-xs focus:placeholder:text-sm' 
                            required 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="lastname" className='text-xs font-semibold'>Last Name</label>
                        <input 
                            id="lastname"
                            type="text" 
                            placeholder="Enter Lastname" 
                            className='p-2 border border-gray-300 rounded-lg focus:border-black outline-none placeholder:text-xs focus:placeholder:text-sm' 
                            required 
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="address" className='text-xs font-semibold'>Shipping Address</label>
                    <textarea 
                        id="address"
                        rows={5} 
                        type="text" 
                        placeholder="Shipping Address" 
                        className='p-2 border border-gray-300 rounded-lg focus:border-black outline-none placeholder:text-xs focus:placeholder:text-sm resize-none' 
                        required
                    />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='text-xs font-semibold'>Email Address</label>
                        <input 
                            id="email"
                            type="email" 
                            placeholder="Email Address" 
                            className='p-2 border border-gray-300 rounded-lg focus:border-black outline-none placeholder:text-xs focus:placeholder:text-sm' 
                            required 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="phone" className='text-xs font-semibold'>Phone Number</label>
                        <input 
                            id="phone"
                            type="tel" 
                            placeholder="Phone Number" 
                            className='p-2 border border-gray-300 rounded-lg focus:border-black outline-none placeholder:text-xs focus:placeholder:text-sm' 
                            required 
                        />
                    </div>
                </div>
                
                <div className='grid grid-cols-3 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="city" className='text-xs font-semibold'>City</label>
                        <input 
                            id="city"
                            type="text" 
                            placeholder="City" 
                            className='p-2 border border-gray-300 rounded-lg focus:border-black outline-none placeholder:text-xs focus:placeholder:text-sm' 
                            required 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="state" className='text-xs font-semibold'>State/Province</label>
                        <input 
                            id="state"
                            type="text" 
                            placeholder="State/Province" 
                            className='p-2 border border-gray-300 rounded-lg focus:border-black outline-none placeholder:text-xs focus:placeholder:text-sm' 
                            required 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="postal" className='text-xs font-semibold'>Postal Code</label>
                        <input 
                            id="postal"
                            type="text" 
                            placeholder="Postal Code" 
                            className='p-2 border border-gray-300 rounded-lg focus:border-black outline-none placeholder:text-xs focus:placeholder:text-sm' 
                            required 
                        />
                    </div>
                </div>
                
                <button className='flex justify-center items-center gap-2 px-10 py-4 w-full mt-4 font-semibold bg-secondary-600 hover:bg-secondary-700 text-white shadow-md rounded-lg duration-150' onClick={() => alert("Order confirmed")}>
                    <i className='bi bi-check-circle-fill'></i> Confirm Shipping
                </button>
            </form>
        </div>

        <div className='w-full col-span-4 px-4 py-5'>
            <h3 className='text-md lg:text-xl font-semibold mb-4'>Order Summary</h3>
            <div className='flex flex-col gap-2'>
                {cart?.map((x, index) => (
                    <CheckoutCard 
                        key={index} // unique key
                        item={x} 
                        convertToUSD={convertToUSD}
                    />
                ))}
            </div>
            <div className='mt-6 border-t-[1px] border-[#342718]/10 pt-2'>
                <div className='flex justify-between items-center mb-2'>
                    <p>Subtotal:</p>
                    <p>{convertToUSD(cart?.reduce((sum, item) => sum + (item.price || 0), 0))}</p>
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <p>Tax:</p>
                    <p className='text-xs text-black/60'>{convertToUSD(taxPercentage(total))} (7%)</p>
                </div>
                <div className='flex justify-between items-center font-semibold mb-2'>
                    <p>Total:</p>
                    <p>{convertToUSD(taxPercentage(total) + total)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout