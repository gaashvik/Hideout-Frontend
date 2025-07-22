import React from 'react';
import { motion } from 'framer-motion';

const HeadlineCards = () => {
  const destinations = [
    {
      title: 'Braj Holi',
      description: 'Incredible holi experience',
      image: 'https://images.pexels.com/photos/2635390/pexels-photo-2635390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tag: 'Cultural Festival'
    },
    {
      title: 'Kashmir',
      description: 'Stunning Views',
      image: 'https://images.pexels.com/photos/2862204/pexels-photo-2862204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tag: 'Mountain Paradise'
    },
    {
      title: 'Goa',
      description: 'Beaches & Beers',
      image: 'https://images.pexels.com/photos/4429333/pexels-photo-4429333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      tag: 'Beach Paradise'
    }
  ];

  return (
    <div className="max-w-full mx-auto px-4 py-16 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Popular Destinations</h2>
        <p className="text-blue-600">Discover our most loved travel experiences</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {destinations.map((dest, index) => (
          <motion.div
            key={dest.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative h-[400px]">
              {/* Background Image */}
              <motion.img
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-100 via-blue-100/50 to-transparent opacity-10 group-hover:opacity-10 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                {/* Tag */}
                <motion.span 
                  className="inline-block bg-blue-500/80 px-3 py-1 rounded-full text-sm mb-4 self-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {dest.tag}
                </motion.span>
                
                {/* Title & Description */}
                <motion.h3 
                  className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {dest.title}
                </motion.h3>
                
                <motion.p
                  className="text-blue-100 group-hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {dest.description}
                </motion.p>

                {/* Explore Button */}
                <motion.button
                  className="mt-4 bg-blue-600/80 hover:bg-blue-500 text-white px-6 py-2 rounded-full transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


export default HeadlineCards;