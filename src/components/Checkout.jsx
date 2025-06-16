import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Checkout = ({convertToUSD, TaxPercentage, total}) => {
    const { handleShow } = useContext(AppContext);
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = useCallback(() => {
        setSubmitting(true);
        
        // Store timeout IDs so we can clear them
        const submitTimeout = setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            
            // Reset submitted state after 3 seconds (not 5 as in your comment)
            const resetTimeout = setTimeout(() => {
                setSubmitted(false);
                handleShow(''); // Close the checkout modal
            }, 3000);
            
            // Store the reset timeout ID so we can clear it if needed
            resetTimeoutRef.current = resetTimeout;
        }, 2000);
        
        // Store the submit timeout ID
        submitTimeoutRef.current = submitTimeout;
    }, []); // Add any dependencies your callback might need
    
    // Use refs to store timeout IDs
    const submitTimeoutRef = useRef();
    const resetTimeoutRef = useRef();
    
    // Cleanup timeouts when component unmounts
    useEffect(() => {
        return () => {
            if (submitTimeoutRef.current) {
                clearTimeout(submitTimeoutRef.current);
            }
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        };
    }, []);
  return (

    <div className='col-span-2 w-full h-fit p-4 border-[1px] border-[#342718]/10 text-xs md:text-sm bg-primary-50 md:bg-transparent rounded-[1.5rem]'>
        <h3 className='text-md lg:text-lg font-semibold mb-4'>Summary</h3>
        <div className='flex justify-between items-center mb-2'>
            <p>Subtotal:</p>
            <p>{convertToUSD(total)}</p>
        </div>
        <div className='flex justify-between items-center mb-2'>
            <p>Tax:</p>
            <p className='text-xs text-black/60'>{convertToUSD(TaxPercentage(total))} (7%)</p>
        </div>
        <div className='flex justify-between items-center font-semibold mb-2 mt-6 border-t-[1px] border-[#342718]/10 pt-2'>
            <p>Total:</p>
            <p>{convertToUSD(TaxPercentage(total) + total)}</p>
        </div>
        <button className={`px-10 py-4 w-full lg:mt-4  font-semibold hover:bg-primary-600 ${submitting ? "bg-primary-600" : submitted ? "bg-secondary-600" : "bg-black"} text-white shadow-md rounded-lg duration-150`} onClick={handleSubmit}>
          <span className={`${submitting ? "animate-pulse" : "animate-none"} duration-300`}>{submitting ? "Placing Your Order" : submitted ? "Order Placed Successfully" : "Place Order"}</span>
        </button>
    </div>
  );
};

export default Checkout;
