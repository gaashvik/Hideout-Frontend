
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Calendar, MapPin, DollarSign, Users, FileText, Navigation } from 'lucide-react';
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
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

// Form Components
const FormInput = ({ icon: Icon, label, error, ...props }) => (
  <div>
    <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
      {Icon && <Icon className="w-5 h-5 mr-2 text-blue-500" />}
      {label}
    </label>
    <input
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const FormTextarea = ({ icon: Icon, label, error, ...props }) => (
  <div>
    <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
      {Icon && <Icon className="w-5 h-5 mr-2 text-blue-500" />}
      {label}
    </label>
    <textarea
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const FormButton = ({ children, loading, className = '', ...props }) => (
  <button
    className={`px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg font-medium 
    shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-150 flex items-center
    disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    disabled={loading}
    {...props}
  >
    {loading ? (
      <span className="flex items-center">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Creating Trip...
      </span>
    ) : children}
  </button>
);

const CreateRide = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    StartDate: '',
    EndDate: '',
    Origin: '',
    Destination: '',
    Budget: '',
    Description: '',
    MaxCapacity: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(prevFormData => ({
        ...prevFormData,
        user_obj_id: currentUser._id
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(`${backendUrl}/api/addtrip`, formData);
      alert(response.data.msg);
    } catch (error) {
      console.error('Error:', error);
      setError('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
          <CardTitle className="text-center">Create New Trip</CardTitle>
          <p className="text-center mt-2 text-blue-100">Plan your next adventure with fellow travelers</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                icon={Calendar}
                label="Start Date"
                id="StartDate"
                type="date"
                value={formData.StartDate}
                onChange={handleChange}
                required
              />

              <FormInput
                icon={Calendar}
                label="End Date"
                id="EndDate"
                type="date"
                value={formData.EndDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                icon={MapPin}
                label="Origin"
                id="Origin"
                type="text"
                value={formData.Origin}
                onChange={handleChange}
                placeholder="Where are you starting from?"
                required
              />

              <FormInput
                icon={Navigation}
                label="Destination"
                id="Destination"
                type="text"
                value={formData.Destination}
                onChange={handleChange}
                placeholder="Where are you heading to?"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                icon={DollarSign}
                label="Budget"
                id="Budget"
                type="number"
                value={formData.Budget}
                onChange={handleChange}
                placeholder="Estimated trip budget"
                required
              />

              <FormInput
                icon={Users}
                label="Max Capacity"
                id="MaxCapacity"
                type="number"
                value={formData.MaxCapacity}
                onChange={handleChange}
                placeholder="How many travelers?"
                required
              />
            </div>

            <FormTextarea
              icon={FileText}
              label="Description"
              id="Description"
              value={formData.Description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your trip plans..."
              required
            />

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-8">
              <FormButton type="submit" loading={loading}>
                <Navigation className="w-5 h-5 mr-2" />
                Create Trip
              </FormButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRide;