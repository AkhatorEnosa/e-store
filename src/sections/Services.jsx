import React from 'react';
import Service from '../components/Service';
import { SERVICES } from '../constants/services';

const Services = () => {
  return (
    <div className='w-full md:grid lg:grid-cols-4 md:grid-cols-2 justify-between bg-amber-500/20 p-10 -mt-10'>
      {
        SERVICES.map((service, index) => (
          <Service 
            key={index}
            icon={service.icon}
            title={service.title}
            desc={service.desc}
            delay={index * 0.2}
          />
        ))
      }
    </div>
  );
};

export default Services;
