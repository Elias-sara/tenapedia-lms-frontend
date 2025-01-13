import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div 
        className={`${sizeClasses[size]} border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}
      ></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  message: PropTypes.string
};

export default LoadingSpinner;
