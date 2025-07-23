import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const UserTrips = () => {
  const [trips, setTrips] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTrips = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/tripPlan/trips/user/${currentUser._id}`
        );
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching user trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, [currentUser._id]);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Your Trips
      </h1>
      
      {trips.length === 0 ? (
        <div className="text-center text-gray-600 mt-12">
          <p className="text-xl">No trips found. Start planning your next adventure!</p>
          {/* Add a button to create new trip if needed */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <motion.div
              key={trip._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/dashboard/${trip._id}/${currentUser._id}`}
                className="block transform transition-transform duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Destination Image */}
                  <div className="h-48 bg-blue-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                      {trip.destination}
                    </h2>
                  </div>

                  {/* Trip Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-600">
                        <p>{formatDate(trip.startDate)}</p>
                        <p className="text-xs">to</p>
                        <p>{formatDate(trip.endDate)}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        ${trip.budget.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {trip.adults} Adults
                      </span>
                      {trip.children > 0 && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {trip.children} Children
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">
                          {trip.collaborators.length + 1} Travelers
                        </span>
                      </div>
                      <span className="text-blue-600 hover:text-blue-800">
                        View Trip →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTrips;