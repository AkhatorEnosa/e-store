import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {


const body = document.body
const [products, setProducts] = useState([]);
// const [product, setProduct] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(true);
const [subtotal, setSubtotal] = useState(0);

// start cart
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);
  const [itemCount, setItemCount] = useState(0);

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

  // add item to cart
  // const addItem = (item) => {
  //   const findItem = cart.find((cartItem) => cartItem.id === item.id);
  //   if (!findItem) { 
  //     setCart([...cart, item]);
  //     setItemCount(itemCount+1)
  //     addSubtotal(item)
  //   }
  // }

  // const removeItem = (item) => {
  //   const findItem = cart.find((cartItem) => cartItem.id === item.id);
  //   if (findItem) {
  //     const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
  //     setCart(newCart);
  //     setItemCount(itemCount-1)
  //     subtractSubtotal(item)
  //   }
  // }

  const toggleItem = (item) => {
    const findItem = cart.find((cartItem) => cartItem.id === item.id);
    if (!findItem) { 
      setCart([...cart, item]);
      setItemCount(itemCount+1)
      addSubtotal(item)
    } else {
      const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
      setCart(newCart);
      setItemCount(itemCount-1)
      subtractSubtotal(item)
    }
  }

  const handleShow = () => {
    setShow(!show);
  }

  const convertToUSD = (x) => {
    const result = x.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    })

    return result
  }


  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      if (response.status === 200) {
        setProducts(response.data);
        // setProduct(response.data[randomNum]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setError(false);
    }
  }



  useEffect(() => {
    fetchProducts()

    if(show) {
      body.style.height = '100vh'
      body.style.overflowY = 'hidden'
    } else {
      body.style.height = '100vh'
      body.style.overflowY = 'scroll'
    }
  }, [])

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
            fetchProducts,
            convertToUSD
        }}>
            {children}
        </AppContext.Provider>
    )
}