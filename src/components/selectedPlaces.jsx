import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SectionHeader from "./SectionHeader";
import { Map, Pin, Navigation, RefreshCw, Trash2 } from "lucide-react";

const gemapiKey = import.meta.env.VITE_GEMINI_API;
const mapsapiKey = import.meta.env.VITE_MAPS_API;

const genAI = new GoogleGenerativeAI(gemapiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function generateRouteText(routeText) {
  try {
    const parts = [
      { text: "You are a travel ITENARY PLANNER that IS provided with ordered location descriptions as input. your job is to guide the user through the ordered location. For each location, you will describe it naturally based on your own knowledge when necessary, augmenting it with the description that is provided for each location. Start immediately with the first location and continue in order. The descriptions are not something the user has experienced but rather shared by others for the world to experience. Do not mention the availability of a description or refer to the user directly. Each description should start in a numbered paragraph, with no preface or heading. Always enrich the information as needed, adding depth and context to make the guide more engaging, as if these locations are being experienced by others who have shared their stories. DRAW FROM YOUR OWN KNOWLEDE WHEN NECESSARY OR IF DESCRIPITION IS NOT RELAVANT OR PRECISE. HANDLE SUCH CASE NATURALLY.IF IT IS A PLACE THAT IS POPULAR DRAW FROM YOUR KNOWLEDE INFO ABOUT IT ,output format should be-:suppose there are only two locations(loca & locb)First start from (loca),(describe the location based on your own knowledge or description if necessary but make sure to use some of your own knowlede without depending on description).\na short (distance from loca to locb) drive aways there is locb.(describe the location based on your own knowledge or description if necessary but make sure to use some of your own knowlede without depending on description). \n(repeat this for as many locations as available in the input)\nconclude your journey by travelling (distance from loca to loc b) to get back to loca.make sure to keep each paragraph no more than 50 words.Each paragraph should be seprated by a single next line character" },
      { text: `input:${routeText}` },
      { text: "output: " },
    ];
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    return result.response.text();
  } catch (error) {
    console.error("Error generating route text:", error);
    return "Unable to generate route insights at the moment.";
  }
}

const Directions = ({ selectedPlaces, setSelectedPlaces }) => {
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [distances, setDistances] = useState([]);
  const [routeText, setRouteText] = useState("");
  const [map, setMap] = useState(null);
  const [cart, setCart] = useState([]);
  const [optimizedCart, setOptimizedCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [showRouteDetails, setShowRouteDetails] = useState(false);

  useEffect(() => {
    const savedCart = selectedPlaces;
    if (savedCart) setCart(savedCart);
    if (!window.google) loadGoogleMapsScript();
    else initMap();
  }, [selectedPlaces]);

  // Rest of the functions remain the same...
  const loadGoogleMapsScript = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsapiKey}&libraries=places`;
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);
  };

  const initMap = () => {
    if (!window.google) return;
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 28.7041, lng: 77.1025 },
    });
    setMap(mapInstance);
    setDirectionsService(new window.google.maps.DirectionsService());
    setDirectionsRenderer(new window.google.maps.DirectionsRenderer({ map: mapInstance }));
  };

  const calculateRoute = async () => {
    if (!cart.length || !directionsService || !directionsRenderer) return;
    setIsLoading(true);

    const origin = cart[0].coordinates;
    const waypoints = cart.slice(1).map((place) => ({
      location: { lat: place.coordinates[0], lng: place.coordinates[1] },
      stopover: true,
    }));

    const request = {
      origin: { lat: origin[0], lng: origin[1] },
      destination: { lat: origin[0], lng: origin[1] },
      waypoints,
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, async (result, status) => {
      setIsLoading(false);
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        const orderedIndices = [0, ...result.routes[0].waypoint_order.map((i) => i + 1)];
        const newOptimizedCart = orderedIndices.map((index) => cart[index]);
        newOptimizedCart.push(cart[0]);
        const newDistances = result.routes[0].legs.map((leg) => leg.distance.text);
        setOptimizedCart(newOptimizedCart);
        setDistances(newDistances);
        setShowRouteDetails(true);

        let routeDescription = "";
        for (let i = 0; i < newOptimizedCart.length - 1; i++) {
          routeDescription += `From ${newOptimizedCart[i].place_name} to ${newOptimizedCart[i + 1].place_name}, Distance: ${newDistances[i]}, Description: ${newOptimizedCart[i].story}\n\n`;
        }
        const generated = await generateRouteText(routeDescription);
        setRouteText(generated);
      } else {
        console.error("Error calculating route:", status);
      }
    });
  };

  const onClear = () => {
    setSelectedPlaces([]);
    setOptimizedCart([]);
    setDistances([]);
    setRouteText("");
    setShowRouteDetails(false);
    if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
    }
    if (markers.length > 0) {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-xl text-black">
      <div className="flex items-center justify-between mb-8">
        <SectionHeader icon={<Navigation size={24} className="text-blue-600" />} title="Journey Planner" />
        <div className="flex gap-4">
          <button
            onClick={calculateRoute}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || selectedPlaces.length === 0}
          >
            <RefreshCw size={18} className={`${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? "Optimizing..." : "Optimize Route"}
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedPlaces.length === 0}
          >
            <Trash2 size={18} />
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md h-[600px] overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Pin size={20} className="text-blue-600" />
            {showRouteDetails ? "Route Details" : "Selected Locations"}
          </h2>
          
          {showRouteDetails ? (
            optimizedCart.length > 0 ? (
              <div className="space-y-4">
                {distances.map((distance, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300">
                    <p className="font-semibold text-blue-600">Step {index + 1}</p>
                    <p className="text-gray-700 mt-2">From: {optimizedCart[index].place_name}</p>
                    <p className="text-gray-700">To: {optimizedCart[index + 1].place_name}</p>
                    <p className="text-gray-900 font-medium mt-2 flex items-center gap-2">
                      <Navigation size={16} className="text-blue-600" />
                      {distance}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                <Map size={48} className="mb-4 text-gray-400" />
                <p>No route information available</p>
              </div>
            )
          ) : selectedPlaces.length > 0 ? (
            <div className="space-y-4">
              {selectedPlaces.map((place) => (
                <div key={place._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="flex">
                    <img
                      src={place.filepath}
                      alt={place.place_name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">{place.place_name}</h2>
                      <p className="text-gray-600 text-sm line-clamp-2">{place.story}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                        {place.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
              <Pin size={48} className="mb-4 text-gray-400" />
              <p>No locations selected</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md h-[600px] overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Travel Insights</h2>
          {routeText ? (
            <div className="space-y-4">
              {routeText
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300"
                  >
                    <p className="font-serif text-gray-800 text-sm leading-relaxed">{line}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
              <Map size={48} className="mb-4 text-gray-400" />
              <p>Route insights will appear here once generated</p>
            </div>
          )}
        </div>

        <div className="rounded-xl overflow-hidden shadow-md">
          <div id="map" className="h-[600px] w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Directions;