import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {


  const body = document.body

  const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  
  // start cart
  const [cart, setCart] = useState(localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')) : []);
  const [show, setShow] = useState(false);
  const [itemCount, setItemCount] = useState(cart?.length || 0);
  const cartString = useMemo(() => JSON.stringify(cart), [cart]);
  
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

  const findItemInCart = (cart, item) => {
    if(cart === undefined || cart?.length === 0) {
      return false;
    } else {
      return cart?.find((cartItem) => cartItem.id === item.id);
    }
  }

  const toggleItem = (item) => {
    if (!findItemInCart(cart, item)) { 
      setCart([...cart, item]);
      setItemCount(itemCount+1)
      addSubtotal(item)
    } else {
      const newCart = cart?.filter((cartItem) => cartItem.id !== item.id);
      setCart(newCart);
      setItemCount(itemCount-1)
      subtractSubtotal(item)
    }
  }

  const handleShow = () => {
    setShow(!show);

    if(!show) {
      body.style.height = '100vh'
      body.style.overflowY = 'hidden'
      console.log(show)
    } else {
      body.style.height = '100vh'
      body.style.overflowY = 'scroll'
    }
  }

  const convertToUSD = (x) => {
    const result = x?.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    })

    return result
  }


  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      if (response.status === 200) {
        const result = response.data.map(product => ({
          ...product, 
          originalPrice: product.price // Add quantity property with default value of 1
        }))
        // console.log(result);
        setProducts(result);
        setLoading(false);
        setError(false)
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
      setError(false);
    }
  }



  useEffect(() => {
    fetchProducts()
  }, [])


  useEffect(() => {
    try {
      localStorage.setItem('cart', cartString);
    } catch (error) {
      console.error('LocalStorage save failed:', error);
    }
  }, [cartString]);

    return (
        <AppContext.Provider value={{
            products, setProducts,
            loading, setLoading,
            error, setError,
            subtotal, setSubtotal,
            cart, setCart,
            show, setShow,
            itemCount, setItemCount,
            // addItem, removeItem,
            toggleItem,
            handleShow,
            // handleNumAdd, handleNumMinus,
            addSubtotal, subtractSubtotal,
            findItemInCart,
            fetchProducts,
            convertToUSD
        }}>
            {children}
        </AppContext.Provider>
    )
}