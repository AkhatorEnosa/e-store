import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";


import Shoe from '../assets/shoe.webp';

export const AppContext = createContext();

export function AppProvider({ children }) {


  const body = document.body

  const [products, setProducts] = useState([]);
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

  const [show, setShow] = useState("");
  const [nav, setNav] = useState(false);

  const [cartItemsCount, setCartItemsCount] = useState(cart?.length || 0);
  const [wishlistItemsCount, setWishlistItemsCount] = useState(wishlist?.length || 0);

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
    originalPrice: 109.95,
    quantity: 1
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
        setCart([...cart, item]);
        setCartItemsCount(cartItemsCount+1)
        addSubtotal(item)
      } else {
        const newCart = cart?.filter((cartItem) => cartItem.id !== item.id);
        setCart(newCart);
        setCartItemsCount(cartItemsCount-1)
        subtractSubtotal(item)
      }
    } else if (group === 'wishlist') {
        if (!findItemInGroup(wishlist, item)) { 
          setWishlist([...wishlist, item]);
          setWishlistItemsCount(wishlistItemsCount+1)
        } else {
          const newWishlist = wishlist?.filter((wish) => wish.id !== item.id);
          setWishlist(newWishlist);
          setWishlistItemsCount(wishlistItemsCount - 1)
        }
    }
  }

  // Update quantity of an item
  const updateQuantity = (id, quantity, price) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity, price: price * quantity } : item
      )
    );
  };

  // function shuffleArray(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  //   }
  //   return array;
  // }


  const formulateLinks = (arr) => {
    const categories = [
      {
         url: '/', title: 'home' 
      },
      {
         url: '/contact', title: 'contact' 
      }
    ]
  
    arr.map((x) => {
      const findCategory = categories.find((y) => y.title === x.category)
      const categoryLen = categories.length
      if (!findCategory) {
        categories.splice(categoryLen - 1, 0, {url: `/products/category/${x.category}`, title: x.category})
      }
    })
      return categories
  }

  const lockBodyScroll = (state) => {
    if(state !== "") {
      body.style.height = '100vh'
      body.style.overflowY = 'hidden'
    } else {
      body.style.height = '100vh'
      body.style.overflowY = 'scroll'
    }
  }

  const handleShow = (box) => {
    setShow(box);
    lockBodyScroll(box)
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
            cartItemsCount, setCartItemsCount,
            wishlistItemsCount, setWishlistItemsCount,
            // addItem, removeItem,
            toggleItem,
            handleShow,
            handleNav,
            // handleNumAdd, handleNumMinus,
            addSubtotal, subtractSubtotal,
            findItemInGroup,
            // shuffleArray,
            formulateLinks,
            updateQuantity,
            fetchProducts,
            convertToUSD
        }}>
            {children}
        </AppContext.Provider>
    )
}