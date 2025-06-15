import React, { useContext } from 'react';
import { motion } from 'motion/react'
import {RiVisaLine} from 'react-icons/ri';
import {FaCcMastercard} from 'react-icons/fa';
import {FaCcPaypal} from 'react-icons/fa';
// import { NAVLINKS } from '../constants/navlinks';
import Navigator from '../components/Navigator';
import Logo from '../assets/logo.webp'
import { AppContext } from '../context/AppContext';

const Footer = () => {
  const { formulateLinks, products } = useContext(AppContext);
  const navLinks = formulateLinks([...products])

  return (
    <div className='w-full flex lg:flex-row flex-col justify-around p-10'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ amount: 0.2 }} className='flex flex-col max-w-[450px] md:px-5 py-2 mb-5'>
        <div className="logo text-black text-5xl font-extrabold items-center mb-6">
         <img src={Logo} alt="logo" className="w-24"/>
        </div>
          <p className='font-extralight text-[10px] md:text-sm'>Discover a seamless shopping experience at Shaup, your go-to destination for stylish, high-quality products. From trendy fashion to everyday essentials, we bring you carefully selected items that blend affordability with premium design. Shop with confidence, enjoy fast delivery, and elevate your lifestyle with Shaup</p>
          <div className="flex w-full gap-1 mt-5">
            <RiVisaLine className='' size={40}/>
            <FaCcMastercard className='' size={40}/>
            <FaCcPaypal className='' size={40}/>
          </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        viewport={{ amount: 0.2 }} className="flex flex-col md:px-5 py-2">
        <h1 className='text-1xl font-bold uppercase mb-2'>Quick Links</h1>
        <div className="flex flex-col">
          <ul className='font-extralight text-[10px] md:text-sm'>
            {
              navLinks.map((link, index) => (
                <li key={index} className='my-2'>
                <Navigator 
                  url={link.url}
                  variants={"hover:text-accent-700 capitalize"}
                >{link.title}</Navigator>
                </li>
              ))
            }
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        viewport={{ amount: 0.2 }} className="flex flex-col py-2 md:pl-2 pr-10 text-[10px] md:text-sm">
        <h1 className='text-base font-bold uppercase'>Newsletter</h1>
        <p className='font-extralight mb-5'>Subscribe to our Newsletter to get latest updates and offers!</p>
        <div className="flex border-[1px] border-[#ccc] rounded-full py-1 px-2 w-fit text-[10px] md:text-xs">
          <input type="text" placeholder='Email' className='mr-6 md:w-auto outline-none'/>
          <button className="bg-black/90 text-white hover:bg-primary-600 hover:text-[#fff] shadow-md font-sm py-2 px-5 rounded-full duration-150">
            Subscribe
          </button>
          </div>
          <div className="flex gap-2 mt-7">
            <i className='flex justify-center items-center p-2 text-2xl bi bi-facebook rounded-full cursor-pointer'>
            </i>
            <i className='flex justify-center items-center p-2 text-2xl bi bi-twitter-x rounded-full cursor-pointer'>
            </i>
            <i className='flex justify-center items-center p-2 text-2xl bi bi-instagram rounded-full cursor-pointer'>
            </i>
            <i className='flex justify-center items-center p-2 text-2xl bi bi-pinterest rounded-full cursor-pointer'>
            </i>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
