import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Services from './sections/Services';
// import ErrorBoundary from './components/ErrorBoundary';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
// import Hot from './components/Hot';
import MegaSales from './sections/MegaSales';
import NavBar from './sections/NavBar';
import NewProducts from './sections/NewProducts';
import Sections from './sections/Sections';
import { AppContext } from './context/AppContext';
import Cart from './components/Cart';
import Loader from './components/Loader';
import Wishlist from './components/Wishlist';

const Products = lazy(() => import('./pages/Products'));
const Category = lazy(() => import('./pages/Category'));
const Product = lazy(() => import('./pages/Product'));

function App() {
  const { 
    products,
    loading,
    error} = useContext(AppContext)
    
  if(!loading) {
    return (
      <Suspense fallback={<Loader />}>
        <Router>
          <div className="relative h-screen flex flex-col justify-between">
            <div className="navbar-container">
              <NavBar />
            </div>
              
            <Cart/>
            <Wishlist />
            {/* <ErrorBoundary> */}
            { !error ? 
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

                    <NewProducts/>
                    <MegaSales />
                    <Sections 
                      products = {products}
                    />
                    <Services />
                  </>
                } />

                <Route path='/products/:id' element={
                  <Product />
                } />

                <Route path='/products/category/:id' element={
                  <Category />
                } />

                <Route path='/products' element={
                  <Products />
                } />
              </Routes> : 
                <div className="px-9 md:px-16 lg:px-32 py-40">
                  <p>Connect to the Internet and try again.</p>
                </div>
            }
              <Footer />
                {/* </ErrorBoundary> */}
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
