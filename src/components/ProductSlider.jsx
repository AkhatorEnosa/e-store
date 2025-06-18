import NewProductsCard from './NewProductsCard';

export const ProductSlider = ({ products }) => {
  return (<div className='relative w-full flex px-5 lg:grid-cols-3 gap-2 md:gap-4 overflow-scroll'>
    {/* Marquee Container */}
    <div 
      className='flex w-max animate-marquee hover:animation-paused'
      style={{ '--marquee-duration': `${products.length * 5}s` }}
    >
      {/* Double the products for seamless looping */}
      {[...products, ...products].map((item, index) => (
        <div key={`marquee-${item.id}-${index}`} className='mx-2 md:mx-4'>
          <NewProductsCard item={item} />
        </div>
      ))}
    </div>
  </div>
  );
};