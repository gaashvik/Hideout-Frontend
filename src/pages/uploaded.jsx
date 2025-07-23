// import  { useState , useEffect } from 'react'
// import { useSelector } from 'react-redux';

// import axios from 'axios';

// const Uploaded = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [userRecommendations, setUserRecommendations] = useState([]);
//   useEffect(() => {
//     // Axios GET request to fetch top-rated places from the backend
//     axios.get(`http://localhost:3000/api/places/user_uploads/${currentUser._id}`)
//       .then(response => {
//         console.log(response.data);
//         // Update the state with the fetched data
//         setUserRecommendations(response.data);
//       })
//       .catch(error => {
//         // Log any errors that occur during the fetch operation
//         console.error('Error fetching user-uploaded places:', error);
//       });
//   }, []);

//   return (
    
//     <div className='max-w-[1640px] m-auto px-4 py-12'>
//       <h1 className='text-primary font-bold text-4xl text-center'>
//         Your Uploaded Spots
//       </h1>
//         <div className='grid  lg:grid-cols-3 gap-10 pt-10'>
//             {userRecommendations.map((item) => (
//             <div
//                 key={item._id}
//                 className='border shadow-lg rounded-lg hover:scale-105 duration-300'
//             >
//                 <img
//                 src={item.filepath}
//                 alt={item.place_name}
//                 className='w-full h-[300px] object-cover rounded-t-lg'
//                 />
//                 <div className='flex justify-between px-2 py-4'>
//                 <p className='font-bold'>{item.place_name}</p>
//                 <p>
//                     <span className='bg-primary text-white p-1 rounded-full'>
//                     {item.likes}
//                     </span>
//                 </p>
//                 </div>
//                 <div className='flex justify-between px-4 py-4'>
//                 <p className='font'>{item.story}</p>
//                 </div>
//             </div>
//             ))}
//         </div>
//         {/* <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Explore</button> */}
//     </div>
//   )
// }

// export default Uploaded


import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Heart, MapPin, Share2, ThumbsUp, MessageCircle } from 'lucide-react';
import axios from 'axios';
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const Uploaded = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/api/places/user_uploads/${currentUser._id}`)
      .then(response => {
        console.log(response.data);
        setUserRecommendations(response.data);
      })
      .catch(error => {
        console.error('Error fetching user-uploaded places:', error);
      });
  }, []);

  // Card Component
  const PlaceCard = ({ item }) => {
    const isHovered = hoveredId === item._id;

    return (
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setHoveredId(item._id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Image Container */}
        <div className="relative">
          <img
            src={item.filepath}
            alt={item.place_name}
            className="w-full h-[300px] object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          {/* Location Badge */}
          <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">{item.place_name}</span>
          </div>

          {/* Like Counter */}
          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">{item.likes}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.place_name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{item.story}</p>

          {/* Interaction Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">Comment</span>
              </button>
            </div>
            <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="text-center py-16">
      <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Spots Uploaded Yet</h3>
      <p className="text-gray-600">Start sharing your favorite places with the community!</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Uploaded Spots
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore and manage the amazing places you've shared with the community. Your contributions help others discover hidden gems!
          </p>
        </div>

        {/* Grid Layout */}
        {userRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userRecommendations.map((item) => (
              <PlaceCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default Uploaded;