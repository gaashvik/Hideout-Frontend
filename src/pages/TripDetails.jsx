// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // useNavigate for React Router v6+

// const TripDetails = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     destination: "",
//     startDate: "",
//     endDate: "",
//     adults: 1,
//     children: 0,
//     budget: "",
//     preferences: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/dashboard", { state: formData }); // Navigate with form data
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Plan Your Trip</h2>

//         {/* Destination */}
//         <label className="block text-gray-700 mb-1">Destination</label>
//         <input
//           type="text"
//           name="destination"
//           value={formData.destination}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded text-black"
//           placeholder="City, Country"
//           required
//         />

//         {/* Start Date */}
//         <label className="block text-gray-700 mt-4 mb-1">Start Date</label>
//         <input
//           type="date"
//           name="startDate"
//           value={formData.startDate}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded text-black"
//           required
//         />

//         {/* End Date */}
//         <label className="block text-gray-700 mt-4 mb-1">End Date</label>
//         <input
//           type="date"
//           name="endDate"
//           value={formData.endDate}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded text-black"
//           required
//         />

//         {/* Number of Adults */}
//         <label className="block text-gray-700 mt-4 mb-1">Adults</label>
//         <input
//           type="number"
//           name="adults"
//           value={formData.adults}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded text-black"
//           min="1"
//           required
//         />

//         {/* Number of Children */}
//         <label className="block text-gray-700 mt-4 mb-1">Children</label>
//         <input
//           type="number"
//           name="children"
//           value={formData.children}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded text-black"
//           min="0"
//         />

//         {/* Budget */}
//         <label className="block text-gray-700 mt-4 mb-1">Budget ($)</label>
//         <input
//           type="number"
//           name="budget"
//           value={formData.budget}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded text-black"
//           min="0"
//           placeholder="Enter your budget"
//           required
//         />

//         {/* Preferences */}
//         <label className="block text-gray-700 mt-4 mb-1">Preferences</label>
//         <textarea
//           name="preferences"
//           value={formData.preferences}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded text-black"
//           placeholder="E.g., beach, mountains, adventure, culture"
//         ></textarea>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
//         >
//           Generate Trip Plan
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TripDetails;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Calendar, Wallet, Navigation, Heart, Search, PlaneTakeoff, ArrowRight } from 'lucide-react';
import cityData from"../json_files/cities.json";

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-3xl font-bold ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

// Input Components
const FormInput = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
      {Icon && <Icon className="w-5 h-5 mr-2 text-blue-500" />}
      {label}
    </label>
    <input
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      {...props}
    />
  </div>
);

const FormTextarea = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
      {Icon && <Icon className="w-5 h-5 mr-2 text-blue-500" />}
      {label}
    </label>
    <textarea
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      {...props}
    />
  </div>
);

const FormButton = ({ children, className = '', ...props }) => (
  <button
    className={`px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg font-medium 
    shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-150 flex items-center ${className}`}
    {...props}
  >
    {children}
  </button>
);

const TripDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    budget: "",
    preferences: "",
    coordinates: { lat: 0, lng: 0 },
    // New flight-related fields
    departureAirport: "",
    destinationAirport: "",
    cabinClass: "ECONOMY",
    directFlight: false,
    preferredAirline: "",
    cityCode:0,
  });

  const [airports, setAirports] = useState([]);
  const [departureAirports, setDepartureAirports] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCityCode, setSelectedCityCode] = useState(null);

  // Mock airports data - replace with actual API call
  const mockNearbyAirports = [
    { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York' },
    { code: 'LGA', name: 'LaGuardia Airport', city: 'New York' },
    { code: 'EWR', name: 'Newark Liberty International Airport', city: 'Newark' },
  ];

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            coordinates: { lat: latitude, lng: longitude }
          }));
          // Here you would typically make an API call to get nearby airports
          setDepartureAirports(mockNearbyAirports);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSelectCity = (city) => {
    setQuery(city.Name); // Set input field value
    setFormData((prev) => ({
      ...prev,
      destination: city.Name, // Store city name in destination
      cityCode: city.Code, // Store city code
    }));
    setFilteredCities([]); // Hide dropdown
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    // Filter cities based on user input
    if (value.trim() === "") {
      setFilteredCities([]);
    } else {
      setFilteredCities(
        cityData.CityList.filter((city) =>
          city.Name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard", { state: formData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
          <CardTitle className="text-center">Plan Your Dream Trip</CardTitle>
          <p className="text-center mt-2 text-blue-100">Create your perfect travel itinerary</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="flex items-center text-lg font-medium text-blue-800 mb-4">
                    <PlaneTakeoff className="w-5 h-5 mr-2" />
                    Flight Details
                  </h3>
                  
                  <div className="space-y-4">
                    <FormInput
                      icon={MapPin}
                      label="Departure Airport"
                      name="departureAirport"
                      type="text"
                      value={formData.departureAirport}
                      onChange={handleChange}
                      list="departureAirports"
                      placeholder="Select nearest airport"
                    />
                    <datalist id="departureAirports">
                      {departureAirports.map(airport => (
                        <option key={airport.code} value={airport.code}>
                          {airport.name} - {airport.city}
                        </option>
                      ))}
                    </datalist>

                    <FormInput
                      icon={MapPin}
                      label="Destination Airport"
                      name="destinationAirport"
                      type="text"
                      value={formData.destinationAirport}
                      onChange={handleChange}
                      placeholder="Enter destination airport code"
                    />

                    <div>
                      <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                        <Users className="w-5 h-5 mr-2 text-blue-500" />
                        Cabin Class
                      </label>
                      <select
                        name="cabinClass"
                        value={formData.cabinClass}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="ECONOMY">Economy</option>
                        <option value="PREMIUM_ECONOMY">Premium Economy</option>
                        <option value="BUSINESS">Business</option>
                        <option value="FIRST">First Class</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="directFlight"
                        id="directFlight"
                        checked={formData.directFlight}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="directFlight" className="text-gray-700">
                        Direct flights only
                      </label>
                    </div>
                  </div>
                </div>

                <div className="relative w-full max-w-md mx-auto text-black">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter your destination..."
        className="w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {filteredCities.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCities.map((city) => (
            <li
              key={city.Code}
              onClick={() => handleSelectCity(city)}
              className="p-3 cursor-pointer hover:bg-blue-100 transition flex justify-between"
            >
              <span>{city.Name}</span>
              <span className="text-gray-500 text-sm">({city.Code})</span>
            </li>
          ))}
        </ul>
      )}
      {selectedCityCode && (
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Proceed with {query} ({selectedCityCode})
        </button>
      )}
    </div>
                {/* <div id="map" className="h-64 rounded-lg shadow-md"></div> */}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    icon={Calendar}
                    label="Departure"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  <FormInput
                    icon={Calendar}
                    label="Return"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormInput
                    icon={Users}
                    label="Adults"
                    name="adults"
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={handleChange}
                  />
                  <FormInput
                    icon={Users}
                    label="Children"
                    name="children"
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={handleChange}
                  />
                  <FormInput
                    icon={Users}
                    label="Infants"
                    name="infants"
                    type="number"
                    min="0"
                    value={formData.infants}
                    onChange={handleChange}
                  />
                </div>

                <FormInput
                  icon={Wallet}
                  label="Budget ($)"
                  name="budget"
                  type="number"
                  min="0"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Enter your budget"
                />

                <FormTextarea
                  icon={Heart}
                  label="Travel Preferences"
                  name="preferences"
                  value={formData.preferences}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your dream trip (e.g., beach vibes, mountain adventures, cultural experiences)"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <FormButton type="submit">
                <PlaneTakeoff className="w-5 h-5 mr-2" />
                Generate Trip Plan
              </FormButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripDetails;