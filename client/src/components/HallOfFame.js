import React, { useState } from 'react';
import ImageCard from './ImageCard';

function HallOfFame() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowPopup(true);
  };

  const handleDownload = () => {
    // Logic to download the selected image
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedImage('');
  };

  return (
    <div className="hall-of-fame">
      {/* Image cards */}
      <ImageCard
        image="image1.jpg"
        onClick={() => handleImageClick('image1.jpg')}
      />
      <ImageCard
        image="image2.jpg"
        onClick={() => handleImageClick('image2.jpg')}
      />
      <ImageCard
        image="image3.jpg"
        onClick={() => handleImageClick('image3.jpg')}
      />

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <img src={selectedImage} alt="Popup" className="popup-image" />
            <button className="download-button" onClick={handleDownload}>
              Download
            </button>
            <button className="close-button" onClick={closePopup}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HallOfFame;
