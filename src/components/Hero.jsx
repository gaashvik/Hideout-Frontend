/* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars
// import React from 'react'

// const Hero = () => {
//   return ( 
//     <div className='max-w-[1640px] mx-auto px-4 py-8 '>
//         <div className='max-h-[500px]  relative'>
//             {/* Overlay */}
//             <div className='absolute rounded-xl w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
//                 <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>Explore the  <span className='text-primary'>World</span></h1>
//                 <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'> <span className='text-primary'>Without</span> Limits</h1>
//             </div>
//             <img className='w-full rounded-xl max-h-[500px] object-cover' src="https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg" alt="/" />
//         </div>
//     </div>
//   )
// }

// export default Hero

// // // #25A1DA
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image with Blur Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg"
          alt="Travel Destination"
          className="w-full h-full object-cover filter brightness-75"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 " />

      {/* Search and Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Your <span className="text-blue-300">Journey</span> Starts
            <br />
            <span className="text-blue-300">Here</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-blue-100 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Discover incredible destinations and create unforgettable memories
          </motion.p>

          {/* Travel Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white/90 rounded-xl shadow-xl p-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input 
                  type="text" 
                  placeholder="Origin" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input 
                  type="text" 
                  placeholder="Destination" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end">
                <Link to="/trip_details">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                  Search Trips
                </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
          <motion.div 
            className="w-2 h-2 bg-blue-300 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;