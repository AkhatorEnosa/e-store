import SectionsCard from './SectionsCard';
import Navigator from './Navigator';

const Sections = (props) => {
  return (
    <section className='w-full px-4 pb-20'>
      <div className='w-full h-fit grid md:grid-cols-2 grid-cols-1 gap-14 py-20 md:px-16 lg:px-32'>
        <div className="flex flex-col -mb-2 md:p-4 p-2 -pb-5">
          <h1 className='md:text-2xl font-bold uppercase w-fit mt-4 mb-10'>Hot Trend</h1>

          <div className='flex flex-col divide-y-[1px]'>
            {

                props.products.map(x => {
                  return (
                    <SectionsCard 
                      key={x.id} 
                      id={x.id}
                      img={x.image} 
                      title={x.title} 
                      price={x.price}
                    />
                    )
              }).slice(0,3)
            }
          </div>

        </div>

        <div className="flex flex-col -mb-2 md:p-4 p-2 -pb-5">
          <h1 className='md:text-2xl font-bold uppercase w-fit mt-4 mb-10'>Best Sellers</h1>

          <div className='flex flex-col divide-y-[1px]'>
            {

                props.products.map(x => {
                  return (
                    <SectionsCard 
                      key={x.id} 
                      id={x.id}
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

      <div className='w-full flex justify-center items-center pt-3 pb-6 lg:py-6 text-sm'>
          <Navigator 
            url={'/products'}
            variants={'flex justify-center items-center gap-1 hover:gap-3 hover:text-accent-700 font-semibold transition-all duration-150'}
          >Explore More <i className="bi bi-arrow-right text-lg"></i></Navigator>
      </div>
    </section>
  );
};

export default Sections;
