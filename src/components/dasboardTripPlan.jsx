import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import WeatherSection from "./Weather";
import PlacesSection from "./PlacesSection";
import Hidden from "./Hidden"
import Mood from "./mood"
import Transport from "./transport"
import HotelsSection from "./HotelsSection";
import About from "./dash_trip/About";
import { Activities } from "./dash_trip/activities";
import LocalCuisinesSection from "./dash_trip/LoalC";
import ItinerarySection from "./dash_trip/itnierary";
import FlightsSection from "./FlightSection";
import  Select  from "./selectedPlaces";
import Chatbot from "./chatbot";
import PackingChecklistSection from "./dash_trip/checklist";
const DashboardTripPage = () => {
  const { tripid, currentuser_id } = useParams();
  const [trip, setTrip] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
   const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [aboutPlaces, setAboutPlaces] = useState(null);
    const [activities, setActivities] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [itinerary, setItinerary] = useState([]);
      const [checklist, setChecklist] = useState([
        { item: "Passport & Visa", checked: true },
        { item: "Travel Insurance", checked: false },
        { item: "Sunscreen & Sunglasses", checked: false },
        { item: "Power Bank & Chargers", checked: true },
      ]);
  const toggleSelection = (place) => {
    setSelectedPlaces((prev) =>
      prev.some((p) => p._id === place._id)
        ? prev.filter((p) => p._id !== place._id)
        : [...prev, place]
    );
  };


  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`/api/tripPlan/trips/${tripid}`);
        const tripData = response.data;

        if (
          tripData.user_obj_id === currentuser_id ||
          tripData.collaborators?.some((collab) => collab.userId === currentuser_id)
        ) {
          setIsAuthorized(true);
          setTrip(tripData);
          setActivities(tripData.activities);
          setCuisines(tripData.cuisines);
          setItinerary(tripData.itinerary);
        } else {
          setIsAuthorized(false);
          alert("You do not have access to this trip.");
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
        alert("Failed to fetch trip details.");
      }
    };

    fetchTrip();
  }, [tripid, currentuser_id]);

  if (!isAuthorized) {
    return <div>You do not have access to this trip.</div>;
  }

  if (!trip) {
    return <div>Loading trip details...</div>;
  }

  return (
    <div className="bg-blue-300 min-h-screen text-white p-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-black"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        ✈ Dream Trip Planner 🌍
      </motion.h1>

      {/* Trip Summary */}
      <div className="bg-white text-black p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Trip Summary</h2>
        <div className="flex gap-2 flex-wrap">
          <div className="bg-blue-50 text-blue-800 p-3 rounded-xl">
            <strong>Destination:</strong> {trip.destination || "Not Provided"}
          </div>
          <div className="bg-blue-50 text-blue-800 p-3 rounded-xl">
            <strong>Start Date:</strong> {trip.startDate || "Not Provided"}
          </div>
          <div className="bg-blue-50 text-blue-800 p-3 rounded-xl">
            <strong>End Date:</strong> {trip.endDate || "Not Provided"}
          </div>
          <div className="bg-blue-50 text-blue-800 p-3 rounded-xl">
            <strong>Adults:</strong> {trip.adults || 1}
          </div>
          <div className="bg-blue-50 text-blue-800 p-3 rounded-xl">
            <strong>Children:</strong> {trip.children || 0}
          </div>
          <div className="bg-blue-50 text-blue-800 p-3 rounded-xl">
            <strong>Budget:</strong> ${trip.budget || "Not Provided"}
          </div>
          <div className="bg-blue-50 text-blue-800 p-3 rounded-xl">
            <strong>Preferences:</strong> {trip.preferences || "None"}
          </div>
          <div className="bg-blue-50 text-blue-800 p-3 rounded-xl">
            <strong>Code:</strong> {trip.cityCode || "None"}
          </div>
        </div>
      </div>

      {/* Collaborator Section */}
      <div className="bg-white text-black p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Collaborators</h2>
        <div>
          {trip.collaborators?.length > 0 ? (
            trip.collaborators.map((collab, index) => (
              <div key={index} className="bg-blue-50 text-blue-800 p-3 rounded-xl mb-2">
                {collab.username}
              </div>
            ))
          ) : (
            <p>No collaborators added yet.</p>
          )}
        </div>
      </div>

      {/* Weather Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <About destination={trip.destination} aboutPlaces={trip.about} />
        <WeatherSection destination={trip.destination} startDate={trip.startDate} />
        <Activities destination={trip.destination} activities={activities} setActivities={setActivities} />
        <PlacesSection destination={trip.destination} toggleSelection={toggleSelection} selectedPlaces={selectedPlaces} />
        <HotelsSection budget={trip.budget} startDate={trip.startDate} endDate={trip.endDate} cityCode={trip.cityCode} />
        <FlightsSection destination={trip.destination} startDate={trip.startDate} />
        <ItinerarySection tripDetails={trip} itinerary={itinerary} setItinerary={setItinerary} />
        <LocalCuisinesSection destination={trip.destination} cuisines={cuisines} setCuisines={setCuisines} />
        <PackingChecklistSection tripDetails={trip} checklist={checklist} setChecklist={setChecklist} />
        <Hidden destination={trip.destination} toggleSelection={toggleSelection} selectedPlaces={selectedPlaces} />
        <Transport destination={trip.destination} toggleSelection={toggleSelection} selectedPlaces={selectedPlaces} />
        <Mood destination={trip.destination} toggleSelection={toggleSelection} selectedPlaces={selectedPlaces} />
      </div>
      <Select selectedPlaces={selectedPlaces} setSelectedPlaces={setSelectedPlaces} />

      <Chatbot tripdets={trip} cuisine={cuisines} setCuisines={setCuisines} setChecklist={setChecklist} />
    </div>
  );
};

export default DashboardTripPage;
