import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Camera, MapPin, Type, Navigation, FileImage } from 'lucide-react';
const apikey=import.meta.env.VITE_MAPS_API;
// Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-3xl font-bold ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-8 ${className}`}>
    {children}
  </div>
);

// Input Components
const FormInput = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
      {Icon && <Icon className="w-5 h-5 mr-2 text-blue-500" />}
      {label}
    </label>
    <input
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      {...props}
    />
  </div>
);

const FormTextarea = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
      {Icon && <Icon className="w-5 h-5 mr-2 text-blue-500" />}
      {label}
    </label>
    <textarea
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      {...props}
    />
  </div>
);

const FormSelect = ({ icon: Icon, label, children, ...props }) => (
  <div>
    <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
      {Icon && <Icon className="w-5 h-5 mr-2 text-blue-500" />}
      {label}
    </label>
    <select
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      {...props}
    >
      {children}
    </select>
  </div>
);

const FormButton = ({ children, className = '', ...props }) => (
  <button
    className={`px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg font-medium 
    shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-150 flex items-center ${className}`}
    {...props}
  >
    {children}
  </button>
);

const FormComponent = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    placename: '',
    story: '',
    type: '',
    user_id: currentUser._id,
    image: null,
    coordinates: { lat: 0, lng: 0 }
  });
  const [searchLocation, setSearchLocation] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apikey}&libraries=places`;
      script.defer = true;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 4,
        styles: [
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
          }
        ]
      });

      const markerInstance = new window.google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: mapInstance,
        draggable: true,
        animation: window.google.maps.Animation.DROP
      });

      setMarker(markerInstance);
      markerInstance.addListener('dragend', () => {
        const position = markerInstance.getPosition();
        setFormData(prevState => ({
          ...prevState,
          coordinates: { lat: position.lat(), lng: position.lng() }
        }));
      });

      setMap(mapInstance);
    };

    loadMapScript();
  }, []);

  useEffect(() => {
    if (map && searchLocation) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchLocation }, (results, status) => {
        if (status === 'OK') {
          map.setCenter(results[0].geometry.location);
          map.setZoom(10);
          marker.setPosition(results[0].geometry.location);
          setFormData(prevState => ({
            ...prevState,
            coordinates: { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
          }));
        }
      });
    }
  }, [searchLocation, map, marker]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'coordinates') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post('http://localhost:3000/api/upload', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(response.data.msg);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
          <CardTitle className="text-center">Share Your Travel Story</CardTitle>
          <p className="text-center mt-2 text-indigo-100">Capture and share your amazing travel experiences</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <FormInput
                  icon={MapPin}
                  label="Place Name"
                  id="placename"
                  type="text"
                  value={formData.placename}
                  onChange={handleChange}
                  placeholder="Enter the name of this amazing place"
                />

                <FormTextarea
                  icon={Type}
                  label="Story"
                  id="story"
                  value={formData.story}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Share your experience..."
                />

                <FormSelect
                  icon={Navigation}
                  label="Type of Place"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select the vibe of this place</option>
                  <option value="Chill">Chill Spot 😌</option>
                  <option value="Vibezz">Good Vibezz ✨</option>
                  <option value="Nature">Nature Paradise 🌿</option>
                  <option value="Hidden Gem">Hidden Gem 💎</option>
                  <option value="Famous">Famous Landmark 🌟</option>
                  <option value="Must See">Must See 👀</option>
                </FormSelect>

                <div>
                  <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                    <FileImage className="w-5 h-5 mr-2 text-blue-500" />
                    Upload Image
                  </label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-all cursor-pointer">
                    <div className="space-y-1 text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input id="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                        </label>
                      </div>
                    </div>
                  </div>
                  {previewImage && (
                    <div className="mt-4">
                      <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <FormInput
                  icon={MapPin}
                  label="Location Search"
                  id="searchLocation"
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Search for a location"
                />
                <div id="map" className="h-96 rounded-lg shadow-md"></div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <FormButton type="submit">
                <Navigation className="w-5 h-5 mr-2" />
                Share Your Story
              </FormButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormComponent;