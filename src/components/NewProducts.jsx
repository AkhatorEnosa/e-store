import { useMemo } from 'react';
import NewProductsCard from './NewProductsCard';

const NewProducts = ({ products = [] }) => {
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
    <section className='px-8 md:px-16 lg:px-32 z-30 py-20'>
      <div className="w-full flex flex-col">
        <h2 className='text-2xl font-bold uppercase w-fit mt-4 mb-10'>
          New Arrivals
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {displayedProducts.map((item) => (
            <NewProductsCard 
              key={`${item.id}-${item.title}`} 
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;