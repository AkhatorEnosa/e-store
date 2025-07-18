import { useContext, useMemo } from 'react';
import NewProductsCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import Navigator from '../components/Navigator';
import { ProductSlider } from '../components/ProductSlider';

const NewProducts = () => {
  const { products } = useContext(AppContext);
  // Memoized random starting position calculation
  const { startPos, endPos } = useMemo(() => {
    if (!products.length) return { startPos: 0, endPos: 0 };
    
    const randomNum = Math.floor(Math.random() * products.length);
    const safeStart = Math.max(
      0, 
      randomNum - (randomNum + 6 > products.length ? 6 : 0)
    );
    const safeEnd = Math.min(safeStart + 6, products.length);
    
    return { startPos: safeStart, endPos: safeEnd };
  }, [products]);

  // Early return if no products
  if (!products.length) {
    return (
      <div className='px-8 md:px-16 lg:px-32 py-20'>
        <p>No new arrivals available</p>
      </div>
    );
  }

  // Get the products to display
  const displayedProducts = products.slice(startPos, endPos);

  return (
    <section className='px-4 md:px-16 lg:px-32 z-30 py-10 md:py-20'>
      <div className="w-full flex flex-col">
        <h2 className='md:text-2xl font-bold uppercase w-fit mt-4 mb-10'>
          New Arrivals
        </h2>
        <ProductSlider 
          products={displayedProducts}
        />

        <p className='w-full flex justify-center items-center py-6 text-sm mt-6'>
          <Navigator 
            url={'/products'}
            variants={'flex justify-center items-center gap-1 hover:gap-3 hover:text-accent-700 font-semibold transition-all duration-150'}
          >View More <i className="bi bi-arrow-right text-lg"></i></Navigator>
        </p>
      </div>
    </section>
  );
};

export default NewProducts;