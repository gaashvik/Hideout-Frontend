// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// const Pool = () => {
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchRides = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:3000/api/trips');
//         setRides(response.data);
//       } catch (error) {
//         console.error('Error fetching rides:', error);
//         setError('Error fetching rides');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRides();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className='max-w-[1640px] mx-auto px-6 py-10 bg-gradient-to-br from-blue-600 to-indigo-800 text-white min-h-screen'>
//       <h1 className="text-6xl font-extrabold text-center mb-10 tracking-wide drop-shadow-xl">RIDES</h1>
//       <div className='flex justify-center'>
//         <Link to={'/createride'}>
//           <motion.button 
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className='bg-white text-blue-700 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-blue-300 transition-all duration-300'>
//             Create a New Ride
//           </motion.button>
//         </Link>
//       </div>

//       <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12'>
//         {loading ? (
//           <div className='text-center text-lg'>Loading...</div>
//         ) : error ? (
//           <div className='text-center text-lg text-red-500'>{error}</div>
//         ) : (
//           rides.map((item) => (
//             <motion.div 
//               key={item._id} 
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={`p-6 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20 transition-all duration-300 ${item.PassengersLeft === 0 ? 'opacity-50' : ''}`}>
//               <div className='text-xl font-semibold text-center'>{item.Origin} ➝ {item.Destination}</div>
//               <p className='text-sm text-gray-200 text-center mt-2'>Start: {formatDate(item.StartDate)} | End: {formatDate(item.EndDate)}</p>
//               <p className='text-lg text-center mt-2 font-medium'>Leaving at: {item.Time}</p>
//               <p className='text-lg text-center'>Duration: {item.JTime}</p>
//               <p className={`text-center mt-4 font-bold ${item.PassengersLeft === 0 ? 'text-red-400' : 'text-green-400'}`}>
//                 {item.PassengersLeft === 0 ? 'Full - No Seats Available' : `Seats Left: ${item.PassengersLeft}`}
//               </p>
//               {item.PassengersLeft > 0 && (
//                 <div className='flex justify-center mt-4'>
//                   <Link to={`/ride/${item._id}`} className='bg-blue-700 px-5 py-2 rounded-full font-medium hover:bg-blue-500 transition-all duration-300'>
//                     View Ride
//                   </Link>
//                 </div>
//               )}
//             </motion.div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pool;



import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import tripPoolingImage from "./img1.jpeg";

import { FaCar, FaClock, FaUsers, FaMapMarkerAlt, FaRoute, FaStar } from 'react-icons/fa';
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const Pool = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/trips`);
        setRides(response.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
        setError('Error fetching rides');
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-blue-300/10 z-0" />
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium animate-bounce">
                <FaStar className="w-4 h-4 mr-2" />
                Seamless Trip Pooling
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                Share Rides,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 block mt-2">
                  Save & Connect
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Pool your trips effortlessly. Join or create a shared ride and make your journeys cost-effective and fun!
              </p>
              <div className="flex gap-4">
                <Link to="/createride">
                  <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/25">
                    Create a Ride
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative z-10 flex justify-center">
              <motion.img 
                src={tripPoolingImage} 
                alt="Trip Pooling" 
                className="w-[700px] h-auto rounded-xl shadow-lg" 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </main>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Find Your Next Pool Ride</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join a ride and experience cost-effective, comfortable, and community-driven travel.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center text-lg">
                Loading...
              </motion.div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              rides.map((item) => (
                <motion.div key={item._id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`p-6 rounded-xl shadow-lg backdrop-blur-lg bg-white/10 border border-white/20 transition-all duration-300 ${item.PassengersLeft === 0 ? 'opacity-50' : ''}`}>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FaMapMarkerAlt /> {item.Origin} ➝ {item.Destination}
                  </h2>
                  <p className="text-sm opacity-80">Start: {formatDate(item.StartDate)} | End: {formatDate(item.EndDate)}</p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="flex items-center gap-2">
                      <FaClock /> Leaving at: {item.Time}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaUsers /> {item.PassengersLeft === 0 ? 'Full - No Seats Available' : `Seats Left: ${item.PassengersLeft}`}
                    </p>
                  </div>
                  {item.PassengersLeft > 0 && (
                    <Link to={`/ride/${item._id}`} className="mt-4 block bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition-all">
                      View Ride
                    </Link>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pool;