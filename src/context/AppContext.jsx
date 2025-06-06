import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";


import Shoe from '../assets/shoe.png'

export const AppContext = createContext();

export function AppProvider({ children }) {


  const body = document.body

  const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  
  // start cart
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return []; // Fallback to empty array
    }
  });

  // start saved
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      setError(error)
      console.error('Failed to parse wishlist from localStorage:', error);
      return []; // Fallback to empty array
    }
  });

  const [show, setShow] = useState(false);
  const [nav, setNav] = useState(false);
  const [itemCount, setItemCount] = useState(cart?.length || 0);
  const cartString = useMemo(() => JSON.stringify(cart), [cart]);
  const wishlistString = useMemo(() => JSON.stringify(wishlist), [wishlist]);
  
  const updatedCart = useMemo(() => cart, [cart])
  const updatedWishlist = useMemo(() => wishlist , [wishlist])

  const headerProduct = {
    id: 26,
    category: "men's clothing",
    description: "Legendary Air gets lifted First lifestyle Air Max brings you styke, comfort and 270 degrees of Air. Its tinted Air window lets you showcase one of our greatest innovations.",
    image: Shoe,
    price: 109.95,
    rating: {rate: 3.9, count: 120},
    title: "Nike Air Max 270",
    originalPrice: 109.95
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      if (response.status === 200) {
        const result = response.data.map(product => ({
          ...product, 
          originalPrice: product.price,
          quantity: 1 // Add quantity property with default value of 1
        }))
        result.push(headerProduct); // Add header product to the end of the list
        setProducts(result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      // setProducts([])
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cart', cartString);
      localStorage.setItem('wishlist', wishlistString)
    } catch (error) {
      console.error('LocalStorage save failed:', error);
    }
    
  }, [cartString, wishlistString, updatedCart, updatedWishlist]);
  
  const addSubtotal = (item) => {
    setSubtotal(subtotal+(item.price*500))
    return subtotal;
  }

  const subtractSubtotal = (item) => {
    if(subtotal > 0) {
      setSubtotal(subtotal-(item.price*500))
    }
    return subtotal;
  }

  // const findItemInCart = (cart, item) => {
  //   if(cart === undefined || cart?.length === 0) {
  //     return false;
  //   } else {
  //     const findItem = cart?.find((x) => x.id === item?.id);
  //     return findItem;
  //   }
  // }

  const findItemInGroup = (group, item) => {
    if(group === undefined || group?.length === 0) {
      // console.log(group)
      return false;
    } else {
      const findItem = group?.find((x) => x.id === item?.id);
      // console.log(findItem)
      return findItem;
    }
  }

  const toggleItem = (group, item) => {
    if( group === 'cart') {
      if (!findItemInGroup(cart, item)) { 
        // const updateditem = {...item, quantity: 1} 
        setCart([...cart, item]);
        setItemCount(itemCount+1)
        addSubtotal(item)
      } else {
        const newCart = cart?.filter((cartItem) => cartItem.id !== item.id);
        setCart(newCart);
        setItemCount(itemCount-1)
        subtractSubtotal(item)
      }
    } else if (group === 'wishlist') {
        if (!findItemInGroup(wishlist, item)) { 
          // const updateditem = {...item, quantity: 1} 
          setWishlist([...wishlist, item]);
        } else {
          const newWishlist = wishlist?.filter((wish) => wish.id !== item.id);
          setWishlist(newWishlist);
        }
    }
  }

  // const toggleItem = (item) => {
  //   if (!findItemInCart(cart, item)) { 
  //     const updateditem = {...item, quantity: 1} 
  //     setCart([...cart, updateditem]);
  //     setItemCount(itemCount+1)
  //     addSubtotal(item)
  //   } else {
  //     const newCart = cart?.filter((cartItem) => cartItem.id !== item.id);
  //     setCart(newCart);
  //     setItemCount(itemCount-1)
  //     subtractSubtotal(item)
  //   }
  // }

  // Update quantity of an item
  const updateQuantity = (id, quantity, price) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity, price: price * quantity } : item
      )
    );
  };

  const lockBodyScroll = (state) => {
    if(!state) {
      body.style.height = '100vh'
      body.style.overflowY = 'hidden'
    } else {
      body.style.height = '100vh'
      body.style.overflowY = 'scroll'
    }
  }

  const handleShow = () => {
    setShow(!show);
    lockBodyScroll(show)
  }

  const handleNav = () => {
    setNav(!nav);
    lockBodyScroll(nav)
  }

  const convertToUSD = (x) => {
    const result = x?.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    })

    return result
  }

    return (
        <AppContext.Provider value={{
            products, setProducts,
            loading, setLoading,
            error, setError,
            subtotal, setSubtotal,
            cart, setCart,
            wishlist, setWishlist,
            show, setShow,
            nav, setNav,
            itemCount, setItemCount,
            // addItem, removeItem,
            toggleItem,
            handleShow,
            handleNav,
            // handleNumAdd, handleNumMinus,
            addSubtotal, subtractSubtotal,
            findItemInGroup,
            
            updateQuantity,
            fetchProducts,
            convertToUSD
        }}>
            {children}
        </AppContext.Provider>
    )
}