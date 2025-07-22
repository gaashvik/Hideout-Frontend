// /* eslint-disable react/prop-types */
// import React from "react";
// import { motion } from "framer-motion";
// import { Cloud, Wind, Droplets, Thermometer, Eye } from "lucide-react";

// const SectionHeader = ({ icon, title }) => (
//   <motion.div
//     className="flex items-center space-x-2 text-2xl font-semibold text-white"
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//   >
//     {icon}
//     <span>{title}</span>
//   </motion.div>
// );

// const WeatherCard = ({ children }) => (
//   <motion.div
//     className="bg-blue-700/90 p-6 rounded-2xl border border-blue-500 shadow-lg hover:shadow-2xl transition duration-300 text-white"
//     whileHover={{ scale: 1.05 }}
//   >
//     {children}
//   </motion.div>
// );

// const WeatherSection = () => {
//   return (
//     <section id="weather" className="p-6 space-y-6">
//       <SectionHeader icon={<Cloud size={28} />} title="Weather Updates" />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Temperature Card */}
//         <WeatherCard>
//           <div className="text-center">
//             <h3 className="text-xl mb-4 font-bold">📍 New York</h3>
//             <motion.div
//               className="text-6xl font-bold mb-4"
//               animate={{ rotate: [0, 5, -5, 0] }}
//               transition={{ repeat: Infinity, duration: 3 }}
//             >
//               32°
//             </motion.div>
//             <p className="opacity-80">☁️ Haze</p>
//           </div>
//         </WeatherCard>

//         {/* Wind Speed */}
//         <WeatherCard>
//           <div className="flex flex-col items-center space-y-4">
//             <Wind size={48} className="text-blue-300" />
//             <div className="text-center">
//               <p className="opacity-80">💨 Wind Speed: 4.63 m/s</p>
//               <p className="opacity-80">🌍 Wind Direction: 50°</p>
//             </div>
//           </div>
//         </WeatherCard>

//         {/* Other Weather Info */}
//         <WeatherCard>
//           <div className="space-y-4">
//             {[
//               { icon: <Droplets size={20} />, label: "Humidity", value: "37%" },
//               {
//                 icon: <Thermometer size={20} />,
//                 label: "Max Temperature",
//                 value: "32°",
//               },
//               {
//                 icon: <Thermometer size={20} />,
//                 label: "Min Temperature",
//                 value: "28°",
//               },
//               {
//                 icon: <Thermometer size={20} />,
//                 label: "Feels like",
//                 value: "30°",
//               },
//               { icon: "🌊", label: "Sea Level", value: "1010 hPa" },
//             ].map(({ icon, label, value }, index) => (
//               <motion.div
//                 key={index}
//                 className="flex justify-between items-center"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <span className="flex items-center gap-2">{icon} {label}</span>
//                 <span className="font-semibold">{value}</span>
//               </motion.div>
//             ))}
//           </div>
//         </WeatherCard>

//         {/* Visibility */}
//         <WeatherCard>
//           <div className="space-y-4">
//             <h3 className="text-xl mb-4 font-bold">🔭 Visibility</h3>
//             <div className="relative pt-4">
//               <div className="w-full h-2 bg-blue-500 rounded-full">
//                 <motion.div
//                   className="h-full bg-blue-400 rounded-full"
//                   initial={{ width: "0%" }}
//                   animate={{ width: "60%" }}
//                   transition={{ duration: 1 }}
//                 />
//               </div>
//               <div className="flex justify-between mt-2 text-gray-300 text-sm">
//                 <span>0 km</span>
//                 <span>10 km</span>
//               </div>
//             </div>
//             <div className="flex items-center justify-center mt-4">
//               <Eye size={24} className="text-blue-300 mr-2" />
//               <span className="font-semibold">6.2 km</span>
//             </div>
//           </div>
//         </WeatherCard>
//       </div>
//     </section>
//   );
// };

// export default WeatherSection;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Wind, Droplets, Thermometer, Eye } from "lucide-react";

// Geocoding API to get latitude and longitude from the destination name
const getCoordinates = async (destination) => {
  const apiKey =import.meta.env.VITE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("Geocoding failed:", data.status);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
};

// Weather API to get weather data using latitude and longitude
const getWeather = async (lat, lng) => {
  const apiKey = import.meta.env.VITE_WHEATHER_API;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Section Header Component
const SectionHeader = ({ icon, title }) => (
  <motion.div
    className="flex items-center space-x-2 text-2xl font-semibold text-white"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {icon}
    <span>{title}</span>
  </motion.div>
);

// Weather Card Component
const WeatherCard = ({ children }) => (
  <motion.div
    className="bg-blue-700/90 p-6 rounded-2xl border border-blue-500 shadow-lg hover:shadow-2xl transition duration-300 text-white"
    whileHover={{ scale: 1.05 }}
  >
    {children}
  </motion.div>
);

const WeatherSection = ({ destination }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  // Fetch weather data when the destination is updated
  useEffect(() => {
    const fetchWeatherData = async () => {
      // Step 1: Get Coordinates from Geocoding API
      const { lat, lng } = await getCoordinates(destination);
      setCoordinates({ lat, lng });

      // Step 2: Get Weather Data from Weather API
      const weather = await getWeather(lat, lng);
      setWeatherData(weather);
    };

    if (destination) {
      fetchWeatherData();
    }
  }, [destination]);

  return (
    <section id="weather" className="p-6 space-y-6">
      <SectionHeader icon={<Cloud size={28} />} className="text-black"  title="Weather Updates" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature Card */}
        {weatherData && (
          <WeatherCard>
            <div className="text-center">
              <h3 className="text-xl mb-4 font-bold">{destination}</h3>
              <motion.div
                className="text-4xl font-bold mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {weatherData.main.temp}°C
              </motion.div>
              <p className="opacity-80">{weatherData.weather[0].description}</p>
            </div>
          </WeatherCard>
        )}

        {/* Wind Speed */}
        {weatherData && (
          <WeatherCard>
            <div className="flex flex-col items-center space-y-4">
              <Wind size={48} className="text-blue-300" />
              <div className="text-center">
                <p className="opacity-80">💨 Wind Speed: {weatherData.wind.speed} m/s</p>
                <p className="opacity-80">🌍 Wind Direction: {weatherData.wind.deg}°</p>
              </div>
            </div>
          </WeatherCard>
        )}

        {/* Other Weather Info */}
        {weatherData && (
          <WeatherCard>
            <div className="space-y-4">
              {[
                { icon: <Droplets size={20} />, label: "Humidity", value: `${weatherData.main.humidity}%` },
                { icon: <Thermometer size={20} />, label: "Max Temperature", value: `${weatherData.main.temp_max}°C` },
                { icon: <Thermometer size={20} />, label: "Min Temperature", value: `${weatherData.main.temp_min}°C` },
                { icon: <Thermometer size={20} />, label: "Feels like", value: `${weatherData.main.feels_like}°C` },
                { icon: "🌊", label: "Sea Level", value: `${weatherData.main.sea_level} hPa` },
              ].map(({ icon, label, value }, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="flex items-center gap-2">{icon} {label}</span>
                  <span className="font-semibold">{value}</span>
                </motion.div>
              ))}
            </div>
          </WeatherCard>
        )}

        {/* Visibility */}
        {weatherData && (
          <WeatherCard>
            <div className="space-y-4">
              <h3 className="text-xl mb-4 font-bold">🔭 Visibility</h3>
              <div className="relative pt-4">
                <div className="w-full h-2 bg-blue-500 rounded-full">
                  <motion.div
                    className="h-full bg-blue-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(weatherData.visibility / 10000) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-gray-300 text-sm">
                  <span>0 km</span>
                  <span>10 km</span>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <Eye size={24} className="text-blue-300 mr-2" />
                <span className="font-semibold">{(weatherData.visibility / 1000).toFixed(1)} km</span>
              </div>
            </div>
          </WeatherCard>
        )}+
      </div>
    </section>
  );
};

export default WeatherSection;
