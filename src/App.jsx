import React, { useContext } from 'react';
import './App.css';
import Benefits from './components/Benefits';
// import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Hero from './components/Hero';
// import Hot from './components/Hot';
import MegaSales from './components/MegaSales';
import NavBar from './components/NavBar';
import NewProducts from './components/NewProducts';
import Sections from './components/Sections';


import Shoe from './assets/shoe.png'
import { AppContext } from './context/AppContext';
import Cart from './components/Cart';

function App() {
  const { 
    products,
    loading,
    error,
    subtotal,
    show,
    itemCount,
    handleShow} = useContext(AppContext)

  const headerProduct = {
    id: 26,
    category: "men's clothing",
    description: "Legendary Air gets lifted First lifestyle Air Max brings you styke, comfort and 270 degrees of Air. Its tinted Air winddow lets you showcase one of our greatest innovations.",
    image: Shoe,
    price: 109.95,
    rating: {rate: 3.9, count: 120},
    title: "Nike Air Max 270",
    quantity: 1,
  };
  //cart

  if(!loading && !error) {
    return (
      <div className="h-screen flex flex-col justify-between">
        <NavBar handleShow={handleShow} itemCount={itemCount}/>
        {/* <ErrorBoundary> */}
          <Hero 
            item={headerProduct}
          />
          {/* <Hot 
            price={product.price}
            description={product.description}
            title={product.title}
            // discountPercentage={product.discountPercentage}
            image={product.image}
            loading={loading}
            error={error}
            
            product={products}
            category={product.category}
          /> */}

          <NewProducts 
            products = {products}
            />
          <MegaSales />
          <Sections 
              products = {products}
              />
          <Benefits />
          <Footer />
            {/* </ErrorBoundary> */}
          <Cart
              show={show}
              handleShow={handleShow}
              subtotal={subtotal}
              // item={cart.map(x => Object.keys(x))}
            />
      </div>
    );
  } else {
    return (
      <div className="h-screen bg-[#fe4343]">
        <div className="w-full h-full flex flex-col justify-center items-center align-middle">
          <div className="p-10 rounded-full bg-black animate-bounce"></div>
          <p className='self-center'>Loading</p>
        </div>
      </div>
    )
  }
}

export default App;
