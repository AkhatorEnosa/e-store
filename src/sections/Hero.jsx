
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
    <motion.div 
      initial={{ background: "linear-gradient(0deg, white, rgb(239 246 255 / 0.6))" }}
      animate={{
        background: [
          "linear-gradient(0deg, white, rgba(255,202,27, 0.05))",
          "linear-gradient(90deg, rgba(255,202,27, 0.05), white)"
        ]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
    
      className="group relative w-full h-fit lg:min-h-screen grid grid-cols-7 py-20 lg:py-0 mt-0 sm:px-8 md:px-16 lg:px-32 gap-2 md:gap-8 justify-evenly items-center">
      <div className="absolute bg-gradient-to-l from-white to-primary-50/60 w-full h-full lg:opacity-0 z-40 duration-300"></div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.2 }}
       className="col-span-full md:col-span-5 px-8 lg:pr-16 py-6 flex flex-col gap-2 md:gap-4 justify-center lg:justify-evenly lg:h-[550px] z-50 lg:text-left">
        <motion.h1
          animate={{ 
            opacity: [0.4, 1, 0.4], // Keyframes
            scale: [1, 1.05, 1], // Scale up and down
            // y: [-5, 0, -5] 
          }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity, // Loop forever
            ease: "easeInOut" 
          }}
          className="w-fit text-xs md:text-inherit z-40 bg-[#444]/10">
          <span className="animate-pulse text-accent-600">&#x3C;</span> Hottest
          Sale <span className="text-accent-600 animate-pulse">&#62;</span>
        </motion.h1>
        <div className="flex flex-col gap-2 mt-5 md:mt-10 lg:mt-0">
          <Navigator
            url={`/products/${id}`}
            variants={'mr-8 cursor-pointer duration-150 hover:text-accent-700'}
          >
            <h1 className="w-fit text-5xl lg:text-8xl font-black tracking-tighter">
              {title}
            </h1>
          </Navigator>
          <p className="h-fit flex items-center">
            <span className="h-fit line-through opacity-50 italic px-2 py-1">$189.95</span>
            <b className="h-fit text-xl lg:text-4xl font-bold text-secondary-600">{convertToUSD(price)}</b>
          </p>
        </div>
        <p className="mb-10 lg:mb-0 lg:py-5 lg:pr-2 text-xs md:text-sm lg:group-hover:text-base font-medium duration-300">
          {description}
        </p>
        <Button 
          title={itemInCart ? "Item in Cart" : "Add to Cart"}
          operation={itemInCart}
          icon={true}
          handleClick={() => toggleItem('cart', item)}
        />
      </motion.div>

      <motion.div
        animate={{ 
          opacity: 1,
          y: [-30, 0, -30] 
        }}
        transition={{ 
          duration: 3, 
          delay: 0.2, // Delay before starting the animation
          repeat: Infinity, // Loop forever
          ease: "easeInOut" 
        }}
        className="absolute top-32 lg:top-auto right-0 lg:z-50 group-hover:z-30 z-30">
        <div className="w-full h-full flex items-center">
          <motion.img
            initial={{ opacity: 0, y: 50, rotate: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src={image} alt="Product image" className="relative min-w-[450px] max-w-[90%] duration-300 z-40"/>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Hero
