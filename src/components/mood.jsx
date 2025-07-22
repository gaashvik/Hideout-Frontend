import { useState, useEffect } from "react";
import { Map, Pin, Flag, ChevronDown } from "lucide-react";
import { Card } from "../components/Card";
import SectionHeader from "../components/SectionHeader";

const mapsapikey = import.meta.env.VITE_MAPS_API;

const placeTypes = [
  { label: "Restaurant", value: "restaurant" },
  { label: "Cafe", value: "cafe" },
  { label: "Temple", value: "hindu_temple" },
  { label: "Picnic Ground", value: "park" },
  { label: "Amusement Park", value: "amusement_park" },
];

const PlacesSection = ({ destination, toggleSelection, selectedPlaces }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  // Function to geocode the destination and fetch coordinates
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

  // Function to fetch places based on selected type
  const fetchPlaces = async (latitude, longitude, type) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/places/mood?lat=${latitude}&lng=${longitude}&type=${type}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch places");
      }

      const data = await response.json();
      const placesResults = data.places || [];

      const mappedPlaces = placesResults
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);

      setPlaces(mappedPlaces);
    } catch (err) {
      setError(err.message);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  // Geocode the destination when it changes
  useEffect(() => {
    if (destination) {
      geocodeDestination(destination);
    }
  }, [destination]);

  // Fetch places when coordinates & place type are selected
  useEffect(() => {
    if (coordinates && selectedType) {
      fetchPlaces(coordinates.lat, coordinates.lng, selectedType);
    }
  }, [coordinates, selectedType]);

  return (
    <section
      id="places"
      className="space-y-6 rounded-lg p-6 overflow-y-auto bg-white border border-white border-radius-60 text-blue-900"
      style={{ maxHeight: "600px" }}
    >
      <SectionHeader icon={<Map size={24} />} title="Where Do You want to Go next" />

      {/* Dropdown for selecting place type */}
      <div className="flex items-center space-x-4">
        <label className="text-lg font-bold">What are you in the mood for?</label>
        <div className="relative">
          <select
            className="border p-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select a place type</option>
            {placeTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-3 text-gray-600" />
        </div>
      </div>

      {/* Loading and error handling */}
      {loading ? (
        <p className="text-gray-400 text-center">Loading places...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : places.length > 0 ? (
        <div className="flex flex-col gap-4">
          {places.map((place) => {
            const isSelected = selectedPlaces.some((p) => p._id === place._id);

            return (
              <Card
              key={place._id}
              className="p-4 rounded-lg shadow-lg transition-all duration-200 border border-gray-200 bg-blue-300"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
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
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">{place.place_name}</h3>
                <p className="text-gray-700 text-sm">{place.story}</p>
                <div className="text-gray-600 text-sm mt-2">
                  Rating: {place.rating}
                </div>
                {place.location && (
                  <div className="flex items-center text-gray-600 text-sm mt-2">
                    <Pin className="w-4 h-4 mr-2" />
                    <span>{place.location}</span>
                  </div>
                )}

                {/* Add Place Button */}
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
            </Card>);
})}
        </div>
      ) : selectedType ? (
        <p className="text-gray-400 text-center">No places found for this category.</p>
      ) : null}
    </section>
  );
};

export default PlacesSection;
