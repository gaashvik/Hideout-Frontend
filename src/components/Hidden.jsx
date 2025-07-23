import { useState, useEffect } from "react";
import { Map, Heart, Landmark } from "lucide-react";
import { Card } from "../components/Card";
import SectionHeader from "../components/SectionHeader";

const mapsapikey = import.meta.env.VITE_MAPS_API;
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const PlacesSection = ({ destination, toggleSelection, selectedPlaces }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const geocodeDestination = async (destination) => {
    try {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${mapsapikey}`
      );
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.status === "OK") {
        const { lat, lng } = geocodeData.results[0].geometry.location;
        setCoordinates({ lat, lng });
      } else {
        throw new Error("Failed to geocode destination");
      }
    } catch (err) {
      setError("Error geocoding destination");
    }
  };

  const fetchPlaces = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${backendUrl}/api/places/georec?latitude=${latitude}&longitude=${longitude}&maxDistance=10000`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch places");
      }
      const placesResults = await response.json();
      setPlaces(placesResults.slice(0, 10));
    } catch (err) {
      setError(err.message);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destination) {
      geocodeDestination(destination);
    }
  }, [destination]);

  useEffect(() => {
    if (coordinates) {
      fetchPlaces(coordinates.lat, coordinates.lng);
    }
  }, [coordinates]);

  return (
    <section
      id="places"
      className="space-y-6 rounded-lg p-6 overflow-y-auto bg-white border border-gray-200 shadow-md text-blue-900"
      style={{ maxHeight: "600px" }}
    >
      <SectionHeader icon={<Map size={24} />} title="Hideout Locations"  />
      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="text-gray-400 text-center">Loading places...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : places.length > 0 ? (
          places.map((place) => {
            const isSelected = selectedPlaces.some((p) => p._id === place._id);

            return (
              <Card
                key={place._id}
                className="flex items-start p-4 bg-blue-200 rounded-xl shadow-lg border border-gray-300 transition-all hover:shadow-xl"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={place.filepath}
                    alt={place.place_name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src =
                        "https://firebasestorage.googleapis.com/v0/b/hideout-500bd.appspot.com/o/1738364820413OIP%20(1).jfif?alt=media&token=78317e96-974a-4b45-aaaf-1a896f5ef0b9")
                    }
                  />
                </div>
                <div className="ml-4 flex flex-col justify-between w-full">
                  <h3 className="text-lg font-bold text-gray-900">{place.place_name}</h3>
                  <p className="text-gray-700 text-sm">{place.story.slice(0,70)+"..."}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <Landmark className="text-blue-500" size={18} />
                      <span className="text-blue-600 text-sm">{place.type || "Unknown Type"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="text-red-500" size={18} />
                      <span className="text-gray-700 text-sm">{place.likes || 0} Likes</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSelection(place)}
                    className={`mt-3 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                      isSelected
                        ? "bg-green-500 text-white cursor-default"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {isSelected ? "Added" : "Add Place"}
                  </button>
                </div>
              </Card>
            );
          })
        ) : (
          <p className="text-gray-400 text-center">No places found. Click + to add places.</p>
        )}
      </div>
    </section>
  );
};

export default PlacesSection;
