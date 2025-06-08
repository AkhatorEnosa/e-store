import React from 'react';
import {RiVisaLine} from 'react-icons/ri';
import {FaCcMastercard} from 'react-icons/fa';
import {FaCcPaypal} from 'react-icons/fa';
import { NAVLINKS } from '../constants/navlinks';
import Navigator from './Navigator';

const Footer = () => {
  return (
    <div className='w-full flex lg:flex-row flex-col justify-around p-10'>
      <div className='flex flex-col max-w-[450px] md:px-5 py-2 mb-5'>
        <div className="logo text-black text-5xl font-extrabold items-center mb-6">
          <p>Shaup</p>
        </div>
          <p className='font-extralight text-sm'>Discover a seamless shopping experience at Shaup, your go-to destination for stylish, high-quality products. From trendy fashion to everyday essentials, we bring you carefully selected items that blend affordability with premium design. Shop with confidence, enjoy fast delivery, and elevate your lifestyle with Shaup</p>
          <div className="flex w-full gap-1 mt-5">
            <RiVisaLine className='' size={40}/>
            <FaCcMastercard className='' size={40}/>
            <FaCcPaypal className='' size={40}/>
          </div>
      </div>

      <div className="flex flex-col md:px-5 py-2">
        <h1 className='text-1xl font-bold uppercase mb-2'>Quick Links</h1>
        <div className="flex flex-col">
          <ul className='font-extralight text-sm'>
            {
              NAVLINKS.map((link, index) => (
                <li key={index} className='my-2'>
                <Navigator 
                  url={link.path}
                  variants={"hover:text-accent-700"}
                >{link.label}</Navigator>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      {/* <div className="flex flex-col md:px-5 py-2">
        <h1 className='text-1xl font-bold uppercase mb-2'>Account</h1>
        <div className="flex flex-col">
          <ul className='font-extralight text-sm'>
            <li className='my-2'>About</li>
            <li className='my-2'>Blogs</li>
            <li className='my-2'>Contact</li>
            <li className='my-2'>FAQ</li>
          </ul>
        </div>
      </div> */}

      <div className="flex flex-col py-2 md:pl-2 pr-10">
        <h1 className='text-1xl font-bold uppercase mb-2'>Newsletter</h1>
        <div className="flex border-[1px] border-[#ccc] rounded-full py-1 px-2 w-fit">
          <input type="text" placeholder='Email' className='mr-6 md:w-auto outline-none'/>
          <button className="bg-black text-white font-sm py-2 px-5 rounded-full">
            Subscribe
          </button>
          </div>
          <div className="flex gap-2 mt-7">
            <i className='flex justify-center items-center p-2 text-2xl bi bi-facebook bg-primary-100 rounded-full cursor-pointer'>
            </i>
            <i className='flex justify-center items-center p-2 text-2xl bi bi-twitter-x bg-primary-100 rounded-full cursor-pointer'>
            </i>
            <i className='flex justify-center items-center p-2 text-2xl bi bi-instagram bg-primary-100 rounded-full cursor-pointer'>
            </i>
            <i className='flex justify-center items-center p-2 text-2xl bi bi-pinterest bg-primary-100 rounded-full cursor-pointer'>
            </i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
