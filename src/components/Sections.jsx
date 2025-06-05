// import Bag from '../assets/bag.jpg';
import { Link } from 'react-router-dom';
import SectionsCard from './SectionsCard';

const Sections = (props) => {
  return (
    <section className='w-full px-8 pb-20'>
      <div className='w-full h-fit grid md:grid-cols-2 grid-cols-1 gap-14 py-20 px-8 md:px-16 lg:px-32'>
        <div className="flex flex-col mx-2 -mb-2 md:p-4 p-2 -pb-5">
          <h1 className='uppercase w-fit text-2xl mb-4 lg:mb-10 font-bold'>Hot Trend</h1>

          <div className='flex flex-col divide-y-[1px]'>
            {

                props.products.map(x => {
                  return (
                    <SectionsCard 
                      key={x.id} 
                      img={x.image} 
                      title={x.title} 
                      price={x.price}
                    />
                    )
              }).slice(0,3)
            }
          </div>

        </div>

        <div className="flex flex-col mx-2 -mb-2 md:p-4 p-2 -pb-5">
          <h1 className='uppercase w-fit text-2xl mb-4 lg:mb-10 font-bold'>Best Sellers</h1>

          <div className='flex flex-col divide-y-[1px]'>
            {

                props.products.map(x => {
                  return (
                    <SectionsCard 
                      key={x.id} 
                      img={x.image} 
                      title={x.title} 
                      price={x.price}
                    />
                    )
              }).reverse().slice(0,3)
            }
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center items-center py-6 text-sm'>
        <Link to="/products" className='flex justify-center items-center gap-1 hover:gap-3 hover:text-accent-700 font-semibold transition-all duration-150'>Explore More <i className="bi bi-arrow-right text-lg"></i></Link>
      </div>
    </section>
  );
};

export default Sections;
