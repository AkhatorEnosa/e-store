// import React, { useState } from 'react';
import { useMemo } from 'react';
import NewProductsCard from './NewProductsCard';

const NewProducts = ({ products, cart }) => {
  const randomNum = useMemo(() => {
    return products?.length ? Math.floor(Math.random() * products.length) : 0;
  }
  , [products]);
  // let position;
  const checkedPos = () => {
    if (!products?.length) return 0;
    const safePosition = Math.max(0, randomNum - (randomNum + 4 > products.length ? 4 : 0));
    return Math.min(safePosition, products.length - 4);
  };

  const startPos = checkedPos();
  const endPos = Math.min(startPos + 4, products.length);

  // console.log(products.length, startPos, endPos, randomNum);
  // console.log(products)

  return (
    <div className='md:px-10 px-10 z-30 py-20'>
      <div className="w-full flex flex-col">
          <h1 className='text-2xl font-bold uppercase border-b-2 border-[#fe4343] w-fit pr-5 mt-4 mb-10 '>New Arrivals</h1>
          <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
            {
            products.map(item => {
              return (
                <NewProductsCard key={`${item.id}-${item.title}`} item={item} cart={cart}/>
              );
            }).slice(startPos, endPos)}
          </div>
      </div>
    </div>
  );
};

export default NewProducts;
