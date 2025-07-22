/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

export const Card = ({ children, className = "" }) => (
  <div className={`bg-blue-50 rounded-xl p-6 ${className}`}>{children}</div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// export default Card;
