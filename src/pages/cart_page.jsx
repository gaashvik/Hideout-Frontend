import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from "react";
import { Navigation2, Calendar, MapPin } from "lucide-react";

const gemapiKey = import.meta.env.VITE_GEMINI_API;
const mapsapiKey = import.meta.env.VITE_MAPS_API;
const genAI = new GoogleGenerativeAI(gemapiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function generateRouteText(routeText) {
  const parts = [
    { text: "You are a travel ITENARY PLANNER that IS provided with ordered location descriptions as input. your job is to guide the user through the ordered location. For each location, you will describe it naturally based on your own knowledge when necessary, augmenting it with the description that is provided for each location. Start immediately with the first location and continue in order. The descriptions are not something the user has experienced but rather shared by others for the world to experience. Do not mention the availability of a description or refer to the user directly. Each description should start in a numbered paragraph, with no preface or heading. Always enrich the information as needed, adding depth and context to make the guide more engaging, as if these locations are being experienced by others who have shared their stories. DRAW FROM YOUR OWN KNOWLEDE WHEN NECESSARY OR IF DESCRIPITION IS NOT RELAVANT OR PRECISE. HANDLE SUCH CASE NATURALLY.IF IT IS A PLACE THAT IS POPULAR DRAW FROM YOUR KNOWLEDE INFO ABOUT IT ,output format should be-:suppose there are only two locations(loca & locb)First start from (loca),(describe the location based on your own knowledge or description if necessary but make sure to use some of your own knowlede without depending on description).\na short (distance from loca to locb) drive aways there is locb.(describe the location based on your own knowledge or description if necessary but make sure to use some of your own knowlede without depending on description). \n(repeat this for as many locations as available in the input)\nconclude your journey by travelling (distance from loca to loc b) to get back to loca." },
    { text: `input:${routeText}` },
    { text: "output: " },
  ];
  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });
  return result.response.text();
}

const LocationCard = ({ place, distance, isLast }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden flex gap-4 hover:shadow-lg transition-shadow duration-300">
    <img src={place.filepath} alt={place.place_name} className="w-32 h-32 object-cover" />
    <div className="flex-1 p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{place.place_name}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {place.type}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{place.story}</p>
      {!isLast && (
        <div className="mt-2 flex items-center gap-1 text-blue-600 text-sm">
          <Navigation2 size={14} />
          <span>{distance}</span>
        </div>
      )}
    </div>
  </div>
);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [optimizedCart, setOptimizedCart] = useState([]);
  const [distances, setDistances] = useState([]);
  const [routeText, setRouteText] = useState("");
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
    if (!window.google) loadGoogleMapsScript();
    else initMap();
  }, []);

  useEffect(() => {
    if (cart.length > 0 && directionsService && directionsRenderer) {
      calculateRoute();
    }
  }, [cart, directionsService, directionsRenderer]);

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
      center: { lat: 28.7041, lng: 77.1025 }
    });
    
    const rendererOptions = {
      map: mapInstance,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: "#4A90E2",
        strokeWeight: 4
      }
    };

    setMap(mapInstance);
    setDirectionsService(new window.google.maps.DirectionsService());
    setDirectionsRenderer(new window.google.maps.DirectionsRenderer(rendererOptions));
  };

  const calculateRoute = async () => {
    setLoading(true);
    if (!cart.length) return;
    
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
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        const orderedIndices = [0, ...result.routes[0].waypoint_order.map((i) => i + 1)];
        const newOptimizedCart = orderedIndices.map((index) => cart[index]);
        newOptimizedCart.push(cart[0]);
        const newDistances = result.routes[0].legs.map((leg) => leg.distance.text);
        setOptimizedCart(newOptimizedCart);
        setDistances(newDistances);
        
        let routeDescription = "";
        for (let i = 0; i < newOptimizedCart.length - 1; i++) {
          routeDescription += `From ${newOptimizedCart[i].place_name} to ${newOptimizedCart[i + 1].place_name}, Distance: ${newDistances[i]}, Description: ${newOptimizedCart[i].story}\n\n`;
        }
        const generated = await generateRouteText(routeDescription);
        setRouteText(generated);
      }
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Journey Plan</h1>
        
        <div className="flex gap-6 h-[calc(100vh-120px)]">
          {/* Left Section - Map */}
          <div className="w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div id="map" className="w-full h-full"></div>
          </div>

          {/* Right Section - Route Details */}
          <div className="w-1/2 flex flex-col gap-6">
            {loading ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 h-full">
                {/* Location Cards */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 overflow-auto">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="text-blue-500" />
                    Destinations
                  </h2>
                  <div className="space-y-4">
                    {optimizedCart.map((place, index) => (
                      <LocationCard 
                        key={place._id} 
                        place={place} 
                        distance={distances[index]}
                        isLast={index === optimizedCart.length - 1}
                      />
                    ))}
                  </div>
                </div>

                {/* Route Insights */}
                {routeText && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 overflow-auto">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="text-blue-500" />
                      Route Insights
                    </h2>
                    <div className="prose prose-sm max-w-none">
                      <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">
                        {routeText}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;