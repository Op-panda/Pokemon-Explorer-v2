import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="pokemon-card skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-types">
        <div className="skeleton-type"></div>
        <div className="skeleton-type"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
