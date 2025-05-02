import React from 'react';

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="error-container">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
