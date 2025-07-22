

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { UserPlus, Map, Compass, Camera, Globe, Plane, Hotel, CalendarDays, Utensils, Bus, Heart } from 'lucide-react';
import { About } from "./About";
import WeatherSection from "./Weather";
import { Activities } from "./Activities";
import PlacesSection from "./PlacesSection";
import HotelsSection from "./HotelsSection";
import FlightsSection from "./FlightSection";
import ItinerarySection from "./Itenirary";
import LocalCuisinesSection from "./Cuisines";
import PackingChecklist from "./Packing";
import BestTimeToVisitSection from "./BestTime";
import Hidden from "./Hidden";
import Transport from "./transport";
import Mood from "./mood";
import Chatbot from "./chatbot";
import Select from "./selectedPlaces";
import axios from "axios";
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const tripDetails = location.state || {};
  const [hotel, setHotel] = useState([]);
  const [flights, setFlights] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [aboutPlaces, setAboutPlaces] = useState(null);
  const [activities, setActivities] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [collaboratorUsername, setCollaboratorUsername] = useState("");
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

  const addCollaborator = async () => {
    if (!collaboratorUsername.trim()) return;

    try {
      // Make an API call to fetch the user's _id
      const response = await axios.post("/api/tripPlan/check-user", { username: collaboratorUsername });

      if (response.data.userId) {
        // Add the collaborator to the state
        setCollaborators((prev) => [
          ...prev,
          { userId: response.data.userId, username: collaboratorUsername },
        ]);
        setCollaboratorUsername(""); // Clear the input field
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error adding collaborator:", error);
      alert("Failed to add collaborator");
    }
  };
  const confirmTrip = async () => {
    const tripData = {
      destination: tripDetails.destination,
      startDate: tripDetails.startDate,
      endDate: tripDetails.endDate,
      adults: tripDetails.adults,
      children: tripDetails.children,
      budget: tripDetails.budget,
      preferences: tripDetails.preferences,
      cityCode: tripDetails.cityCode,
      user_obj_id: currentUser._id, // Add the current user's _id
      collaborators,
      about: aboutPlaces,
      activities,
      cuisines,
      itinerary,
      packingList: [], // Add packing list if needed
      notes: "", // Add notes if needed
    };

    try {
      const response = await axios.post("/api/tripPlan/trips", tripData);
      if (response.data) {
        alert("Trip created successfully!");
        // Navigate to /dashboard/:tripid/:currentuser_id
        navigate(`/dashboard/${response.data._id}/${currentUser._id}`);
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Failed to create trip");
    }
  };


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

      <motion.section 
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-blue-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="text-blue-600 w-6 h-6" />
                <h2 className="text-3xl font-bold text-blue-900">
                  {tripDetails.destination}
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-600">
                    <CalendarDays className="w-4 h-4" />
                    <p className="text-sm font-medium">Travel Dates</p>
                  </div>
                  <p className="text-gray-800 font-medium">{tripDetails.startDate} - {tripDetails.endDate}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-600">
                    <UserPlus className="w-4 h-4" />
                    <p className="text-sm font-medium">Travelers</p>
                  </div>
                  <p className="text-gray-800 font-medium">{tripDetails.adults} Adults, {tripDetails.children} Children</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Camera className="w-4 h-4" />
                    <p className="text-sm font-medium">Budget</p>
                  </div>
                  <p className="text-gray-800 font-medium">${tripDetails.budget}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {collaborators.map((collab, index) => (
                <div key={index} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                  {collab.username[0].toUpperCase()}
                </div>
              ))}
              <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 border border-blue-200">
                <input
                  type="text"
                  value={collaboratorUsername}
                  onChange={(e) => setCollaboratorUsername(e.target.value)}
                  placeholder="Add travel companion"
                  className="w-48 bg-transparent text-sm border-none focus:ring-0 placeholder-blue-400"
                  onKeyPress={(e) => e.key === 'Enter' && addCollaborator()}
                />
                <UserPlus 
                  className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors" 
                  onClick={addCollaborator}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
        <button
          onClick={confirmTrip}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
        >
          Confirm Trip
        </button>
      </div>
        </motion.section>


      {/* Sections with selectable places */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <About destination={tripDetails.destination} aboutPlaces={aboutPlaces} setAboutPlaces={setAboutPlaces} />
  <WeatherSection destination={tripDetails.destination} startDate={tripDetails.startDate} />
  <Activities destination={tripDetails.destination} preferences={tripDetails.preferences} activities={activities} setActivities={setActivities} />
  <HotelsSection budget={tripDetails.budget} startDate={tripDetails.startDate} endDate={tripDetails.endDate} cityCode={tripDetails.cityCode} className="lg:col-span-2 md:col-span-2 col-span-1" />
  <FlightsSection destination={tripDetails.destination} departureAirport={tripDetails.departureAirport} destinationAirport={tripDetails.destinationAirport} startDate={tripDetails.startDate} />
  <ItinerarySection tripDetails={tripDetails} itinerary={itinerary} setItinerary={setItinerary} />
  <LocalCuisinesSection destination={tripDetails.destination} cuisines={cuisines} setCuisines={setCuisines} />
  <PackingChecklist tripDetails={tripDetails} checklist={checklist} setChecklist={setChecklist} />
  <PlacesSection destination={tripDetails.destination} toggleSelection={toggleSelection} selectedPlaces={selectedPlaces}/>
  <Hidden destination={tripDetails.destination} toggleSelection={toggleSelection} selectedPlaces={selectedPlaces} />
  <Transport destination={tripDetails.destination} toggleSelection={toggleSelection} selectedPlaces={selectedPlaces} />
  <Mood destination={tripDetails.destination} toggleSelection={toggleSelection} selectedPlaces={selectedPlaces} />
</div>
<br/>


      <Select selectedPlaces={selectedPlaces} setSelectedPlaces={setSelectedPlaces} />

      <Chatbot tripdets={tripDetails} cuisine={cuisines} setCuisines={setCuisines} setChecklist={setChecklist} />
    </div>
  );
};

export default Dashboard;