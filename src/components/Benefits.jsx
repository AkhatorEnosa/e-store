import React from 'react';
import {AiFillCar} from 'react-icons/ai';
import {FaMoneyBill} from 'react-icons/fa';
import {BsHeadphones} from 'react-icons/bs';
import {FaUserShield} from 'react-icons/fa';

const Countdown = () => {
  return (
    <div className='w-full grid lg:grid-cols-4 grid-cols-2 justify-between bg-amber-500/20 p-10 -mt-10'>
      <div className="flex flex-col mx-auto font-bold items-center p-7 gap-2 text-center">
        <i className="bi bi-airplane-fill text-6xl"></i>
        Free Shipping
        <p className='font-light text-sm mt-2'>Enjoy FREE Shipping on all orders! Shop now and have your favorites delivered straight to your door at no extra cost.</p>
      </div>
      <div className="flex flex-col mx-auto font-bold items-center p-7 text-center">
        <i className="bi bi-cash-coin text-6xl"></i>
        30-Day Money Back Guarantee
        <p className='font-light text-sm mt-2'>We’re confident you’ll love your purchase! If for any reason you’re not completely satisfied, return it within 30 days for a full refund—no questions asked. Your happiness is our priority!  
        Returns must be in original condition with proof of purchase. Refunds processed within 5-7 business days. Shipping costs are non-refundable.</p>
      </div>
      <div className="flex flex-col mx-auto font-bold items-center p-7 text-center">
        <i className="bi bi-headset text-6xl"></i>
        24/7 Online Support
        <p className='font-light text-sm mt-2'>We're here for you anytime, anywhere! Our dedicated support team is available 24/7 to answer your questions, resolve issues, and ensure a seamless shopping experience. Whether it’s help with orders, product inquiries, or technical support, reach out via live chat, email, or phone. Shop with confidence, knowing we’ve got your back around the clock!</p>
      </div>
      <div className="flex flex-col mx-auto font-bold items-center p-7 text-center">
        <i className="bi bi-shield-shaded text-6xl"></i>
        Secure Payment
        <p className='font-light text-sm mt-2'>Shop worry-free at Shaup! We use top-notch security to protect your payments. Whether you pay with a card, PayPal, or other methods, your info stays safe with strong encryption. Enjoy easy and secure checkout every time.

</p>
      </div>
    </div>
  );
};

export default Countdown;
