import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import NewProductsCard from './NewProductsCard'

const Wishlist = () => {
    const { wishlist, show, handleShow } = useContext(AppContext)
    const wishLength = wishlist?.length || 0;
  return (
    <div className={`w-screen h-screen ${show === 'wishlist' ? "flex" : "hidden"} flex-col justify-center items-center bg-black/50 fixed z-[100]`}>
        <div className='w-[95%] lg:w-[80%] h-fit bg-white/95 shadow-lg  rounded-[1rem] flex flex-col justify-between items-center p-2 py-4 md:p-6'>
            <div className='w-full flex justify-between items-center mb-4 px-2'>
                <h2 className='w-fit md:w-full tracking-tighter px-2 text-center text-xl md:text-3xl font-semibold'>You have {wishLength} wish{wishLength > 1 && "es"}</h2>
                <div onClick={()=>handleShow('')} className="flex justify-center items-center rounded-full bg-white size-10 cursor-pointer">
                    <i className={`bi bi-x-lg hover:text-accent-600 text-lg transition-all duration-150`}></i>
                </div>
            </div>
            <div className={`w-full h-full ${wishlist?.length > 0 && "flex flex-col gap-2 md:gap-6 overflow-scroll" }`}>
                {
                    wishlist?.length > 0 ? 
                        <>
                            <div className='col-span-3 w-full h-fit lg:h-full grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 md:p-4 rounded-lg overflow-y-scroll'>
                                {/* Cart items will be displayed here */}
                                {
                                        wishlist.map((x) => (
                                            // console.log(item)
                                            <NewProductsCard 
                                              key={x?.id}  // Add this unique key
                                              item={x}
                                            />
                                          ))
                                }
                            </div>
                        </> 
                        
                            :

                        <div className='flex flex-col justify-center items-center h-full gap-6 text-inherit/50'>
                            <i className="bi bi-heart-fill text-9xl"></i>
                            <p>Your do not have any wish</p>
                        </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Wishlist