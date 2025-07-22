import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import cityData from "../json_files/cities.json"; // Import JSON directly

const DestinationAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCityCode, setSelectedCityCode] = useState(null); // Store city code
  const navigate = useNavigate(); // Hook for page navigation

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    // Filter cities based on user input (case-insensitive match)
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

  const handleSelectCity = (city) => {
    setQuery(city.Name); // Update input field with selected city
    setSelectedCityCode(city.Code); // Store selected city code
    setFilteredCities([]); // Hide dropdown
  };

  const handleSubmit = () => {
    if (selectedCityCode) {
      navigate(`/next-page?cityCode=${selectedCityCode}`); // Pass city code in URL
    }
  };

  return (
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
  );
};

export default DestinationAutocomplete;
