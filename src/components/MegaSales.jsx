import React, { useEffect, useRef, useState } from 'react'
import ShopBag from '../assets/happy2.png'
import Navigator from './Navigator';

const MegaSales = () => {
  const [countdown, setCountdown] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    const countDownDate = new Date('Nov 15, 2025 12:46:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeDifference = countDownDate - now;

      if (timeDifference <= 0) {
        setCountdown('EXPIRED');
        clearInterval(intervalRef.current);
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown(`${days}days  ${hours}hrs  ${minutes}mins  ${seconds}secs`);
    };

    // Initial call to avoid 1-second delay
    updateCountdown();
    
    // Set up interval
    intervalRef.current = setInterval(updateCountdown, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative w-full flex justify-center align-middle bg-[#f7f5ed] items-center px-10 lg:px-20 shadow-sm z-30 overflow-clip">
      <div className='overflow-hidden'>
        <img
          src={ShopBag}
          alt="shopping bag"
          className="lg:w-[60rem] md:w-[25rem] w-[90%] md:relative absolute md:left-0 bottom-0 right-60 mix-blend-darken"
        />
      </div>

      {countdown === 'EXPIRED' ? (
        <div className="flex flex-col ml-10 z-50">
          <p className="md:text-base text-xs text-center">
            THE BIGGEST SALE OF THE YEAR
          </p>
          <h1 className="lg:text-7xl md:text-3xl text-2xl tracking-tight font-extrabold text-center">
            Mega Shopping Fiesta
          </h1>
          {/* <h1 className='mt-6 text-center lg:text-3xl text-2xl tracking-tight font-bold uppercase'>{countdown}</h1> */}
            <Navigator 
              url="/products"
              variants={'w-full p-6 px-3 hover:border-b-[1px] hover:border-b-accent-700 hover:translate-x-4 capitalize duration-200 cursor-pointer'}
            >
              <button className="px-10 md:px-32 py-3 mx-auto hover:bg-accent-600 bg-[#000] text-white my-4 shadow-md cursor-pointer duration-150">
                Explore
              </button>
            </Navigator>
        </div>
      ) : (
        <div className="flex flex-col ml-10 py-8 z-50">
          <p className="md:text-base text-xs text-center">
            THE BIGGEST SALE OF THE YEAR
          </p>
          <h1 className="lg:text-7xl text-3xl tracking-tight font-extrabold text-center">
            Mega Shopping Fiesta
          </h1>
          <p className='text-center lg:text-4xl text-2xl tracking-tight font-bold mt-4 capitalize text-primary-600 animate-pulse'>COMING SOON!!!!</p>
          {/* <h1 className="mt-6 text-center lg:text-4xl text-2xl tracking-tight font-bold capitalize countdown text-accent-500">
            {countdown}
          </h1> */}
        </div>
      )}
    </div>
  )
}

export default MegaSales
