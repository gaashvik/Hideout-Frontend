import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import axios from 'axios';
import Hero from '../components/Hero';
import HeadlineCards from './HeadLineCards';
import Feature from './Features';

export default function Home() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const [topRatedPlaces, setTopRatedPlaces] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTopRatedPlaces();
  }, []);

  const fetchTopRatedPlaces = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/places/top-rated-3`);
      // Limit to only 3 places
      setTopRatedPlaces(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching top-rated places:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero />
      <HeadlineCards />

      {/* Top Rated Places Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-blue-800"
          >
            Top Rated Places
          </motion.h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/places">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300">
                <span>View More</span>
                <ArrowRight size={20} />
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {topRatedPlaces.map((item) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to={`/destination/${item._id}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
                  <div className="relative h-[300px] overflow-hidden">
                    <img
                      src={item.filepath}
                      alt={item.place_name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-60" />
                    
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-500/80 text-white px-4 py-2 rounded-full flex items-center gap-2">
                        <Star size={16} />
                        {item.likes}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold  text-blue-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.place_name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-blue-600 mb-4">
                      <MapPin size={16} className="text-blue-300" />
                      <span className="text-blue-500 text-sm">{item.location || 'Location details'}</span>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {item.story}
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-blue-100 text-blue-600 rounded-full font-medium hover:bg-blue-200 transition-colors duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Feature />

      {/* Shared Places Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-blue-800"
          >
            Top Shared Places/Stories
          </motion.h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/shared">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300">
                <span>View More</span>
                <ArrowRight size={20} />
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {topRatedPlaces.slice(0, 3).map((item) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to={`/destination/${item._id}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
                  <div className="relative h-[300px] overflow-hidden">
                    <img
                      src={item.filepath}
                      alt={item.place_name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-60" />
                    
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600/90 text-white px-4 py-2 rounded-full flex items-center gap-2">
                        <Star size={16} />
                        {item.likes}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.place_name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-blue-600 mb-4">
                      <MapPin size={16} />
                      <span className="text-sm">{item.location || 'Location details'}</span>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {item.story}
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-blue-100 text-blue-600 rounded-full font-medium hover:bg-blue-200 transition-colors duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}