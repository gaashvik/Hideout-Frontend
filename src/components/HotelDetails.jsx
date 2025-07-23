import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const HotelDetails = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const hotelCode = queryParams.get("hotelCode");
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!hotelCode) return;

        const fetchHotelDetails = async () => {
            try {
                const response = await axios.post(`${backendUrl}/api/hotels/details`, { hotelCode });
                setHotel(response.data.HotelDetails[0]);
            } catch (err) {
                setError("Failed to load hotel details.");
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [hotelCode]);

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">{hotel?.HotelName}</h1>
            <p className="text-gray-700">{hotel?.Description}</p>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Facilities</h2>
                <ul className="list-disc list-inside">
                    {hotel?.HotelFacilities?.map((facility, index) => (
                        <li key={index} className="text-gray-600">{facility}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Location</h2>
                <p>{hotel?.Address}, {hotel?.CityName}, {hotel?.CountryName}</p>
            </div>
        </div>
    );
};

export default HotelDetails;
