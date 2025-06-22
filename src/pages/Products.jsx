import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import NewProductsCard from '../components/NewProductsCard';

const Products = () => {
  const { products } = useContext(AppContext);
  const [sortOption, setSortOption] = useState('newest');
  const [sortedProducts, setSortedProducts] = useState([...products]);

  const sortArrayFn = ( option ) => {
    const freshArr = [...sortedProducts];

    switch(option) {
      case 'newest':
        freshArr.sort((a, b) => new Date(b.id) - new Date(a.id));
        break;
      case 'price-low-high':
        freshArr.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        freshArr.sort((a, b) => b.price - a.price);
        break;
      case 'category':
        freshArr.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        return freshArr.sort((a, b) => new Date(b.id) - new Date(a.id));
    }

    setSortedProducts(freshArr);
  }

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    sortArrayFn(selectedOption);
  }
  // Get the products to display
  // const displayedProducts = shuffleArray(products)
  return (
    <section className='relative px-4 md:px-16 lg:px-32 z-30 py-20'>
      {/* <div className='sticky top-0 flex justify-center items-center bg-accent-100 max-h-screen col-span-1'>
        side bar
      </div>  */}
      <div className="w-full flex flex-col">
        <div className='w-full flex justify-between items-start gap-2 pt-5 md:pt-10'>
          <div>
            <h2 className='font-semibold capitalize w-fit md:text-2xl'> All Products </h2>
            <p className='text-[10px] md:text-xs'>Explore our collection of products</p>
          </div>
        </div>
        <div className='flex justify-between items-center my-6 text-[10px] md:text-xs'>
          <p className=''>Showing {sortedProducts?.length} products</p>
          <div className='flex items-center gap-2'>
            <label htmlFor="filter" title='Filter By' className='text-lg md:text-2xl text-black/70'><i className='bi bi-filter'></i></label>
            <select name="sort" id="" className='border-[1px] border-black/20 rounded-full px-2 py-1 outline-none'
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
        <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4'>
          {sortedProducts.map((item) => (
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