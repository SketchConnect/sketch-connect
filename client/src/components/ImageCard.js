import React from 'react';

function ImageCard({ image, onClick }) {
  return (
    <div className="image-card" onClick={onClick}>
      <img src={image} alt="Image" />
    </div>
  );
}

export default ImageCard;
