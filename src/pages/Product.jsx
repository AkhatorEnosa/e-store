import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

const Product = () => {
    const { cart, wishlist, products, toggleItem, findItemInGroup, updateQuantity, convertToUSD, error} = useContext(AppContext);
    const { id } = useParams()
    const navigate = useNavigate();

    const getProduct = products?.find((product) => product?.id === parseInt(id)); // Find product by ID
    const itemInCart = findItemInGroup(cart, getProduct) ; // Check if item is in cart
    const itemInWishlist = findItemInGroup(wishlist, getProduct);

   const relatedItems = products.filter((item) => item.category === getProduct?.category && item.id !== getProduct?.id); // Filter related items by category, excluding the current product
  //  const shuffledArr = useMemo(() => shuffleArray([...relatedItems]).slice(0, 3), [relatedItems]); // Shuffle related items
    
    useEffect(() => {
        if (!getProduct) navigate('/404', { replace: true }); // Redirect if missing
      }, [getProduct]);

    const originalPrice = getProduct?.price || 0; // Fallback to 0 if price is undefined
    const [clicked, setClicked] = useState('');

  const handleNumAdd = () => {
    if(!itemInCart) {
        setClicked("info");
        setTimeout(() => {
        setClicked("");
      }, 600);
    } else {
      updateQuantity(itemInCart?.id, itemInCart?.quantity + 1, originalPrice)
      setClicked("add");
      setTimeout(() => {
        setClicked("");
      }, 400);
    }
  }

  const handleNumMinus = () => {
    if(!itemInCart) {
        setClicked("info");
        setTimeout(() => {
        setClicked("");
      }, 600);
    } else {
      if(itemInCart?.quantity > 1){
        setClicked("minus");
        setTimeout(() => {
          setClicked("");
        }, 400);
        updateQuantity(itemInCart?.id, itemInCart?.quantity - 1, originalPrice)
      } else {
        setClicked("");
        updateQuantity(itemInCart?.id, 1, originalPrice)
      }
    }
  }

  const handleInfo = () => {
    if(itemInCart) {
      if(itemInCart?.quantity > 1) {
        return `(${itemInCart?.quantity}) Quantities in Cart`;
      }
      return `(${itemInCart?.quantity}) Quantity in Cart`;
    } else {
      return 'Add to cart before you can increase or decrease quantity';
    }
  }
  
  if(error) {
    return (
      <div className="w-full text-center px-9 md:px-16 lg:px-32 py-56">
        <p>Connect to the Internet and try again.</p>
      </div>
    )
  } else {
    if (!products.length) {
      return (
        <div className='px-8 md:px-16 lg:px-32 py-20'>
          <p>No new arrivals available</p>
        </div>
      );
    }
  }

    // Early return if no products
  
    // Get the products to display
    const displayedProducts = [...relatedItems].slice(0, 3);


  return (
    <div className='w-full h-fit flex flex-col gap-10 px-4 md:px-16 lg:px-32 z-30 py-32'>
        <Breadcrumbs />
        <div className='w-full h-full flex flex-col md:grid md:grid-cols-3 lg:grid-cols-2 gap-6'>
            <div className={`group relative w-full h-[400px] md:h-fit lg:h-[500px] flex justify-center items-stretch border-[1px] bg-white p-10 col-span-1 rounded-xl overflow-hidden`}>

                <button title='Add to Wishlist' className={`absolute w-fit h-fit top-3 right-3 lg:top-5 lg:right-5 flex items-center justify-center gap-2 px-2 py-2 text-[10px] rounded-lg ${itemInWishlist ? "bg-secondary-600 text-white" : "bg-white hover:bg-secondary-600 hover:text-[#fff] border-[1px] border-black"} duration-150 z-40`} onClick={()=>  toggleItem('wishlist', getProduct)}>
                  <i className={`bi ${!itemInWishlist ? "bi-heart" : "bi-heart-fill"} text-lg flex justify-center items-center`}></i>
                </button>

                <img src={getProduct?.image} alt={`${getProduct?.image}`} className='w-full h-full group-hover:scale-110 object-contain duration-200'/>
            </div>
            <div className='md:col-span-2 lg:col-span-1 flex flex-col justify-start items-start gap-4'>
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='leading-5 lg:text-6xl font-bold'>{getProduct?.title}</h1>
                    <span className='w-fit text-[10px] bg-gray-200 p-1 rounded-full font-semibold'>{getProduct?.category}</span>
                </div>
                <p className='text-xs text-gray-700'>{getProduct?.description}</p>
                <div className='text-xs flex gap-1'>
                  <i className="bi bi-star-fill text-primary-600"></i>
                  <i className="bi bi-star-fill text-primary-600"></i>
                  <i className="bi bi-star-fill text-primary-600"></i>
                  <i className="bi bi-star-fill text-primary-600"></i>
                  <i className="bi bi-star text-primary-600"></i>
                </div>
                <div className='w-full flex flex-col sm:flex-row sm:justify-between items-start gap-6 sm:gap-4'>
                  <div className='w-full sm:w-fit flex justify-between md:justify-start items-center sm:items-start gap-6'>
                    <p className='text-2xl font-semibold'>{convertToUSD(getProduct?.price)}</p>

                    <div className='min-w-[150px] w-[200px] flex flex-col justify-center items-center md:items-center gap-2 md:w-full'>

                        <div className='w-full grid grid-cols-3 justify-center items-center gap-2 border rounded-lg'>
                            <button>
                              <i className={`flex justify-center items-center size-10 bi bi-dash-lg ${itemInCart?.quantity === 1 && "opacity-50 font-bold cursor-default"} col-span-1 w-full text-sm cursor-pointer`} onClick={() => handleNumMinus()}></i>
                            </button>
                            <span className={`p-2 w-full h-fit text-center border-[1px] ${clicked === "add" ? "border-secondary-400 bg-secondary-50" : clicked === "minus" ? "border-accent-600 bg-accent-50" : "border-inherit/10 bg-gray-400/5"} rounded-md transition-all duration-150`}>{itemInCart?.quantity || 1}</span>
                            <button>
                              <i className="bi bi-plus-lg col-span-1 w-full text-center text-sm cursor-pointer" onClick={() => handleNumAdd()}></i>
                            </button>
                        </div>
                        <p className={`text-[8px] text-center font-semibold ${clicked ? "text-accent-600" : "text-inherit"} transition-colors duration-150`}>{handleInfo()}</p>
                    </div>

                  </div>

                    <Button 
                        title={itemInCart ? "Remove from Cart" : "Add to Cart"}
                        operation={itemInCart}
                        icon={true}
                        handleClick={() => toggleItem('cart', getProduct)}
                        variants={"text-sm"}
                    />
                </div>
                {/* <button className='bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200' onClick={() => navigate('/')}>Back to Products</button> */}
            </div>
        </div>

        <div className="w-full h-fit">
          <h2 className='font-semibold capitalize w-fit mt-10 mb-10'>
            Related Products
          </h2>
          <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'>
            {displayedProducts.map((item) => (
              <ProductCard 
                key={`${item.id}-${item.title}`} 
                item={item}
              />
            ))}
          </div>
        </div>
    </div>
  )
}

export default Product