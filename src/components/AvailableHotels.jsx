
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaStar, FaClock, FaCreditCard, FaUser, FaEnvelope } from "react-icons/fa";

const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-blue-900/50 backdrop-blur-md flex items-center justify-center">
      <div className="relative w-full max-w-lg bg-white border border-blue-400 shadow-xl rounded-lg p-6">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-full bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 focus:outline-none"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = "" }) => (
  <div className={`relative text-blue-900 ${className}`}>{children}</div>
);

const DialogHeader = ({ children }) => (
  <div className="flex flex-col space-y-2 text-center sm:text-left mb-4 text-blue-800">
    {children}
  </div>
);

const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-blue-900">{children}</h3>
);

const DialogFooter = ({ children }) => (
  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
    {children}
  </div>
);

const Input = ({ className = "", value, onChange, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-blue-300 bg-white px-3 py-2 text-sm text-blue-900 placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 shadow-sm ${className}`}
    value={value}
    onChange={onChange}
    {...props}
  />
);

const Label = ({ className = "", ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-900 ${className}`}
    {...props}
  />
);

const Button = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
    outline: "border border-blue-300 bg-white text-blue-600 hover:bg-blue-100 shadow-sm"
  };

  return (
    <button
      className={`px-4 py-2 rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Alert = ({ children, className = "" }) => (
  <div
    className={`relative w-full rounded-lg border p-4 bg-blue-50 border-blue-300 text-blue-900 ${className}`}
  >
    {children}
  </div>
);

const AlertDescription = ({ children, className = "" }) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`}>
    {children}
  </div>
);


// Main Component
const AvailableHotels = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const cityCode = queryParams.get("cityCode");
  
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hotelDetailsMap, setHotelDetailsMap] = useState({});
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    rooms: 1,
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const savedHotels = localStorage.getItem('bookedHotels');
    if (savedHotels) {
      const parsedHotels = JSON.parse(savedHotels);
      setHotelDetailsMap(prevMap => ({
        ...prevMap,
        ...parsedHotels
      }));
    }

    if (!startDate || !endDate || !cityCode) {
      setError("Missing required parameters.");
      return;
    }

    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);

        const requestBody = {
          CheckIn: startDate,
          CheckOut: endDate,
          cCode: cityCode,
          GuestNationality: "IN",
          PaxRooms: [{ Adults: 1, Children: 1, ChildrenAges: [5] }],
          ResponseTime: "20",
          IsDetailedResponse: "false",
          Refundable: "true",
          NoOfRooms: "5",
          MealType: "All",
        };

        const response = await fetch("https://hideoutapp-fwcagyb3fkh9gha0.centralindia-01.azurewebsites.net/api/hotels/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) throw new Error("Failed to fetch hotel data");
        const data = await response.json();

        if (data?.HotelResult?.length) {
          setHotels(data.HotelResult);
          data.HotelResult.forEach(hotel => fetchHotelDetails(hotel.HotelCode));
        } else {
          throw new Error("No hotels found in response");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [startDate, endDate, cityCode]);

  const fetchHotelDetails = async (hotelCode) => {
    try {
      const response = await fetch("https://hideoutapp-fwcagyb3fkh9gha0.centralindia-01.azurewebsites.net/api/hotels/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hotelCode }),
      });

      if (!response.ok) throw new Error("Failed to fetch hotel details");
      const data = await response.json();

      if (data?.HotelDetails?.length > 0) {
        setHotelDetailsMap(prev => ({
          ...prev,
          [hotelCode]: data.HotelDetails[0]
        }));
      }
    } catch (error) {
      console.error(`Error fetching details for hotel ${hotelCode}:`, error);
    }
  };
  const handleBookingSubmit = async (hotelCode, bookingCode) => {
    try {
      // Validate form
      if (!bookingDetails.firstName || !bookingDetails.lastName || !bookingDetails.email || 
          !bookingDetails.phone) {
        throw new Error("Please fill in all required fields");
      }
  
      // Store booking details in localStorage
      const bookingData = {
        ...bookingDetails,
        hotelCode,
        bookingCode,
        bookingDate: new Date().toISOString(),
        startDate,
        endDate,
      };
  
      const existingBookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
      existingBookings.push(bookingData);
      localStorage.setItem('hotelBookings', JSON.stringify(existingBookings));
      const hotelDetail = hotelDetailsMap[hotelCode];
      if (hotelDetail) {
        const bookedHotels = JSON.parse(localStorage.getItem('bookedHotels') || '{}');
        bookedHotels[hotelCode] = {
          ...hotelDetail,
          image: hotelDetail.Images?.[0] || "", // Save the first image if available
        };
        localStorage.setItem('bookedHotels', JSON.stringify(bookedHotels));
      }
  
      window.dispatchEvent(new Event('storage'));
  
      setBookingSuccess(true);
      setTimeout(() => {
        setShowBookingDialog(false);
        setBookingSuccess(false);
        setBookingDetails({
          title: "Mr",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          rooms: 1,
          cardNumber: "",
          cardExpiry: "",
          cardCVV: "",
          addressuser: "",
        });
      }, 2000);
  
      setHotels(prevHotels =>
        prevHotels.map(hotel =>
          hotel.HotelCode === hotelCode ? { ...hotel, booked: true } : hotel
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };
  
  const BookingDialog = () => (
    <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
        </DialogHeader>
        
        {bookingSuccess ? (
          <Alert className="bg-green-100 border-green-400">
            <AlertDescription className="text-green-700">
              Booking successful! Your hotel is booked.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <select
                id="title"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                value={bookingDetails.title}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, title: e.target.value }))}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                className="col-span-3"
                value={bookingDetails.firstName}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                className="col-span-3"
                value={bookingDetails.lastName}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3 relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={bookingDetails.email}
                  onChange={(e) => setBookingDetails(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <div className="col-span-3 relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  className="pl-10"
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rooms" className="text-right">
                Rooms
              </Label>
              <Input
                id="rooms"
                type="number"
                min="1"
                max="5"
                className="col-span-3"
                value={bookingDetails.rooms}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, rooms: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardNumber" className="text-right">
                Card Number
              </Label>
              <div className="col-span-3 relative">
                <FaCreditCard className="absolute left-3 top-3 text-gray-400" />
                <Input
                  id="cardNumber"
                  className="pl-10"
                  placeholder="1234 5678 9012 3456"
                  value={bookingDetails.cardNumber}
                  onChange={(e) => setBookingDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                  
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardExpiry" className="text-right">
                Expiry
              </Label>
              <Input
                id="cardExpiry"
                className="col-span-1"
                placeholder="MM/YY"
                value={bookingDetails.cardExpiry}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, cardExpiry: e.target.value }))}
                
              />
              <Label htmlFor="cardCVV" className="text-right">
                CVV
              </Label>
              <Input
                id="cardCVV"
                type="password"
                maxLength="3"
                className="col-span-1"
                value={bookingDetails.cardCVV}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, cardCVV: e.target.value }))}
                
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="addressuser"
                className="col-span-3"
                value={bookingDetails.addressuser}
                onChange={(e) => setBookingDetails(prev => ({ ...prev, addressuser: e.target.value }))}
                required
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {!bookingSuccess && (
            <>
              <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleBookingSubmit(selectedHotel.hotelCode, selectedHotel.bookingCode)}>
                Complete Booking
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const preBookHotel = async (hotelCode, bookingCode) => {
    setSelectedHotel({ hotelCode, bookingCode });
    setShowBookingDialog(true);
  };

  return (
    <section className="p-12 bg-gradient-to-b from-blue-500 to-blue-800 min-h-screen text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          🏨 Available Hotels
        </h2>

        {loading ? (
          <p className="text-gray-200 text-center text-lg animate-pulse">
            Loading hotels...
          </p>
        ) : error ? (
          <p className="text-red-400 text-center text-lg">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel, index) => {
              const hotelDetails = hotelDetailsMap[hotel.HotelCode];
              
              return (
                <motion.div
                  key={index}
                  className="bg-white text-gray-900 shadow-2xl rounded-xl p-6 border border-blue-300 transform transition-all hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {hotelDetails && (
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-blue-600 mb-4">
                        {hotelDetails.HotelName}
                      </h3>
                      
                      <img
                        src={
                          (() => {
                            for (let i = 0; i < 20; i++) {
                              if (hotelDetails.Images?.[i]) {
                                return hotelDetails.Images[i];
                              }
                            }
                            return "/api/placeholder/400/300";
                          })()
                        }
                        alt={hotelDetails.HotelName}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      
                      <p className="text-gray-700 mb-4">
                        {hotelDetails.Description?.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150)}...
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-gray-700 flex items-center">
                          <FaMapMarkerAlt className="text-red-500 mr-2" />
                          {hotelDetails.Address}
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <FaPhone className="text-green-500 mr-2" />
                          {hotelDetails.PhoneNumber}
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <FaClock className="text-yellow-500 mr-2" />
                          Check-In: {hotelDetails.CheckInTime}, Check-Out: {hotelDetails.CheckOutTime}
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <FaStar className="text-orange-500 mr-2" />
                          {hotelDetails.HotelRating} Stars
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {hotel.Rooms?.map((room, roomIndex) => (
                    <div key={roomIndex} className="mt-4 border-t pt-4">
                      <h4 className="font-semibold text-lg text-blue-600 mb-2">
                        Room Details
                      </h4>
                      <p className="text-gray-700">
                        <strong>Room Type:</strong> {room.Name?.join(", ")}
                      </p>
                      <p className="text-gray-700">
                        <strong>Meal Type:</strong> {room.MealType}
                      </p>
                      <p className="text-gray-700">
                        <strong>Total Fare:</strong> {hotel.Currency} {room.TotalFare}
                      </p>
                      <p className="text-gray-700">
                        <strong>Tax:</strong> {hotel.Currency} {room.TotalTax}
                      </p>
                      <p className="text-gray-700">
                        <strong>Refundable:</strong>{" "}
                        {room.IsRefundable ? (
                          <span className="text-green-600">Yes</span>
                        ) : (
                          <span className="text-red-600">No</span>
                        )}
                      </p>
                      
                      <div className="mt-4">
                        <strong className="text-gray-700">Cancellation Policy:</strong>
                        <ul className="list-disc pl-6">
                          {room.CancelPolicies?.map((policy, policyIndex) => (
                            <li key={policyIndex} className="text-gray-600">
                              From {policy.FromDate}:
                              {policy.ChargeType === "Percentage"
                                ? ` ${policy.CancellationCharge}% of the total booking cost`
                                : ` Fixed charge of ${policy.CancellationCharge}`}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => preBookHotel(hotel.HotelCode, room.BookingCode)}
                        className={`mt-6 py-2 px-6 rounded-lg transition w-full ${
                          hotel.booked
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        disabled={hotel.booked}
                      >
                        {hotel.booked ? "Booked" : "Book Now"}
                      </button>
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <BookingDialog />
    </section>
  );
};

export default AvailableHotels;