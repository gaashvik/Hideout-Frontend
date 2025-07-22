import React from 'react';

const hotels = [
  {
    name: "ITC Mughal A Luxury Collection Hotel Agra",
    code: "1033645",
    location: "Taj Ganj, Agra, Uttar Pradesh, India",
    rating: "⭐⭐⭐⭐⭐",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    facilities: [
      "Swimming pool", "Free WiFi", "Spa", "Multilingual staff", "Wheelchair-accessible public washroom",
      "Conference space", "Designated smoking areas", "Shopping on-site"
    ],
    attractions: [
      "Taj Mahal (2.1 km)", "Agra Fort (within 5-minute drive)", "Jama Masjid (4.3 km)"
    ],
    phone: "+91 562 402 1700",
    image: "https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLVm2rNwwerpVeG9rHDGZZv9HW6CnJXPhZzSaBFmJnzUTObhUoQgtlTzZNd2mPkXXxM="
  },
  {
    name: "Orient Taj Hotels and Resorts",
    code: "1019099",
    location: "Fatehabad Road, 7th Mile Stone, Agra, Uttar Pradesh, India",
    rating: "⭐⭐⭐⭐½",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    facilities: [
      "Nightclub", "Banquet hall", "Health club", "Full-service spa", "Free WiFi", "Garden", "Babysitting service", 
      "Poolside bar", "Meeting room"
    ],
    attractions: [
      "Taj Mahal (3.8 km)", "Mosque and the Jawab (3.3 km)", "Motilal Nehru Park (4.8 km)"
    ],
    phone: "+91 92583 23825",
    image: "https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLUVo1KUDtCRn6upDCEe1a/iewiGhiRP4yv+9CR3ogaHkZfNMZJ9Cokl6W9oKdZZIGM="
  },
  {
    name: "Tajview - IHCL SeleQtions",
    code: "1033639",
    location: "Agra (Taj Ganj), Uttar Pradesh, India",
    rating: "⭐⭐⭐⭐⭐",
    checkIn: "Not mentioned",
    checkOut: "Not mentioned",
    facilities: [
      "Golfing nearby", "Library", "Steam room", "Spa services", "Free self-parking", "Outdoor seasonal pool",
      "Snack bar/deli", "Archery on-site"
    ],
    attractions: [
      "Taj Mahal (1.8 km)", "Mosque and the Jawab (1.3 km)", "Motilal Nehru Park (2.4 km)"
    ],
    phone: "Not mentioned",
    image: "https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5cnXBPA5qtgzmEk81OdW4gOACJSM44eMnSkPolkbCGAue6iJ66qqX3OpCWH21q+6N/s/xZW8b14IqlWIyFRnidtzTSSIhAmC20="
  }
];

const HotelCard = ({ hotel }) => (
  <div className="transform transition-all hover:scale-105 duration-300 bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-sm">
    <img src={hotel.image} alt={hotel.name} className="w-full h-56 object-cover" />
    <div className="bg-blue-500 text-white p-6">
      <h2 className="text-xl font-bold">{hotel.name}</h2>
      <p className="mt-2">{hotel.location}</p>
      <p className="mt-2 text-sm">Hotel Code: {hotel.code}</p>
    </div>
    <div className="p-6">
      <div className="flex items-center text-yellow-400">
        <span className="mr-1">{hotel.rating}</span>
        <span className="text-gray-500">Rating</span>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Facilities:</h3>
        <ul className="list-disc pl-6 text-sm">
          {hotel.facilities.map((facility, idx) => (
            <li key={idx}>{facility}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Nearby Attractions:</h3>
        <ul className="list-disc pl-6 text-sm">
          {hotel.attractions.map((attraction, idx) => (
            <li key={idx}>{attraction}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-sm">
        <p><strong>Check-in Time:</strong> {hotel.checkIn}</p>
        <p><strong>Check-out Time:</strong> {hotel.checkOut}</p>
        <p><strong>Phone:</strong> {hotel.phone}</p>
      </div>
    </div>
  </div>
);

const HotelPage = () => (
  <div className="bg-blue-50 min-h-screen py-12 px-4">
    <div className="max-w-screen-xl mx-auto space-y-12">
      <h1 className="text-3xl font-semibold text-center text-blue-800">Hotel Listings</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel, idx) => (
          <HotelCard key={idx} hotel={hotel} />
        ))}
      </div>
    </div>
  </div>
);

export default HotelPage;
