import { useContext } from "react";
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { AppContext } from "../context/AppContext";

const Hero = ({ cart, item }) => {
  const { toggleItem } = useContext(AppContext);

  const {image, title, description, price} = item;
  const itemInCart = cart.some((cartItem => cartItem.id === item.id));

  return (
    <div className="w-full h-auto md:h-screen bg-grey flex flex-col lg:grid grid-cols-7 py-20 lg:py-0 mt-6 lg:mt-16 px-8 md:px-16 lg:px-32 md:gap-8 lg:gap-10 justify-around md:justify-evenly items-center bg-[#f6f6f6]">
      <div className="col-span-full lg:col-span-3 lg:py-6 flex flex-col justify-between lg:justify-evenly h-[200px] md:h-[400px] lg:h-[550px] z-40 order-last lg:order-first lg:text-left text-justify">
        <h1 className="w-fit sm:mt-0 md:mt-14 lg:mt-0 z-40 bg-[#444]/10">
          <span className="text-[#fe4343] animate-pulse">&#x3C;</span> Hottest
          Sale <span className="text-[#fe4343] animate-pulse">&#62;</span>
        </h1>
        <div className="">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-wide">
            {title}
          </h1>
          <p>Priced @ <b className="text-2xl font-bold mt-6 text-[#fe4343]">₦{(price) * 500}</b></p>
        </div>
        <p>
          {description}
        </p>
        <button className={`px-10 py-2 lg:py-4 w-fit lg:mt-4 lg:w-[80%] ${itemInCart ? "bg-[#fe4343] text-white" : "bg-black/90 text-white hover:bg-[#fe4343] hover:text-[#fff] shadow-md"} duration-150`} onClick={()=>  toggleItem(item) }>
          {itemInCart ? <span className="w-full h-full flex justify-center items-center gap-6"><MdOutlineRemoveShoppingCart size={25}/> Remove from Cart</span> : <span className="w-full h-full flex justify-center items-center gap-6"><MdOutlineAddShoppingCart size={25}/> Add to Cart</span>}
        </button>
      </div>

      <div className="img col-span-full lg:col-span-4 order-first lg:order-last z-30 lg:scale-115">
        <img src={image} alt="Product image" />
      </div>
    </div>
  )
}

export default Hero
