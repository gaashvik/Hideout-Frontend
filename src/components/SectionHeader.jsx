/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";

const SectionHeader = ({ icon, title, onAdd, addText }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
    {onAdd && (
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        <Plus size={20} />
        {addText}
      </button>
    )}
  </div>
);

SectionHeader.propTypes = {
  icon: PropTypes.element.isRequired, // Expects an icon or React element
  title: PropTypes.string.isRequired, // Section title
  onAdd: PropTypes.func, // Optional click handler for the "Add" button
  addText: PropTypes.string, // Optional text for the "Add" button
};

export default SectionHeader;
