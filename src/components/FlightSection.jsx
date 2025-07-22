// import { useState } from "react";
// import { PlaneTakeoff, Pin } from "lucide-react";
// import { Card } from "../components/Card";
// import SectionHeader from "../components/SectionHeader";

// const FlightsSection = () => {
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Example search parameters (you can replace these with actual inputs)
//   const defaultSearchParams = {
//     EndUserIp: "192.168.10.10", // Default IP address
//     AdultCount: "1", // Number of adults
//     ChildCount: "0", // Number of children
//     InfantCount: "0", // Number of infants
//     DirectFlight: "false", // Include direct flights
//     OneStopFlight: "false", // Include one-stop flights
//     JourneyType: "1", // Journey type (1 for one-way, 2 for round-trip)
//     PreferredAirlines: null, // Preferred airlines (optional)
//     Segments: [
//       {
//         Origin: "DEL", // Origin airport code
//         Destination: "BOM", // Destination airport code
//         FlightCabinClass: 1, // Cabin class (1 for Economy, 2 for Business)
//         PreferredDepartureTime: "2025-02-15T00:00:00", // Preferred departure time
//       },
//     ],
//     Sources: null, // Sources (optional)
//   };

//   const searchFlights = async (searchParams = defaultSearchParams) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/flights/search", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(searchParams),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch flights");
//       }

//       const data = await response.json();

//       // Check if the response contains valid flight data
//       if (data.Response?.Results) {
//         setFlights(data.Response.Results);
//       } else {
//         throw new Error("No flight data found in the response");
//       }
//     } catch (err) {
//       setError(err.message);
//       setFlights([]); // Clear flights on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section
//       id="flights"
//       className="space-y-6 rounded-lg bg-white text-black p-6"
//     >
//       <SectionHeader
//         icon={<PlaneTakeoff size={24} />}
//         title="Flights"
//         onAdd={() => searchFlights()} // Trigger the flight search
//         addText="Search Flights"
//       />
//       <div className="space-y-4">
//         {loading ? (
//           <p className="text-gray-400 text-center">Loading flights...</p>
//         ) : error ? (
//           <p className="text-red-500 text-center">Error: {error}</p>
//         ) : flights.length > 0 ? (
//           flights.map((flight, index) => (
//             <Card key={index}>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-semibold">
//                     {flight.AirlineName || "Unknown Airline"}
//                   </h3>
//                   <span className="text-gray-400">
//                     {flight.DepartureTime || "N/A"}
//                   </span>
//                 </div>
//                 <p className="text-gray-400">
//                   Flight Number: {flight.FlightNumber || "N/A"}
//                 </p>
//                 {flight.Origin && flight.Destination && (
//                   <div className="flex items-center text-gray-400">
//                     <Pin className="w-4 h-4 mr-2" />
//                     <span>
//                       {flight.Origin} → {flight.Destination}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </Card>
//           ))
//         ) : (
//           <p className="text-gray-400 text-center">
//             No flights found. Click &quot;Search Flights&quot; to search.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FlightsSection;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlaneTakeoff, Pin } from "lucide-react";
import { Card } from "../components/Card";
import SectionHeader from "../components/SectionHeader";

const FlightsSection = ({destination, departureAirport, destinationAirport, startDate}) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 🚀 Use navigate for page redirection

  const searchFlights = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/flights/search", {
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
              Origin: departureAirport,
              Destination: destinationAirport,
              FlightCabinClass: 1,
              PreferredDepartureTime: "2025-02-15T00:00:00",
            },
          ],
          Sources: null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();
      if (data.Response?.Results?.length > 0) {
        let flatResults = data.Response.Results.flat(2);
        flatResults.sort((a, b) => (a.Fare?.PublishedFare || 0) - (b.Fare?.PublishedFare || 0));
        setFlights(flatResults.slice(0, 5));
      } else {
        throw new Error("No flight data found in the response");
      }
    } catch (err) {
      setError(err.message);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-blue-700 space-y-6 rounded-lg border border-gray-700/50 p-6 shadow-lg ">
      <SectionHeader
        icon={<PlaneTakeoff size={24} />}
        title="Flights"
        onAdd={searchFlights}
        addText="Search Flights"
      />

      <button
        onClick={() => navigate("/available-flights")}
        className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition"
      >
        Available Flights ✈️
      </button>

      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-400 text-center">Loading flights...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : flights.length > 0 ? (
          flights.map((flight, index) => {
            const segment = flight.Segments?.[0]?.[0];
            const airline = segment?.Airline || {};
            const origin = segment?.Origin?.Airport || {};
            const destination = segment?.Destination?.Airport || {};
            const departureTime = segment?.Origin?.DepTime
              ? new Date(segment.Origin.DepTime).toLocaleString()
              : "N/A";
            const arrivalTime = segment?.Destination?.ArrTime
              ? new Date(segment.Destination.ArrTime).toLocaleString()
              : "N/A";

            return (
              <Card key={index} className="bg-white shadow-lg rounded-lg p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-blue-800">
                      {airline.AirlineName || "Unknown Airline"}
                    </h3>
                    <span className="text-gray-600">
                      {origin.AirportCode || "N/A"} → {destination.AirportCode || "N/A"}
                    </span>
                  </div>
                  <p className="text-gray-500">
                    <strong>Flight Number:</strong> {airline.FlightNumber || "N/A"}
                  </p>
                  <p className="text-gray-500">
                    <strong>Cabin Class:</strong> {segment?.CabinClass || "N/A"}
                  </p>
                  <p className="text-gray-500">
                    <strong>Price:</strong> {flight.Fare?.PublishedFare ? `${flight.Fare.PublishedFare} INR` : "N/A"}
                  </p>
                </div>
              </Card>
            );
          })
        ) : (
          <p className="text-gray-400 text-center">No flights found.</p>
        )}
      </div>
    </section>
  );
};

export default FlightsSection;
