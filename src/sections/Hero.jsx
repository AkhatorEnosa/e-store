
import { motion } from "motion/react"
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "../components/Button";
import Navigator from "../components/Navigator";

const Hero = ({  item }) => {
  const { cart, toggleItem, convertToUSD, findItemInGroup } = useContext(AppContext);

  const {id, image, title, description, price} = item;
  const itemInCart = findItemInGroup(cart, item);

  return (
    <div className="group relative w-full h-fit lg:h-screen grid grid-cols-7 py-32 lg:py-20 mt-6 lg:mt-16 sm:px-8 md:px-16 lg:px-32 gap-2 md:gap-8 justify-evenly items-center bg-gradient-to-l from-white to-[#f6f6f6]">
      <div className="absolute bg-gradient-to-l from-white to-primary-50/60 w-full h-full lg:opacity-0 z-40 duration-300"></div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.2 }}
       className="col-span-full md:col-span-5 px-8 lg:pr-16 py-6 flex flex-col gap-2 md:gap-4 justify-center lg:justify-evenly lg:h-[550px] z-50 lg:text-left">
        <h1 className="w-fit z-40 bg-[#444]/10">
          <span className="text- animate-pulse text-accent-600">&#x3C;</span> Hottest
          Sale <span className="text-accent-600 animate-pulse">&#62;</span>
        </h1>
        <div className="flex flex-col gap-2 mt-5 md:mt-10 lg:mt-0">
          <Navigator
            url={`/products/${id}`}
            variants={'mr-8 cursor-pointer duration-150 hover:text-accent-700'}
          >
            <h1 className="w-fit text-7xl lg:text-8xl font-black tracking-tighter">
              {title}
            </h1>
          </Navigator>
          <p className="h-fit flex items-center">
            <span className="h-fit line-through opacity-50 italic px-2 py-1">$189.95</span>
            <b className="h-fit text-xl lg:text-4xl font-bold text-accent-600">{convertToUSD(price)}</b>
          </p>
        </div>
        <p className="lg:py-5 lg:pr-2 text-xs md:text-sm lg:text-base tracking-wide lg:bg-gradient-to-l from-white to-[#f6f6f6] duration-300">
          {description}
        </p>
        <Button 
          title={itemInCart ? "Item in Cart" : "Add to Cart"}
          operation={itemInCart}
          handleClick={() => toggleItem('cart', item)}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-10 right-0 col-span-4 pr-16 lg:z-50 group-hover:z-30">
        {/* <h1 className="w-fit sm:mt-0 md:mt-14 lg:mt-0 z-40 bg-[#444]/10 text-sm lg:hidden">
          <span className="text- animate-pulse text-accent-600">&#x3C;</span> Hottest
          Sale <span className="text-accent-600 animate-pulse">&#62;</span>
        </h1> */}
        <div className="w-full flex justify-end items-center mr-32">
          <img src={image} alt="Product image" className="min-w-[750px] max-w-[90%] group-hover:scale-90 -rotate-12 duration-300"/>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero
