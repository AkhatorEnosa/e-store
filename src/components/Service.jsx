import React from 'react'
import { motion } from 'motion/react'

const Service = ({icon, title, desc, delay}) => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: delay }}
        viewport={{ amount: 0.2 }}
        className="flex flex-col mx-auto font-bold items-center p-7 gap-2 text-center">
        <i className={`bi bi-${icon} text-6xl`}></i>
        {title}
        <p className='font-light text-[10px] md:text-sm mt-2'>{desc}</p>
    </motion.div>
  )
}

export default Service