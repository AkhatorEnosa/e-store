import React from 'react';

const Checkout = ({convertToUSD, TaxPercentage, total}) => {
  return (

    <div className='col-span-2 w-full h-fit p-4 border-[1px] border-[#342718]/10 text-sm lg:text-base rounded-lg'>
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
        <button className={`px-10 py-4 w-full lg:mt-4 bg-black font-semibold hover:bg-primary-600 text-white shadow-md rounded-lg duration-150`}>Place Order</button>
    </div>
  );
};

export default Checkout;
