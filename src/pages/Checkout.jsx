import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import CheckoutItemCard from '../components/CheckoutItemCard'
import { PaystackButton } from 'react-paystack';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, convertToUSD, taxPercentage } = useContext(AppContext)
    const navigate = useNavigate();
    const [total, setTotal] = useState(0)
    const [convertedTotal, setConvertedTotal] = useState(0);
    
    // one state to rule them all 
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        address: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        postal: ''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    

        
    useEffect(() => {
        if ([...cart].length < 1) navigate(-1, { replace: true }); // Redirect if missing
        }, [cart, navigate]);
  
    // Check if all fields are filled whenever formData changes
    useEffect(() => {
      const allFieldsFilled = Object.values(formData).every(
        field => field.trim() !== ''
      );
      setIsButtonDisabled(!allFieldsFilled);
    }, [formData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    useMemo(() => {
        const sumPrices =  cart?.reduce((sum, item) => {
            return sum + (item.price || 0);
          }, 0);

          setTotal(sumPrices)
            setConvertedTotal((convertToUSD(taxPercentage(sumPrices) + sumPrices)).substring(1, convertToUSD(taxPercentage(sumPrices) + sumPrices).length));

            console.log(convertedTotal)

        //   console.log("cart", cart)
    }, [cart])
  
    const getInputClass = () => {
      return `p-2 border rounded-lg outline-none text-sm placeholder:text-xs focus:placeholder:text-sm border-gray-300 focus:border-black`
    };

  
    const config = {
        reference: (new Date()).getTime().toString(),
        email: formData.email, // customer email
        amount: Number(convertedTotal) * 1500 * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_619c9705a601e1ee2e86177a85ddd661feed44f9',
    };
    // you can call this function anything
    const handlePaystackSuccessAction = (reference) => {
      // Implementation for whatever you want to do with reference and after success call.
      console.log(reference);
      alert("Payment Successful")
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const componentProps = {
        ...config,
        text: 'Confirm Shipping',
        disabled: isButtonDisabled ? true : false,
        className: `flex justify-center items-center gap-2 px-10 py-4 w-full mt-10 lg:mt-4 font-semibold ${isButtonDisabled ? "bg-gray-300 hover:bg-gray-400" : "bg-secondary-600 hover:bg-secondary-700"} text-white shadow-md rounded-lg duration-150`,
        children:  <i className='bi bi-check-circle-fill'></i>,
        onSuccess: (reference) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction,
    };



  return (
    <div className='relative w-full h-fit grid gap-4 lg:grid-cols-10 py-14 lg:py-20 mt-6 lg:mt-16 px-3 sm:px-8 md:px-16 lg:px-32 lg:gap-2 md:gap-8 justify-evenly items-start'>
        {/* <div className='flex flex-col max-w-[450px] md:px-5 py-2 mb-5'>
            <h3 className='text-md lg:text-lg font-semibold mb-4'>Checkout Summary</h3>
            <p className='font-extralight text-[10px] md:text-sm'>Your order is being processed. Please wait while we prepare your items for shipping.</p>
        </div> */}
        <div className='w-full col-span-6 flex flex-col gap-5'>
            <h3 className='text-md lg:text-xl font-semibold mb-4'>Shipping Information</h3>

            {/* Shipping form or details will go here */}
            <form className='w-full flex flex-col gap-6' onSubmit={(e) => e.preventDefault()}>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="firstname" className='text-xs font-semibold'>First Name</label>
                        <input 
                            id="firstname"
                            name="firstname"
                            type="text" 
                            placeholder="Enter Firstname" 
                            className={getInputClass()} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="lastname" className='text-xs font-semibold'>Last Name</label>
                        <input 
                            id="lastname"
                            name="lastname"
                            type="text" 
                            placeholder="Enter Lastname" 
                            className={getInputClass()} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="address" className='text-xs font-semibold'>Shipping Address</label>
                    <textarea 
                        id="address"
                        name="address"
                        rows={5} 
                        type="text" 
                        placeholder="Shipping Address" 
                        className={`${getInputClass()} resize-none`} 
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='text-xs font-semibold'>Email Address</label>
                        <input 
                            id="email"
                            name="email"
                            type="email" 
                            placeholder="Email Address" 
                            className={getInputClass()} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="phone" className='text-xs font-semibold'>Phone Number</label>
                        <input 
                            id="phone"
                            name="phone"
                            type="tel" 
                            placeholder="Phone Number" 
                            className={getInputClass()} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </div>
                
                <div className='grid grid-cols-3 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="city" className='text-xs font-semibold'>City</label>
                        <input 
                            id="city"
                            name="city"
                            type="text" 
                            placeholder="City" 
                            className={getInputClass()} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="state" className='text-xs font-semibold'>State/Province</label>
                        <input 
                            id="state"
                            name="state"
                            type="text" 
                            placeholder="State/Province" 
                            className={getInputClass()} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="postal" className='text-xs font-semibold'>Postal Code</label>
                        <input 
                            id="postal"
                            name="postal"
                            type="text" 
                            placeholder="Postal Code" 
                            className={getInputClass()} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </div>
                
            </form>
        </div>

        <div className='w-full col-span-4 md:px-4 py-5'>
            <h3 className='text-md lg:text-xl font-semibold mb-4'>Order Summary</h3>
            <div className='flex flex-col gap-2 w-full h-80 overflow-y-scroll py-2'>
                {cart?.map((x, index) => (
                    <CheckoutItemCard
                        key={index} // unique key
                        item={x} 
                        convertToUSD={convertToUSD}
                    />
                ))}
            </div>

            <div className='mt-5 border-t-[1px] border-[#342718]/10 pt-2 text-sm'>
                <div className='flex justify-between items-center mb-2'>
                    <p>Subtotal:</p>
                    <p>{convertToUSD(total)}</p>
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <p>Shipping:</p>
                    <p className='text-xs text-black/60'>{convertToUSD(10)}</p>
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <p>Tax:</p>
                    <p className='text-xs text-black/60'>{convertToUSD(taxPercentage(total))} (7%)</p>
                </div>
                <div className='flex justify-between items-center font-semibold mt-4'>
                    <p>Total:</p>
                    <p>{convertToUSD(taxPercentage(total) + total + 10)}</p>
                </div>
            </div>

            <PaystackButton {...componentProps} />
        </div>
    </div>
  )
}

export default Checkout