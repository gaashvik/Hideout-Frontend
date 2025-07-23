import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlaneTakeoff, Clock, Luggage, Calendar, IndianRupee } from "lucide-react";
import { useSelector } from "react-redux";
// import AvailableHotels from "./AvailableHotels";

const AvailableFlights = () => {
  const { currentUser} = useSelector((state) => state.user);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [traceId, setTraceId] = useState(null);
  const [resultIndex, setResultIndex] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const searchFlights = async () => {
    setLoading(true);
    try {
      console.log("🔄 Searching Flights...");
      const response = await fetch(`${backendUrl}/api/flights/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          EndUserIp: "192.168.10.10",
          AdultCount: "1",
          ChildCount: "0",
          InfantCount: "0",
          DirectFlight: "false",
          OneStopFlight: "false",
          JourneyType: "1",
          PreferredAirlines: null,
          Segments: [
            {
              Origin: "GOI",
              Destination: "BOM",
              FlightCabinClass: 1,
              PreferredDepartureTime: "2025-02-15T00:00:00",
            },
          ],
          Sources: null,
        }),
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const data = await response.json();
      const fetchedTraceId = data.Response?.TraceId;
      
      if (!fetchedTraceId) throw new Error("TraceId is missing in response");

      setTraceId(fetchedTraceId);
      setSelectedFlight(data.Response?.Results?.[0]?.[0]);
      setResultIndex(data.Response?.Results?.[0]?.[0]?.ResultIndex);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Other API functions remain the same...

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-sky-400 flex flex-col items-center py-10">
      <h1 className="text-4xl text-white font-bold mb-6">Flight Booking ✈️</h1>

      <button onClick={searchFlights} className="mb-4 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-600 hover:text-white">
        Search Flights 🔍
      </button>

      {loading && <div className="text-white">Loading...</div>}
      {error && <div className="text-red-600 bg-white p-2 rounded">{error}</div>}

      {selectedFlight && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <PlaneTakeoff className="mr-2" />
              <span className="font-bold">{selectedFlight.Segments[0][0].Airline.AirlineName} - {selectedFlight.Segments[0][0].Airline.FlightNumber}</span>
            </div>
            <span className="text-blue-600 font-bold">
              <IndianRupee className="inline mr-1" size={16} />
              {selectedFlight.Fare.PublishedFare}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600">Departure</p>
              <p className="font-bold">{formatDateTime(selectedFlight.Segments[0][0].Origin.DepTime)}</p>
              <p>{selectedFlight.Segments[0][0].Origin.Airport.CityName} ({selectedFlight.Segments[0][0].Origin.Airport.AirportCode})</p>
            </div>
            <div>
              <p className="text-gray-600">Arrival</p>
              <p className="font-bold">{formatDateTime(selectedFlight.Segments[0][0].Destination.ArrTime)}</p>
              <p>{selectedFlight.Segments[0][0].Destination.Airport.CityName} ({selectedFlight.Segments[0][0].Destination.Airport.AirportCode})</p>
            </div>
          </div>

          <div className="border-t border-b py-4 my-4 grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <Clock className="mr-2" size={16} />
              <span>Duration: {formatDuration(selectedFlight.Segments[0][0].Duration)}</span>
            </div>
            <div className="flex items-center">
              <Luggage className="mr-2" size={16} />
              <span>Baggage: {selectedFlight.Segments[0][0].Baggage}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2" size={16} />
              <span>Class: {selectedFlight.Segments[0][0].CabinClass === 2 ? 'Economy' : 'Business'}</span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-bold mb-2">Fare Rules:</h3>
            <div className="grid grid-cols-2 gap-4">
              {selectedFlight.MiniFareRules[0].map((rule, index) => (
                <div key={index} className="text-sm">
                  <p className="font-semibold">{rule.Type}</p>
                  <p>Time: {rule.From}-{rule.To} {rule.Unit}</p>
                  <p>Charges: {rule.Details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button onClick={() => getFareRule()} className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600">
              Fare Rules 📜
            </button>
            <button onClick={() => bookFlight()} className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-800">
              Book Now ✈️
            </button>
            <button onClick={() => getSSR()} className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600">
              Add-ons 🍽
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableFlights;