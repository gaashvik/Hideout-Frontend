/* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// const Ride = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const { id } = useParams(); // Assuming you have a trip ID in the URL
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [ride, setRide] = useState(null);

//   useEffect(() => {
//     // Fetch ride details based on tripId
//     const fetchRideDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/trips/getone/${id}`);
//         setRide(response.data[0]);
//       } catch (error) {
//         console.error('Error fetching ride details:', error);
//         setError('Error fetching ride details');
//       }
//     };

//     fetchRideDetails();
//   }, [id]);

//   const handleJoinTrip = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(`http://localhost:3000/api/trips/${id}/join/${currentUser._id}`);
//       alert(response.data.message); // Optionally show a success message
//       // Handle success, update UI or redirect
//     } catch (error) {
//       console.error('Error joining trip:', error);
//       setError('Error joining trip. Please try again.',error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString(); // Adjust format as needed
//   };
//   if (!ride) {
//     return <div>Loading...</div>; // Or some loading indicator
//   }

//   return (
//     <div className='flex max-w-[1640px] m-auto px-4 py-12'>
//       <img className="h-auto w-1/4 rounded-lg  object-cover object-center" src='https://firebasestorage.googleapis.com/v0/b/hideout-500bd.appspot.com/o/Frame1.png?alt=media&token=a8c5b66b-5c0b-4b2e-a384-d95e143fa1f8' alt={ride.name} />
//       <div className='px-12 py-24'>
//         <h2 className='mb-4 text-5xl font-extrabold'>{ride.name}</h2>
//         <p className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-grey">{ride.Origin} &#10148; {ride.Destination}</p>
//         <p className="max-w-lg text-2xl leading-normal text-gray-900 dark:text-grey-900">Start Date: {formatDate(ride.StartDate)}</p>
//         <p className="max-w-lg text-2xl leading-normal text-gray-900 dark:text-grey-900">End Date: {formatDate(ride.EndDate)}</p>
//         <p className="max-w-lg text-2xl leading-normal text-gray-900 dark:text-grey-900">Budget: {ride.Budget}</p>
//         <p className="max-w-lg text-2xl leading-normal text-gray-900 dark:text-grey-900">Description: {ride.Description}</p>
//         <p className="max-w-lg text-2xl leading-normal text-gray-900 dark:text-grey-900">Passengers Left: {ride.PassengersLeft}</p>
//         <p className="max-w-lg text-2xl leading-normal text-gray-900 dark:text-grey-900">{ride.description}</p>
//         <br />
//         <button
//           type="button"
//           className={`px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary rounded-lg text-center dark:bg-primary dark:hover:bg-secondary dark:focus:ring-secondary ${loading || ride.PassengersLeft <= 0 ? 'cursor-not-allowed opacity-50' : ''}`}
//           onClick={handleJoinTrip}
//           disabled={loading || ride.PassengersLeft <= 0}
//         >
//           {loading ? 'Joining...' : ride.PassengersLeft <= 0 ? 'Trip Full' : 'Join trip'}
//         </button>
//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default Ride;


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { MapPin, Calendar, DollarSign, Users, AlertCircle, ArrowRight } from 'lucide-react';

// Internal Card Components
const Card = ({ className, children, ...props }) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
};

const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Internal Alert Components
const Alert = ({ className, children, variant = 'default', ...props }) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-900',
    destructive: 'bg-red-100 text-red-900'
  };

  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertDescription = ({ className, children, ...props }) => {
  return (
    <div className={`text-sm font-medium ${className}`} {...props}>
      {children}
    </div>
  );
};

const Ride = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await axios.get(`/api/trips/getone/${id}`);
        setRide(response.data[0]);
      } catch (error) {
        console.error('Error fetching ride details:', error);
        setError('Error fetching ride details');
      }
    };

    fetchRideDetails();
  }, [id]);

  const handleJoinTrip = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/trips/${id}/join/${currentUser._id}`);
      alert(response.data.message);
    } catch (error) {
      console.error('Error joining trip:', error);
      setError('Error joining trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!ride) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <CardTitle className="text-3xl font-bold">{ride.name}</CardTitle>
          <div className="flex items-center mt-4 space-x-2">
            <MapPin className="h-5 w-5" />
            <span className="text-xl">
              {ride.Origin} <ArrowRight className="inline mx-2" /> {ride.Destination}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 mt-4">
              <img
                className="w-full h-64 object-cover rounded-lg shadow-md"
                src="https://firebasestorage.googleapis.com/v0/b/hideout-500bd.appspot.com/o/Frame1.png?alt=media&token=a8c5b66b-5c0b-4b2e-a384-d95e143fa1f8"
                alt={ride.name}
              />
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-blue-800 mb-2">Trip Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Start: {formatDate(ride.StartDate)}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    <span>End: {formatDate(ride.EndDate)}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Budget: {ride.Budget}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    <span>Spots left: {ride.PassengersLeft}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{ride.Description}</p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <button
                onClick={handleJoinTrip}
                disabled={loading || ride.PassengersLeft <= 0}
                className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-all
                  ${loading || ride.PassengersLeft <= 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                  } shadow-md hover:shadow-lg`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Joining...
                  </span>
                ) : ride.PassengersLeft <= 0 ? (
                  'Trip Full'
                ) : (
                  'Join Trip'
                )}  
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ride;