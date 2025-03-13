import React from 'react';
import './styles/LoadingIndicator.css';

const LoadingIndicator = () => {
  return (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default LoadingIndicator;
