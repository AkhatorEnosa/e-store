import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
import { AppContext } from './context/AppContext';
import Cart from './components/Cart';
import Loader from './components/Loader';
// import Product from './pages/Product';
const Product = lazy(() => import('./pages/Product'));

function App() {
  const { 
    products,
    loading,
    error,
    subtotal,
    show,
    itemCount,
    handleShow} = useContext(AppContext)
    
  if(!loading && !error) {
    return (
      <Suspense fallback={<Loader />}>
        <Router>
          <div className="h-screen flex flex-col justify-between">
            <NavBar handleShow={handleShow} itemCount={itemCount}/>
            {/* <ErrorBoundary> */}
            <Routes>
              <Route path="/" element={
                <>
                  <Hero item={products?.length > 0 && products[products.length - 1]} />
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
                </>
              } />

              <Route path='/:id' element={
                <Product />
              } />
            </Routes>
              <Footer />
                {/* </ErrorBoundary> */}
              <Cart
                  show={show}
                  handleShow={handleShow}
                  subtotal={subtotal}
                  // item={cart.map(x => Object.keys(x))}
                />
          </div>
        </Router>
      </Suspense>
    );
  } else {
    return (
      <Loader />
    )
  }
}

export default App;
