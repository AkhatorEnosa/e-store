import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import NewProductsCard from '../components/NewProductsCard';
import { Link } from 'react-router-dom';

const Products = () => {
  const { products } = useContext(AppContext);
  // Memoized random starting position calculation
//   const { startPos, endPos } = useMemo(() => {
//     if (!products.length) return { startPos: 0, endPos: 0 };
    
//     const randomNum = Math.floor(Math.random() * products.length);
//     const safeStart = Math.max(
//       0, 
//       randomNum - (randomNum + 6 > products.length ? 6 : 0)
//     );
//     const safeEnd = Math.min(safeStart + 6, products.length);
    
//     return { startPos: safeStart, endPos: safeEnd };
//   }, [products]);

//   // Early return if no products
//   if (!products.length) {
//     return (
//       <div className='px-8 md:px-16 lg:px-32 py-20'>
//         <p>Nothing to show yet</p>
//       </div>
//     );
//   }

  // Get the products to display
//   const displayedProducts = products.slice(startPos, endPos);
  return (
    <section className='px-8 md:px-16 lg:px-32 z-30 py-20'>
      <div className="w-full flex flex-col">
        <h2 className='font-semibold capitalize w-fit mt-10 mb-10'>
          All Products
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
          {products.map((item) => (
            <NewProductsCard 
              key={`${item.id}-${item.title}`} 
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products