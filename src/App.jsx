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
import Cart from './components/modals/Cart';
import Loader from './components/Loader';
import Wishlist from './components/modals/Wishlist';

const Products = lazy(() => import('./pages/Products'));
const Category = lazy(() => import('./pages/Category'));
const Product = lazy(() => import('./pages/Product'));
const Contact = lazy(() => import('./pages/Contact'));
const Search = lazy(() => import('./pages/Search'));
const Checkout = lazy(() => import('./pages/Checkout'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const { 
    products,
    loading,
    error,
    errorMessage,
  } = useContext(AppContext)
    
  if(!loading) {
    return (
      <Suspense fallback={<Loader />}>
        <Router>
          <div className="relative h-screen flex flex-col justify-between">
            <NavBar />
              
            <Cart/>
            <Wishlist />
            {/* <ErrorBoundary> */}
            { !error ? 
              <Routes>
                <Route path="/" element={
                  <>

                    <Hero item={products?.length > 0 && products[products.length - 1]} />
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

                <Route path='/contact-us' element={
                  <Contact />
                } />

                <Route path='/search/:query' element={
                  <Search />
                } />
                
                <Route path='/checkout' element={
                  <Checkout />
                } />

                <Route path="*" element={
                  <NotFound />
                } />
              </Routes> : 
                <div className="w-full h-full flex flex-col justify-center items-center gap-10 px-9 md:px-16 lg:px-32 py-40">
                  <i className="bi bi-cone-striped text-9xl md:text-[300px] animate-bounce"></i>
                  <p className='font-bold text-lg'>{errorMessage}</p>
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
