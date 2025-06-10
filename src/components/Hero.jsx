import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import { Link } from "react-router-dom";
import Navigator from "./Navigator";

const Hero = ({  item }) => {
  const { cart, toggleItem, convertToUSD, findItemInGroup } = useContext(AppContext);

  const {id, image, title, description, price} = item;
  const itemInCart = findItemInGroup(cart, item);

  return (
    <div className="w-full h-fit lg:h-screen flex flex-col lg:grid grid-cols-7 py-20 mt-6 lg:mt-16 px-8 md:px-16 lg:px-32 md:gap-8 lg:gap-10 justify-around md:justify-evenly items-center bg-[#f6f6f6]">
      <div className="col-span-full lg:col-span-3 lg:py-6 flex flex-col gap-4 justify-center lg:justify-evenly lg:h-[550px] z-40 order-last lg:order-first lg:text-left text-justify">
        <h1 className="w-fit sm:mt-0 md:mt-14 lg:mt-0 z-40 bg-[#444]/10">
          <span className="text- animate-pulse text-accent-600">&#x3C;</span> Hottest
          Sale <span className="text-accent-600 animate-pulse">&#62;</span>
        </h1>
        <div className="flex flex-col gap-2">
          <Navigator
            url={`/products/${id}`}
            variants={'mr-8 cursor-pointer duration-150 hover:text-accent-700'}
          >
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter">
              {title}
            </h1>
          </Navigator>
          <p className="h-fit flex items-center">
            <span className="h-fit line-through opacity-50 italic px-2 py-1">$189.95</span>
            <b className="h-fit text-4xl font-bold text-accent-600">{convertToUSD(price)}</b>
          </p>
        </div>
        <p>
          {description}
        </p>
        <Button 
          title={itemInCart ? "Item in Cart" : "Add to Cart"}
          operation={itemInCart}
          handleClick={() => toggleItem('cart', item)}
        />
      </div>

      <div className="img col-span-full lg:col-span-4 order-first lg:order-last z-30 lg:scale-115">
        <h1 className="w-fit sm:mt-0 md:mt-14 lg:mt-0 z-40 bg-[#444]/10 text-xl lg:hidden">
          <span className="text- animate-pulse text-accent-600">&#x3C;</span> Hottest
          Sale <span className="text-accent-600 animate-pulse">&#62;</span>
        </h1>
        <img src={image} alt="Product image" />
      </div>
    </div>
  )
}

export default Hero
