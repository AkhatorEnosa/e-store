import React from 'react'
import Button from '../components/Button'

const Contact = () => {
  return (
    //create a contact page with a form and a map plus header image with contant paragrah on it 
    <section className='relative px-4 md:px-16 lg:px-32 z-30 py-32'>
        <div className='relative w-full flex justify-center items-center mb-10 text-white bg-[url("/src/assets/helpdesk.webp")] bg-cover bg-center bg-no-repeat h-[300px]'>
            <div className='absolute w-full h-full bg-black/50 z-0'></div>
            <h1 className='relative text-5xl font-semibold z-20'>Contact Us</h1>
        </div>

        <div className='relative w-full grid grid-cols-10 gap-10 px-20 py-10'>
            <form className='col-span-6 flex flex-col gap-10 bg-white'>
                <div className='w-full flex flex-col gap-2'>
                    <h2 className='text-2xl font-semibold'>Have a question?</h2>
                    <p className='text-sm text-gray-500 w-[70%]'>We are here to help you. Please fill out the form below and we will get back to you as soon as possible.</p>
                </div>
                <div className='col-span-10 md:col-span-6 flex flex-col gap-8'>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="name" className='text-sm font-semibold'>Name</label>
                        <input type="text" id='name' className='p-2 border rounded-lg outline-none text-sm placeholder:text-xs focus:placeholder:text-sm border-gray-300 focus:border-black' placeholder='Your Name' required />
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                        <input type="email" id='email' className='p-2 border rounded-lg outline-none text-sm placeholder:text-xs focus:placeholder:text-sm border-gray-300 focus:border-black' placeholder='Your Email' required />
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="message" className='text-sm font-semibold'>Message</label>
                        <textarea id='message' className='p-2 border rounded-lg outline-none text-sm placeholder:text-xs focus:placeholder:text-sm border-gray-300 focus:border-black h-48 resize-none' placeholder='Your Message' required></textarea>
                    </div>

                    <Button 
                        title={"Send Message"}
                        operation={false}
                        icon={false}
                        // variants={'w-full md:max-w-[300px] min-w-fit flex items-center justify-center font-medium gap-4 px-5 py-3 lg:px-10 md:py-4 lg:w-[80%] rounded-lg text-xs md:text-base'}
                        handleClick={() => alert('Message sent!')}
                    />
                </div>
            </form>

            <div className='h-fit col-span-4 flex flex-col gap-10 text-sm p-6 rounded-3xl bg-secondary-50 border-[1px] border-secondary-400 border-dashed sticky top-5'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-lg font-semibold'>Get in touch</h2>
                    <p className='text-gray-500 text-xs'>Feel free to reach out to us. Our team are working around the clock for you</p>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='flex justify-center items-center w-10 h-10 rounded-full text-secondary-50 bg-secondary-300'>
                        <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div>
                        <h3 className='font-semibold'>Address</h3>
                        <p className='text-gray-500'>1234 Street Name, City, State, Zip</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='flex justify-center items-center w-10 h-10 rounded-full text-secondary-50 bg-secondary-300'>
                        <i className='bi bi-telephone-fill'></i>
                    </div>
                    <div>
                        <h3 className='font-semibold'>Phone</h3>
                        {/* fake number */}
                        <p className='text-gray-500'>(123) 456-7890</p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='flex justify-center items-center w-10 h-10 rounded-full text-secondary-50 bg-secondary-300'>
                        <i className='bi bi-telephone-fill'></i>
                    </div>
                    <div>
                        <h3 className='font-semibold'>Email</h3>
                        {/* fake email */}
                        <p className='text-gray-500'>contact-us@soozeer.com</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contact