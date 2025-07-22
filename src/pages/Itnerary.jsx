/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const ItineraryModal = ({ isOpen, onClose, onSave }) => {
  const [selectedTime, setSelectedTime] = useState('morning');
  const [placeName, setPlaceName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      timeOfDay: selectedTime,
      place: placeName,
      description: description
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/95 flex items-start justify-center pt-20 px-4 z-50">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl p-6 space-y-6">
        {/* Header with close button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">New Day</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Time of day selector */}
        <div className="bg-gray-800/50 rounded-xl p-1 flex">
          <button
            onClick={() => setSelectedTime('morning')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 ${
              selectedTime === 'morning' 
                ? 'bg-gray-800 text-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-lg">☀️</span>
            Morning
          </button>
          <button
            onClick={() => setSelectedTime('afternoon')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 ${
              selectedTime === 'afternoon' 
                ? 'bg-gray-800 text-yellow-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-lg">🌤️</span>
            Afternoon
          </button>
          <button
            onClick={() => setSelectedTime('evening')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 ${
              selectedTime === 'evening' 
                ? 'bg-gray-800 text-indigo-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-lg">🌙</span>
            Evening
          </button>
        </div>

        {/* Place Name Input */}
        <div className="space-y-2">
          <label className="text-lg text-white font-semibold">
            Name of the Place
          </label>
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="Name of the place"
            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <label className="text-lg text-white font-semibold">
            Description of the place
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="How would you describe it?"
            className="w-full h-32 bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Add New Place Button */}
        <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
          <span className="text-xl">+</span>
          Add New Place
        </button>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
ItineraryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

// export default ItineraryModal;
export default ItineraryModal;