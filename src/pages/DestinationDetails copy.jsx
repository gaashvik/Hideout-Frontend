/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Heart, Eye, CheckCircle, Star } from 'lucide-react';
import { User, MapPin, Clock } from 'lucide-react';
const apikey = import.meta.env.VITE_MAPS_API;
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const DestinationDetails = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRecommendations, setUserRecommendations] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: '',
    review_title: '',
    review_description: '',
  });
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios.get(`${backendUrl}/api/places/getplace/${id}`)
      .then(response => {
        setUserRecommendations(response.data[0]);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    axios.get(`${backendUrl}/api/likes/${id}`)
      .then(response => {
        setLikeCount(response.data.count);
      })
      .catch(error => console.error('Error fetching like count:', error));
  }, [id]);

  useEffect(() => {
    if (!mapLoaded && userRecommendations) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apikey}&libraries=places`;
      script.onload = () => {
        setMapLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [userRecommendations, mapLoaded]);

  useEffect(() => {
    if (mapLoaded && userRecommendations) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: userRecommendations.coordinates[0], lng: userRecommendations.coordinates[1] },
        zoom: 12,
      });

      new window.google.maps.Marker({
        position: { lat: userRecommendations.coordinates[0], lng: userRecommendations.coordinates[1] },
        map,
        title: userRecommendations.place_name,
      });
    }
  }, [userRecommendations, mapLoaded]);

  useEffect(() => {
    axios.get(`${backendUrl}/api/places/reviews/${id}`)
      .then(response => setReviews(response.data.reviews))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  useEffect(() => {
    if (currentUser) {
      axios.get(`${backendUrl}/api/likes/${id}/${currentUser._id}`)
        .then(response => {
          setIsLiked(response.data.liked);
        })
        .catch(error => console.error('Error checking like status:', error));
    }
  }, [id, currentUser]);

  const handleLike = () => {
    if (!currentUser) {
      alert('You need to be logged in to like this place.');
      return;
    }

    if (isLiked) {
      axios.delete(`${backendUrl}/api/likes/${id}/${currentUser._id}`)
        .then(() => {
          setIsLiked(false);
          return axios.get(`${backendUrl}/api/likes/${id}`);
        })
        .then(response => {
          setLikeCount(response.data.count);
        })
        .catch(error => console.error('Error unliking the place:', error));
    } else {
      axios.post(`${backendUrl}/api/likes`, {
        place_obj_id: id,
        user_obj_id: currentUser._id,
      })
        .then(() => {
          setIsLiked(true);
          return axios.get(`${backendUrl}/api/likes/${id}`);
        })
        .then(response => {
          setLikeCount(response.data.count);
        })
        .catch(error => console.error('Error liking the place:', error));
    }
  };

  const handleVisitBut = (e) => {
    e.preventDefault();
    axios.post(`${backendUrl}/api/places/addtovisited/${id}`, {
      user_obj_id: currentUser._id,
    })
      .then(response => {
        alert(response.data.msg);
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Error occurred while adding place to visited places.');
      });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('You need to be logged in to add a review.');
      return;
    }
    axios.post(`${backendUrl}/api/places/addrev`, {
      ...newReview,
      place_obj_id: id,
      user_obj_id: currentUser._id,
    })
      .then(response => {
        setReviews([response.data.review, ...reviews]);
        setNewReview({ rating: '', review_title: '', review_description: '' });
      })
      .catch(error => console.error('Error adding review:', error));
  };

  const capitalizeFirstLetter = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return <div className="text-center text-lg font-bold text-gray-800">Loading...</div>;
  }

  if (error || !userRecommendations) {
    return <div className="text-center text-lg font-bold text-red-500">Error fetching data.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500 text-xl font-semibold">Error fetching data.</div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <img 
              src={userRecommendations.filepath} 
              alt={userRecommendations.place_name} 
              className="w-full h-[60vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-5xl font-bold mb-4">{capitalizeFirstLetter(userRecommendations.place_name)}</h1>
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{userRecommendations.location || 'Location'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>By {userRecommendations.username}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Story Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">The Story</h2>
                <p className="text-gray-600 text-lg leading-relaxed italic">&quot;{userRecommendations.story}&quot;</p>
              </div>

              {/* Map Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Location</h2>
                <div id="map" className="h-[400px] rounded-xl"></div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold">Reviews</h2>
                  <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full">
                    {reviews.length} Reviews
                  </span>
                </div>

                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold text-gray-800">{review.review_title}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, index) => (
                            <Star 
                              key={index}
                              size={18}
                              className={`${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill={index < review.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{review.review_description}</p>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock size={16} />
                        <span className="text-sm">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Stats Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-blue-50">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <span className="block text-2xl font-bold text-gray-800">100K</span>
                    <span className="text-sm text-gray-500">Views</span>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-red-50">
                    <Heart 
                      className={`w-6 h-6 mx-auto mb-2 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                      onClick={handleLike}
                    />
                    <span className="block text-2xl font-bold text-gray-800">{likeCount}</span>
                    <span className="text-sm text-gray-500">Likes</span>
                  </div>
                  <div 
                    className="text-center p-4 rounded-xl bg-green-50 cursor-pointer hover:bg-green-100 transition-all"
                    onClick={handleVisitBut}
                  >
                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <span className="block text-2xl font-bold text-gray-800">✓</span>
                    <span className="text-sm text-gray-500">Mark as Visited</span>
                  </div>
                </div>
              </div>

              {/* Add Review Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Share Your Experience</h3>
                <form onSubmit={handleAddReview} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: rating })}
                          className={`p-2 rounded-lg ${
                            newReview.rating >= rating ? 'bg-yellow-400 text-white' : 'bg-gray-100'
                          }`}
                        >
                          <Star size={20} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="review_title"
                      value={newReview.review_title}
                      onChange={handleReviewChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Give your review a title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="review_description"
                      value={newReview.review_description}
                      onChange={handleReviewChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Share your experience..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium transition-all transform hover:scale-[1.02]"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDetails;