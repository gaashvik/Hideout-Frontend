// // import React, { useState, useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import { Link } from 'react-router-dom';
// // import axios from 'axios';

// // const Shared = () => {
// //   const { currentUser } = useSelector((state) => state.user);
// //   const [userRecommendations, setUserRecommendations] = useState([]);
// //   const [geoRecommendations, setGeoRecommendations] = useState([]);
// //   const [type, setType] = useState('');
// //   const [recommendations, setRecommendations] = useState([]);
// //   const [coordinates, setCoordinates] = useState(null);
// //   const [maxDistance, setMaxDistance] = useState(5000); // Initial value for maximum distance
// //   const [cart, setCart] = useState([]);
// //   const [cartCount, setCartCount] = useState(0); // Track cart count
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Fetch user recommendations
// //     axios.get(`http://localhost:3000/api/places/user-rec/${currentUser._id}/${currentUser.username}`)
// //       .then(response => {
// //         setUserRecommendations(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching user recommendations:', error);
// //       });
// //   }, [currentUser]);

// //   useEffect(() => {
// //     // Request user's location and fetch geo-based recommendations
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         position => {
// //           const { latitude, longitude } = position.coords;
// //           setCoordinates({ latitude, longitude });

// //           // Fetch georecommendations based on user location and selected max distance
// //           axios.get(`http://localhost:3000/api/places/georec/?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}&userId=${currentUser._id}`)
// //             .then(response => {
// //               setGeoRecommendations(response.data);
// //             })
// //             .catch(error => {
// //               console.error('Error fetching geo recommendations:', error);
// //             });
// //         },
// //         error => {
// //           setError("Unable to retrieve your location. Please enable location services.");
// //         }
// //       );
// //     } else {
// //       setError("Geolocation is not supported by your browser.");
// //     }
// //   }, [maxDistance]); // Re-fetch geo-recommendations when maxDistance changes

// //   useEffect(() => {
// //     // Fetch type-based recommendations
// //     axios.get(`http://localhost:3000/api/places/type-rec/random?userId=${currentUser._id}`)
// //       .then(response => {
// //         setType(response.data.type);
// //         setRecommendations(response.data.recommendations);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching type-based recommendations:', error);
// //       });
// //   }, [currentUser]);

// //   // Load cart from localStorage when the component mounts
// //   useEffect(() => {
// //     const savedCart = JSON.parse(localStorage.getItem('cart'));
// //     if (savedCart) {
// //       setCart(savedCart);
// //       setCartCount(savedCart.length); // Set the cart count from the saved cart
// //     }
// //   }, []);

// //   // Function to handle adding/removing items from the cart
// //   const handleAddToCart = (item) => {
// //     let updatedCart = [...cart];
// //     const itemIndex = updatedCart.findIndex(cartItem => cartItem._id === item._id);

// //     if (itemIndex === -1) {
// //       updatedCart.push(item);
// //        // Add item to cart
// //       alert(`${item.place_name},${item} has been added to your cart!`);
// //     } else {
// //       updatedCart.splice(itemIndex, 1); // Remove item from cart
// //       alert(`${item.place_name} has been removed from your cart!`);
// //     }
  

// //     setCart(updatedCart);
// //     setCartCount(updatedCart.length); // Update cart count dynamically
// //     localStorage.setItem('cart', JSON.stringify(updatedCart)); // Persist cart in localStorage
// //   };
// //   const handleMaxDistanceChange = (event) => {
// //     setMaxDistance(event.target.value);
// //   };

// //   return (
// //     <div className='max-w-[1640px] m-auto px-4 py-12'>
// //       <h1 className='text-primary font-bold text-4xl text-center'>
// //         Top Shared Places/Stories
// //       </h1>

// //       {/* User-based recommendations */}
// //       <div className='mt-8'>
// //         <h2 className='text-primary font-bold text-2xl'>User-based Recommendations</h2>
// //         <div className='grid lg:grid-cols-3 gap-10 pt-4'>
// //           {userRecommendations.map((item) => (
// //             <div key={item._id} className='border shadow-lg rounded-lg hover:scale-105 duration-300'>
// //               <Link to={`/destination/${item._id}`} key={item._id}>
// //               <img
// //                 src={item.filepath}
// //                 alt={item.place_name}
// //                 className='w-full h-[300px] object-cover rounded-t-lg'
// //               />
// //               </Link>.
// //               <div className='flex justify-between px-2 py-4'>
// //                 <p className='font-bold'>{item.place_name}</p>
// //                 <p>
// //                   <span className='bg-primary text-white p-1 rounded-full'>
// //                     {item.likes}
// //                   </span>
// //                 </p>
// //               </div>
// //               <div className='flex justify-between px-4 py-4'>
// //                 <p className='font'>{item.story}</p>
// //               </div>
// //               <div className='flex justify-center py-4'>
// //                 <button
// //                   className={`${
// //                     cart.some(cartItem => cartItem._id === item._id)
// //                       ? 'bg-red-600'
// //                       : 'bg-primary'
// //                   } text-white py-2 px-4 rounded-full`}
// //                   onClick={() => handleAddToCart(item)}
// //                 >
// //                   {cart.some(cartItem => cartItem._id === item._id) ? 'Remove from Cart' : 'Add to Cart'}
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Geo-based recommendations */}
// //       <div className='mt-8'>
// //         <h2 className='text-primary font-bold text-2xl'>Geo-based Recommendations</h2>
// //         <div className='flex items-center mt-4'>
// //           <label htmlFor='maxDistance' className='mr-2'>Max Distance (meters):</label>
// //           <input
// //             type='number'
// //             id='maxDistance'
// //             value={maxDistance}
// //             onChange={handleMaxDistanceChange}
// //             className='border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary'
// //           />
// //         </div>
// //         <div className='grid lg:grid-cols-3 gap-10 pt-4'>
// //           {geoRecommendations.map((item) => (
// //             <div key={item.place_id} className='border shadow-lg rounded-lg hover:scale-105 duration-300'>
// //               <img
// //                 src={item.filepath}
// //                 alt={item.place_name}
// //                 className='w-full h-[300px] object-cover rounded-t-lg'
// //               />
// //               <div className='flex justify-between px-2 py-4'>
// //                 <p className='font-bold'>{item.place_name}</p>
// //                 <p>
// //                   <span className='bg-primary text-white p-1 rounded-full'>
// //                     {item.likes}
// //                   </span>
// //                 </p>
// //               </div>
// //               <div className='flex justify-between px-4 py-4'>
// //                 <p className='font'>{item.story}</p>
// //               </div>
// //               <div className='flex justify-center py-4'>
// //                 <button
// //                   className={`${
// //                     cart.some(cartItem => cartItem._id === item._id)
// //                       ? 'bg-red-600'
// //                       : 'bg-primary'
// //                   } text-white py-2 px-4 rounded-full`}
// //                   onClick={() => handleAddToCart(item)}
// //                 >
// //                   {cart.some(cartItem => cartItem._id === item._id) ? 'Remove from Cart' : 'Add to Cart'}
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Type-based recommendations */}
// //       <div className='mt-8'>
// //         <h2 className='text-primary font-bold text-2xl'>Because you liked {type}</h2>
// //         <div className='grid lg:grid-cols-3 gap-10 pt-4'>
// //           {recommendations.map((item) => (
// //             <div key={item._id} className='border shadow-lg rounded-lg hover:scale-105 duration-300'>
// //               <img
// //                 src={item.filepath}
// //                 alt={item.place_name}
// //                 className='w-full h-[300px] object-cover rounded-t-lg'
// //               />
// //               <div className='flex justify-between px-2 py-4'>
// //                 <p className='font-bold'>{item.place_name}</p>
// //                 <p>
// //                   <span className='bg-primary text-white p-1 rounded-full'>
// //                     {item.likes}
// //                   </span>
// //                 </p>
// //               </div>
// //               <div className='flex justify-between px-4 py-4'>
// //                 <p className='font'>{item.story}</p>
// //               </div>
// //               <div className='flex justify-center py-4'>
// //                 <button
// //                   className={`${
// //                     cart.some(cartItem => cartItem._id === item._id)
// //                       ? 'bg-red-600'
// //                       : 'bg-primary'
// //                   } text-white py-2 px-4 rounded-full`}
// //                   onClick={() => handleAddToCart(item)}
// //                 >
// //                   {cart.some(cartItem => cartItem._id === item._id) ? 'Remove from Cart' : 'Add to Cart'}
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

//       {/* Cart Icon */}
//       // {cartCount > 0 && (
//       //   <Link to="/cart">
//       //     <div className="fixed bottom-4 left-4 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
//       //       <span className="text-lg">{cartCount}</span>
//       //     </div>
//       //   </Link>
//       // )}
// //     </div>
// //   );
// // };

// // export default Shared;


// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// // Memoized RecommendationCard component to avoid unnecessary re-renders

// const Shared = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [userRecommendations, setUserRecommendations] = useState([]);
//   const [geoRecommendations, setGeoRecommendations] = useState([]);
//   const [type, setType] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const[mustvisitrec,setMustVisitRec]=useState([]);
//   const [coordinates, setCoordinates] = useState(null);
//   const [maxDistance, setMaxDistance] = useState(5000); // Initial value for maximum distance
//   const [cart, setCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0); // Track cart count
//   const [error, setError] = useState(null);
//   const [hovered, setHovered] = useState(false);
//   useEffect(() => {
//     // Fetch user recommendations
//     axios.get(`http://localhost:3000/api/places/user-rec/${currentUser._id}/${currentUser.username}`)
//       .then(response => {
//         setUserRecommendations(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user recommendations:', error);
//       });
//   }, [currentUser]);

//   useEffect(() => {
//     // Request user's location and fetch geo-based recommendations
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           setCoordinates({ latitude, longitude });

//           // Fetch georecommendations based on user location and selected max distance
//           axios.get(`http://localhost:3000/api/places/georec/?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}&userId=${currentUser._id}`)
//             .then(response => {
//               setGeoRecommendations(response.data);
//             })
//             .catch(error => {
//               console.error('Error fetching geo recommendations:', error);
//             });
//         },
//         error => {
//           setError("Unable to retrieve your location. Please enable location services.");
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by your browser.");
//     }
//   }, [maxDistance]); // Re-fetch geo-recommendations when maxDistance changes

//   useEffect(() => {
//     // Fetch type-based recommendations
//     axios.get(`http://localhost:3000/api/places/type-rec/random?userId=${currentUser._id}`)
//       .then(response => {
//         setType(response.data.type);
//         setRecommendations(response.data.recommendations);
//       })
//       .catch(error => {
//         console.error('Error fetching type-based recommendations:', error);
//       });
//   }, [currentUser]);
  
//   useEffect(() => {
//     if (coordinates) {
//         console.log(coordinates);
//         axios.get("http://localhost:3000/api/places/must-visit", {
//             params: {
//                 latitude: coordinates.latitude,
//                 longitude: coordinates.longitude
//             }
//         })
//         .then(res => {
//             setMustVisitRec(res.data);
//         })
//         .catch(err => {
//             console.error("Error fetching must-visit places:", err);
//         });
//     }
// }, [coordinates]);


//   // Load cart from localStorage when the component mounts
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart'));
//     if (savedCart) {
//       setCart(savedCart);
//       setCartCount(savedCart.length); // Set the cart count from the saved cart
//     }
//   }, []);
//   // Function to handle adding/removing items from the cart
//   const handleAddToCart = (item) => {
//     let updatedCart = [...cart];
//     const itemIndex = updatedCart.findIndex(cartItem => cartItem._id === item._id);

//     if (itemIndex === -1) {
//       updatedCart.push(item); // Add item to cart
//     } else {
//       updatedCart.splice(itemIndex, 1); // Remove item from cart
//     }

//     setCart(updatedCart);
//     setCartCount(updatedCart.length); // Update cart count dynamically
//     localStorage.setItem('cart', JSON.stringify(updatedCart)); // Persist cart in localStorage
//   };

//   const handleMaxDistanceChange = (event) => {
//     setMaxDistance(event.target.value);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5 }
//     }
//   };

//   const SectionHeader = ({ title, subtitle }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="text-center mb-12"
//     >
//       <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">{title}</h2>
//       {subtitle && <p className="text-blue-600">{subtitle}</p>}
//     </motion.div>
//   );
  
//   const RecommendationCard = React.memo(({ item, index, cart, handleAddToCart }) => {
//     const isInCart = cart.some(cartItem => cartItem._id === item._id);
  
//     return (
//       <motion.div
//         variants={itemVariants}
//         className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
//       >
//         <Link to={`/destination/${item._id}`}>
//           <div className="relative h-[400px]">
//             <img
//               src={item.filepath}
//               alt={item.place_name}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
            
//             <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300">
//                   {item.place_name}
//                 </h3>
//                 <span className="bg-blue-500/80 px-3 py-1 rounded-full text-sm">
//                   {item.likes} Likes
//                 </span>
//               </div>
              
//               <p className="text-blue-100 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
//                 {item.story}
//               </p>
  
//               {/* Buttons */}
//               <div className="flex gap-4 mt-4">
//                 <motion.button
//                   className="bg-blue-600/80 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-all duration-300"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   View Details
//                 </motion.button>
  
//                 <motion.button
//                   className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
//                     isInCart ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
//                   }`}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleAddToCart(item);
//                   }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {isInCart ? 'Remove from Cart' : 'Add to Cart'}
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </Link>
//       </motion.div>
//     );
//   });
//   const RecommendationCardformust = React.memo(({ item, index, cart, handleAddToCart }) => {
//     const isInCart = cart.some(cartItem => cartItem._id === item._id);
//     return (
//       <motion.div
//         variants={itemVariants}
//         className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
//       >
//         <Link to={`/destination/${item._id}`}>
//           <div className="relative h-[400px]">
//             <img
//               src={item.filepath}
//               alt={item.place_name}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
            
//             <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300">
//                   {item.place_name}
//                 </h3>
//               </div>
              
//               <p className="text-blue-100 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
//                 {item.story}
//               </p>
  
//               {/* Buttons */}
//               <div className="flex gap-4 mt-4">
//                 <motion.button
//                   className="bg-blue-600/80 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-all duration-300"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   View Details
//                 </motion.button>
  
//                 <motion.button
//                   className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
//                     isInCart ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
//                   }`}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleAddToCart(item);
//                   }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {isInCart ? 'Remove from Cart' : 'Add to Cart'}
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </Link>
//       </motion.div>
//     );
//   });
//   const RecommendationCardForGeo = React.memo(({ item, index, cart, handleAddToCart }) => {
//     const isInCart = cart.some(cartItem => cartItem._id === item._id);
//     return (
//       <motion.div
//         variants={itemVariants}
//         className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
//       >
//         <Link to={`/destination/${item.place_id}`}>
//           <div className="relative h-[400px]">
//             <img
//               src={item.filepath}
//               alt={item.place_name}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
            
//             <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300">
//                   {item.place_name}
//                 </h3>
//                 <span className="bg-blue-500/80 px-3 py-1 rounded-full text-sm">
//                   {item.likes} Likes
//                 </span>
//               </div>
              
//               <p className="text-blue-100 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
//                 {item.story}
//               </p>
  
//               {/* Buttons */}
//               <div className="flex gap-4 mt-4">
//                 <motion.button
//                   className="bg-blue-600/80 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-all duration-300"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   View Details
//                 </motion.button>
  
//                 <motion.button
//                   className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
//                     isInCart ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
//                   }`}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleAddToCart(item);
//                   }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {isInCart ? 'Remove from Cart' : 'Add to Cart'}
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </Link>
//       </motion.div>
//     );
//   });
//   const clearCart = () => {
//     setCart([]); // Clear the cart
//     setCartCount(0); // Reset the cart count
//     localStorage.setItem('cart', JSON.stringify([])); // Persist the cleared cart in localStorage
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <SectionHeader 
//           title="Discover Your Next Adventure" 
//           subtitle="Personalized recommendations based on your preferences and location"
//         />
  
//         {/* User-based recommendations */}
//         <section className="mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8"
//           >
//             <h2 className="text-2xl font-bold text-blue-800">Places You&apos;ll Love</h2>
//             <p className="text-blue-600">Curated recommendations based on your interests</p>
//           </motion.div>
  
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {userRecommendations.map((item, index) => (
//               <RecommendationCard 
//                 key={item._id} 
//                 item={item} 
//                 index={index} 
//                 cart={cart} 
//                 handleAddToCart={handleAddToCart} 
//               />
//             ))}
//           </motion.div>
//         </section>
  
//         {/* Geo-based recommendations */}
//         <section className="mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8"
//           >
//             <h2 className="text-2xl font-bold text-blue-800">Near You</h2>
//             <p className="text-blue-600">Explore amazing places within your reach</p>
//           </motion.div>
  
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="mb-8 bg-white p-6 rounded-xl shadow-md"
//           >
//             <label className="flex items-center gap-4">
//               <span className="text-blue-800 font-medium">Search radius:</span>
//               <input
//                 type="range"
//                 min="1000"
//                 max="20000"
//                 step="1000"
//                 value={maxDistance}
//                 onChange={(e) => setMaxDistance(e.target.value)}
//                 className="w-64 accent-blue-600"
//               />
//               <span className="text-blue-600 min-w-[100px]">{maxDistance} meters</span>
//             </label>
//           </motion.div>
  
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {geoRecommendations.length ? geoRecommendations.map((item, index) => (
//               <RecommendationCardForGeo 
//                 key={item._id} 
//                 item={item} 
//                 index={index} 
//                 cart={cart} 
//                 handleAddToCart={handleAddToCart} 
//               />
//             )) : <p>No recommendations available.</p>}
//           </motion.div>
//         </section>
  
//         {/* Type-based recommendations */}
//         <section className="mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8"
//           >
//             <h2 className="text-2xl font-bold text-blue-800">Recommendations for {type}</h2>
//             <p className="text-blue-600">Based on your preferences</p>
//           </motion.div>
  
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {recommendations.length ? recommendations.map((item, index) => (
//               <RecommendationCard 
//                 key={item._id} 
//                 item={item} 
//                 index={index} 
//                 cart={cart} 
//                 handleAddToCart={handleAddToCart} 
//               />
//             )) : <p>No recommendations available.</p>}
//           </motion.div>
//         </section>
  
//         {/* Must Visit Recommendations */}
//         <section className="mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-8"
//           >
//             <h2 className="text-2xl font-bold text-blue-800">Must Visit</h2>
//             <p className="text-blue-600">Don't miss these must visit destinations!</p>
//           </motion.div>
  
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {mustvisitrec && mustvisitrec.length ? mustvisitrec.map((item, index) => (
//               <RecommendationCardformust 
//                 key={item._id} 
//                 item={item} 
//                 index={index} 
//                 cart={cart} 
//                 handleAddToCart={handleAddToCart} 
//               />
//             )) : <p>No must visit recommendations available.</p>}
//           </motion.div>
//         </section>
//       </div>
  
//       {/* Cart Section */}
//       <div>
//         {cartCount > 0 && (
//           <div
//             className="fixed bottom-4 left-4 flex items-center gap-4"
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors duration-300 ${hovered ? 'w-56' : 'w-12'}`}
//             >
//               <span className="text-lg">{cartCount}</span>
//             </motion.div>
  
//             {/* Expanded Options */}
//             {hovered && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white shadow-lg p-4 rounded-xl flex flex-col gap-2"
//               >
//                 <Link to="/cart">
//                   <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
//                     Find Optimized Route
//                   </button>
//                 </Link>
//                 <button
//                   onClick={clearCart}
//                   className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
//                 >
//                   Clear Cart
//                 </button>
//               </motion.div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
  
// };

// export default Shared;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const Shared = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [geoRecommendations, setGeoRecommendations] = useState([]);
  const [type, setType] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [mustvisitrec, setMustVisitRec] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [maxDistance, setMaxDistance] = useState(5000);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingGeo, setIsLoadingGeo] = useState(true);
  const [isLoadingType, setIsLoadingType] = useState(true);
  const [isLoadingMustVisit, setIsLoadingMustVisit] = useState(true);
  const createDefaultCartItem = (coords) => ({
    _id: 'current-location',
    coordinates: coords,
    filepath: "https://firebasestorage.googleapis.com/v0/b/hideout-500bd.appspot.com/o/uploads%2Fimage-1713177509958.jfif?alt=media&token=ae0f39ac-5a5d-464f-a4b8-521e648a9ac3",
    place_name: "My Current Location",
    story: "Just the user's current location"
  });

  useEffect(() => {
    setIsLoadingUser(true);
    axios.get(`${backendUrl}/api/places/user-rec/${currentUser._id}/${currentUser.username}`)
      .then(response => {
        setUserRecommendations(response.data);
      })
      .catch(error => {
        console.error('Error fetching user recommendations:', error);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, [currentUser]);

  useEffect(() => {
    setIsLoadingGeo(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const coords = [latitude, longitude];
          setCoordinates({ longitude, latitude });

          const defaultCartItem = createDefaultCartItem(coords);
          const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
          const cartWithoutDefault = savedCart.filter(item => item._id !== 'current-location');
          const updatedCart = [defaultCartItem, ...cartWithoutDefault];
          
          setCart(updatedCart);
          setCartCount(updatedCart.length);
          localStorage.setItem('cart', JSON.stringify(updatedCart));

          axios.get(`${backendUrl}/api/places/georec/?latitude=${latitude}&longitude=${longitude}&maxDistance=${maxDistance}&userId=${currentUser._id}`)
            .then(response => {
              setGeoRecommendations(response.data);
            })
            .catch(error => {
              console.error('Error fetching geo recommendations:', error);
            })
            .finally(() => {
              setIsLoadingGeo(false);
            });
        },
        error => {
          setError("Unable to retrieve your location. Please enable location services.");
          setIsLoadingGeo(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setIsLoadingGeo(false);
    }
  }, [maxDistance]);

  useEffect(() => {
    setIsLoadingType(true);
    axios.get(`${backendUrl}/api/places/type-rec/random?userId=${currentUser._id}`)
      .then(response => {
        setType(response.data.type);
        setRecommendations(response.data.recommendations);
      })
      .catch(error => {
        console.error('Error fetching type-based recommendations:', error);
      })
      .finally(() => {
        setIsLoadingType(false);
      });
  }, [currentUser]);
  
  useEffect(() => {
    if (coordinates) {
      setIsLoadingMustVisit(true);
      axios.get(`${backendUrl}/api/places/must-visit`, {
        params: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        }
      })
      .then(res => {
        setMustVisitRec(res.data);
      })
      .catch(err => {
        console.error("Error fetching must-visit places:", err);
      })
      .finally(() => {
        setIsLoadingMustVisit(false);
      });
    }
  }, [coordinates]);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
      setCartCount(savedCart.length);
    }
  }, []);

  const handleAddToCart = (item) => {
    let updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex(cartItem => cartItem._id === item._id);

    if (itemIndex === -1) {
      updatedCart.push(item);
    } else {
      // Don't remove if it's the current location item
      if (item._id !== 'current-location') {
        updatedCart.splice(itemIndex, 1);
      }
    }

    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const LoadingCard = () => (
    <div className="relative h-[400px] rounded-2xl bg-gray-200 animate-pulse">
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="h-8 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="flex gap-4">
          <div className="h-10 bg-gray-300 rounded-full w-32"></div>
          <div className="h-10 bg-gray-300 rounded-full w-32"></div>
        </div>
      </div>
    </div>
  );

  const LoadingSection = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );

  const handleMaxDistanceChange = (event) => {
    setMaxDistance(event.target.value);
  };

  const SectionHeader = ({ title, subtitle }) => (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">{title}</h2>
      {subtitle && <p className="text-blue-600">{subtitle}</p>}
    </div>
  );
  
  const RecommendationCard = React.memo(({ item, index, cart, handleAddToCart }) => {
    const isInCart = cart.some(cartItem => cartItem._id === item._id);
  
    return (
      <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
        <Link to={`/destination/${item._id}`}>
          <div className="relative h-[400px]">
            <img
              src={item.filepath}
              alt={item.place_name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300">
                  {item.place_name}
                </h3>
                <span className="bg-blue-500/80 px-3 py-1 rounded-full text-sm">
                  {item.likes} Likes
                </span>
              </div>
              
              <p className="text-blue-100 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                {item.story.slice(0,70)+"..."}
              </p>
  
              <div className="flex gap-4 mt-4">
                <button className="bg-blue-600/80 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-all duration-300">
                  View Details
                </button>
  
                <button
                  className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
                    isInCart ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(item);
                  }}
                >
                  {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  const RecommendationCardformust = React.memo(({ item, index, cart, handleAddToCart }) => {
    const isInCart = cart.some(cartItem => cartItem._id === item._id);
    return (
      <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
        <Link to={`/destination/${item._id}`}>
          <div className="relative h-[400px]">
            <img
              src={item.filepath}
              alt={item.place_name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300">
                  {item.place_name}
                </h3>
              </div>
              
              <p className="text-blue-100 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                {item.story.slice(0,70)+"..."}
              </p>
  
              <div className="flex gap-4 mt-4">
                <button className="bg-blue-600/80 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-all duration-300">
                  View Details
                </button>
  
                <button
                  className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
                    isInCart ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(item);
                  }}
                >
                  {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  const RecommendationCardForGeo = React.memo(({ item, index, cart, handleAddToCart }) => {
    const isInCart = cart.some(cartItem => cartItem._id === item._id);
    return (
      <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
        <Link to={`/destination/${item.place_id}`}>
          <div className="relative h-[400px]">
            <img
              src={item.filepath}
              alt={item.place_name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300">
                  {item.place_name}
                </h3>
                <span className="bg-blue-500/80 px-3 py-1 rounded-full text-sm">
                  {item.likes} Likes
                </span>
              </div>
              
              <p className="text-blue-100 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                {item.story.slice(0,70) +"..."}
              </p>
  
              <div className="flex gap-4 mt-4">
                <button className="bg-blue-600/80 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-all duration-300">
                  View Details
                </button>
  
                <button
                  className={`px-6 py-2 rounded-full text-white transition-all duration-300 ${
                    isInCart ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(item);
                  }}
                >
                  {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  const clearCart = () => {
    const defaultItem = cart.find(item => item._id === 'current-location');
    const clearedCart = defaultItem ? [defaultItem] : [];
    setCart(clearedCart);
    setCartCount(clearedCart.length);
    localStorage.setItem('cart', JSON.stringify(clearedCart));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader 
          title="Discover Your Next Adventure" 
          subtitle="Personalized recommendations based on your preferences and location"
        />
  
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800">Places You'll Love</h2>
            <p className="text-blue-600">Curated recommendations based on your interests</p>
          </div>
  
          {isLoadingUser ? (
            <LoadingSection />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userRecommendations.map((item, index) => (
                <RecommendationCard 
                  key={item._id} 
                  item={item} 
                  index={index} 
                  cart={cart} 
                  handleAddToCart={handleAddToCart} 
                />
              ))}
            </div>
          )}
        </section>
  
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800">Near You</h2>
            <p className="text-blue-600">Explore amazing places within your reach</p>
          </div>
  
          <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
            <label className="flex items-center gap-4">
              <span className="text-blue-800 font-medium">Search radius:</span>
              <input
                type="range"
                min="1000"
                max="20000"
                step="1000"
                value={maxDistance}
                onChange={(e) => setMaxDistance(e.target.value)}
                className="w-64 accent-blue-600"
              />
              <span className="text-blue-600 min-w-[100px]">{maxDistance} meters</span>
            </label>
          </div>
  
          {isLoadingGeo ? (
            <LoadingSection />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {geoRecommendations.length ? geoRecommendations.map((item, index) => (
                <RecommendationCardForGeo 
                  key={item._id} 
                  item={item} 
                  index={index} 
                  cart={cart} 
                  handleAddToCart={handleAddToCart} 
                />
              )) : <p>No recommendations available.</p>}
            </div>
          )}
        </section>
  
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800">Recommendations for {type}</h2>
            <p className="text-blue-600">Based on your preferences</p>
          </div>
  
          {isLoadingType ? (
            <LoadingSection />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.length ? recommendations.map((item, index) => (
                <RecommendationCard 
                  key={item._id} 
                  item={item} 
                  index={index} 
                  cart={cart} 
                  handleAddToCart={handleAddToCart} 
                />
              )) : <p>No recommendations available.</p>}
            </div>
          )}
        </section>

        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800">Must Visit</h2>
            <p className="text-blue-600">Don't miss these must visit destinations!</p>
          </div>
  
          {isLoadingMustVisit ? (
            <LoadingSection />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mustvisitrec && mustvisitrec.length ? mustvisitrec.map((item, index) => (
                <RecommendationCardformust 
                  key={item._id} 
                  item={item} 
                  index={index} 
                  cart={cart} 
                  handleAddToCart={handleAddToCart} 
                />
              )) : <p>No must visit recommendations available.</p>}
            </div>
          )}
        </section>
      </div>
  
      <div>
        {cartCount > 0 && (
          <div
            className="fixed bottom-4 left-4 flex items-center gap-4"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className={`bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors duration-300 ${hovered ? 'w-56' : 'w-12'}`}>
              <span className="text-lg">{cartCount}</span>
            </div>
  
            {hovered && (
              <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col gap-2">
                <Link to="/cart">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
                    Find Optimized Route
                  </button>
                </Link>
                <button
                  onClick={clearCart}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shared;