import React from 'react';
import {GrFacebookOption} from 'react-icons/gr';
import {GrTwitter} from 'react-icons/gr';
import {GrInstagram} from 'react-icons/gr';
import {GrPinterest} from 'react-icons/gr';
import {RiVisaLine} from 'react-icons/ri';
import {FaCcMastercard} from 'react-icons/fa';
import {FaCcPaypal} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='w-full flex md:flex-row flex-col justify-around p-10 py-20'>
      <div className='flex flex-col max-w-[450px] md:px-5 py-2 mb-5'>
        <div className="logo text-black text-5xl font-extrabold items-center mb-6">
          <p>Shaup</p>
        </div>
          <p className='font-extralight text-sm'>Discover a seamless shopping experience at Shaup, your go-to destination for stylish, high-quality products. From trendy fashion to everyday essentials, we bring you carefully selected items that blend affordability with premium design. Shop with confidence, enjoy fast delivery, and elevate your lifestyle with Shaup</p>
          <div className="flex w-full gap-1 mt-5">
            <RiVisaLine className='text-[#3b3521]' size={40}/>
            <FaCcMastercard className='text-[#3b3521]' size={40}/>
            <FaCcPaypal className='text-[#3b3521]' size={40}/>
          </div>
      </div>

      <div className="flex flex-col md:px-5 py-2">
        <h1 className='text-1xl font-bold uppercase mb-2'>Quick Links</h1>
        <div className="flex flex-col">
          <ul className='font-extralight text-sm'>
            <li className='my-2'><a href="#">About</a></li>
            <li className='my-2'><a href="#">Blogs</a></li>
            <li className='my-2'><a href="#">Contact</a></li>
            <li className='my-2'><a href="#">FAQ</a></li>
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
          <input type="text" placeholder='Email' className='mr-6 md:w-auto'/>
          <button className="bg-black text-white font-sm py-2 px-5 rounded-full">
            Subscribe
          </button>
          </div>
          <div className="flex mt-7">
            <span className='bg-[#fe4343]/30 rounded-full p-2 mx-2 cursor-pointer'>
              <GrFacebookOption className='text-[#3b3521]' size={20}/>
            </span>
            <span className='bg-[#fe4343]/30 rounded-full p-2 mx-2'>
              <GrTwitter className='text-[#3b3521]' size={20}/>
            </span>
            <span className='bg-[#fe4343]/30 rounded-full p-2 mx-2'>
              <GrInstagram className='text-[#3b3521]' size={20}/>
            </span>
            <span className='bg-[#fe4343]/30 rounded-full p-2 mx-2'>
              <GrPinterest className='text-[#3b3521]' size={20}/>
            </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
