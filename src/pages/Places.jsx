import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Map, Filter, Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import axios from 'axios';

const Places = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [topRatedPlaces, setTopRatedPlaces] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRating, setSelectedRating] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTopRatedPlaces();
  }, []);

  const fetchTopRatedPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/places/top-rated');
      setTopRatedPlaces(response.data);
      setAllPlaces(response.data);
    } catch (error) {
      console.error('Error fetching top-rated places:', error);
    }
  };

  const filterTypes = [
    { name: 'All', icon: '🌍' },
    { name: 'Nature', icon: '🏞️' },
    { name: 'Chill', icon: '🏖️' },
    { name: 'Vibezz', icon: '🏛️' },
    { name: 'Hidden Gem', icon: '🌆' },
    { name: 'Must See', icon: '🌍' },
    { name: 'Famous', icon: '🏞️' }
  ];

  const filterType = (category) => {
    setSelectedType(category);
    if (category === 'All') {
      setTopRatedPlaces(allPlaces);
    } else {
      const filteredPlaces = allPlaces.filter((item) => item.type === category);
      setTopRatedPlaces(filteredPlaces);
    }
  };

  const filterRating = (rating) => {
    setSelectedRating(rating);
    if (!rating) {
      fetchTopRatedPlaces();
    } else {
      const filteredPlaces = topRatedPlaces.filter((item) => item.rating === rating);
      setTopRatedPlaces(filteredPlaces);
    }
  };

  const PlaceCard = ({ item }) => {
    const isHovered = hoveredId === item._id;

    return (
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setHoveredId(item._id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <Link to={`/destination/${item._id}`}>
          <div className="relative">
            <img
              src={item.filepath}
              alt={item.place_name}
              className="w-full h-[300px] object-cover transition-transform duration-300"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">{item.place_name}</span>
            </div>

            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">{item.likes}</span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.place_name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{item.story}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <Heart className="w-5 h-5" />
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
        </Link>
      </div>
    );
  };

  const EmptyState = () => (
    <div className="text-center py-16">
      <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Places Found</h3>
      <p className="text-gray-600">Try adjusting your filters to find more places</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Places
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked collection of stunning destinations worldwide
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              <Filter size={20} />
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {filterTypes.map((type) => (
                <button
                  key={type.name}
                  onClick={() => filterType(type.name)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2
                    ${selectedType === type.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <span>{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Places Grid */}
        {topRatedPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRatedPlaces.map((item) => (
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

export default Places;