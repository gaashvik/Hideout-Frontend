// // HotelsSection.jsx
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const HotelsSection = ({ startDate, endDate, cityCode }) => {
//   const [bookedHotels, setBookedHotels] = useState([]);

//   useEffect(() => {
//     const fetchBookedHotels = () => {
//       const hotelBookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
//       const hotels = JSON.parse(localStorage.getItem('bookedHotels') || '{}');

//       const bookedHotelsList = hotelBookings.map(booking => {
//         const hotelData = hotels[booking.hotelCode] || {};
//         const hotelImage = hotelData.HotelImages && hotelData.HotelImages.length > 0
//           ? hotelData.HotelImages[0].url
//           : '';

//         return {
//           hotelName: hotelData.HotelName || 'Hotel',
//           bookingDate: new Date(booking.bookingDate).toLocaleDateString(),
//           hotelCode: booking.hotelCode,
//           title: booking.title || '',
//           firstName: booking.firstName || '',
//           lastName: booking.lastName || '',
//           email: booking.email || '',
//           phone: booking.phone || '',
//           rooms: booking.rooms || '',
//           addressuser: booking.addressuser || '',
//           image: hotelImage,
//         };
//       });

//       setBookedHotels(bookedHotelsList);
//     };

//     fetchBookedHotels();
//     window.addEventListener('storage', fetchBookedHotels);

//     return () => {
//       window.removeEventListener('storage', fetchBookedHotels);
//     };
//   }, []);

//   const clearBookings = () => {
//     localStorage.removeItem('hotelBookings');
//     localStorage.removeItem('bookedHotels');
//     setBookedHotels([]); // Clear state as well
//   };

//   return (
//     <section className="p-8 bg-gradient-to-b from-blue-50 to-white text-center">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-blue-700 mb-6">Find the Best Hotels</h2>

//         {bookedHotels.length > 0 && (
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Booked Hotels</h3>
//             <div className="flex flex-wrap justify-center gap-4 mb-8">
//               {bookedHotels.map((hotel, index) => (
//                 <div key={index} className="bg-white px-6 py-3 rounded-lg shadow-md text-blue-600 font-medium flex items-center gap-4">
//                   <div>
//                     <p>{hotel.hotelName} - Booked on {hotel.bookingDate}</p>
//                     {hotel.title && ` by ${hotel.title} ${hotel.firstName} ${hotel.lastName}`}
//                     {hotel.email && ` (${hotel.email})`}
//                     {hotel.phone && ` - ${hotel.phone}`}
//                     {hotel.rooms && ` - ${hotel.rooms} rooms`}
//                     {hotel.addressuser && ` - ${hotel.addressuser}`}
//                   </div>
//                   {hotel.image && (
//                     <img
//                       src={hotel.image}
//                       alt={hotel.hotelName}
//                       className="w-16 h-16 rounded-lg object-cover max-w-full h-auto"
//                       onError={(e) => e.target.style.display = 'none'} // Hide broken images
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
//           Discover the best accommodations for your stay with just one click.
//         </p>
//         <div className="flex justify-center gap-4">
//           <Link to={`/hotels?startDate=${startDate}&endDate=${endDate}&cityCode=${cityCode}`}>
//             <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/25">
//               View Available Hotels
//             </button>
//           </Link>
//         </div>
//         <button
//           onClick={clearBookings}
//           className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all mt-2"
//         >
//           Clear Bookings
//         </button>
//       </div>
//     </section>
//   );
// };

// export default HotelsSection;
// HotelsSection.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotelsSection = ({ startDate, endDate, cityCode }) => {
  const [bookedHotels, setBookedHotels] = useState([]);

  // Hardcoded image URLs for slider
  const sliderImages = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
  ];

  useEffect(() => {
    const fetchBookedHotels = () => {
      const hotelBookings = JSON.parse(localStorage.getItem("hotelBookings") || "[]");
      const hotels = JSON.parse(localStorage.getItem("bookedHotels") || "{}");

      const bookedHotelsList = hotelBookings.map((booking) => {
        const hotelData = hotels[booking.hotelCode] || {};
        return {
          hotelName: hotelData.HotelName || "Hotel",
          bookingDate: new Date(booking.bookingDate).toLocaleDateString(),
          hotelCode: booking.hotelCode,
          title: booking.title || "",
          firstName: booking.firstName || "",
          lastName: booking.lastName || "",
          email: booking.email || "",
          phone: booking.phone || "",
          rooms: booking.rooms || "",
          addressuser: booking.addressuser || "",
          image: hotelData.HotelImages?.[0]?.url || "/images/default-hotel.jpg",
        };
      });

      setBookedHotels(bookedHotelsList);
    };

    fetchBookedHotels();
    window.addEventListener("storage", fetchBookedHotels);
    return () => window.removeEventListener("storage", fetchBookedHotels);
  }, []);

  const clearBookings = () => {
    localStorage.removeItem("hotelBookings");
    localStorage.removeItem("bookedHotels");
    setBookedHotels([]);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="p-8 bg-blue-700  text-center col-span-2 rounded" style={{maxHeight:'900px'}}>
      <div className="container mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-white mb-6">Find the Best Hotels</h2>

        {/* Image Slider */}
        <div className="max-w-4xl mx-auto mb-8">
          <Slider {...sliderSettings}>
            {sliderImages.map((img, index) => (
              <div key={index} className="px-2">
                <img src={img} alt={`Hotel ${index + 1}`} className="rounded-2xl shadow-lg w-full h-64 object-cover" />
              </div>
            ))}
          </Slider>
        </div>

       {/* Booked Hotels Section */}
{bookedHotels.length > 0 && (
  <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Your Booked Hotels</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
      {bookedHotels.map((hotel, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          {/* <img
            src={hotel.image}
            alt={hotel.hotelName}
            className="w-full h-40 rounded-lg object-cover mb-4"
            onError={(e) => (e.target.style.display = 'none')}
          /> */}
          <h4 className="text-lg font-bold text-blue-700">{hotel.hotelName}</h4>
          <p className="text-gray-600">Booked on: {hotel.bookingDate}</p>
          {hotel.rooms && <p className="text-gray-500">{hotel.rooms} rooms</p>}
          {hotel.addressuser && <p className="text-gray-500">Address: {hotel.addressuser}</p>}
          {hotel.phone && <p className="text-gray-500">📞 {hotel.phone}</p>}
        </div>
      ))}
    </div>
  </div>
)}


        {/* Buttons */}
        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-6">
          Discover the best accommodations for your stay with just one click.
        </p>
        <div className="flex justify-center gap-4">
          <Link to={`/hotels?startDate=${startDate}&endDate=${endDate}&cityCode=${cityCode}`}>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/25">
              View Available Hotels
            </button>
          </Link>
          <button
            onClick={clearBookings}
            className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all"
          >
            Clear Bookings
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;


// import { Link } from "react-router-dom";

// const HotelsSection = ({ startDate, endDate, cityCode }) => {
//   return (
//     <section className="p-8 bg-gradient-to-b from-blue-50 to-white text-center">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-blue-700 mb-6">Find the Best Hotels</h2>
//         <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
//           Discover the best accommodations for your stay with just one click.
//         </p>
//         <div className="flex justify-center gap-4">
//         <Link to={`/hotels?startDate=${startDate}&endDate=${endDate}&cityCode=${cityCode}`}>
//             <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/25">
//               View Available Hotels
//             </button>
//           </Link>
//           {/* <Link to="/hotels">
//             <button className="px-8 py-4 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-gray-500/25">
//               Go to Hotels Section
//             </button>
//           </Link> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HotelsSection;
