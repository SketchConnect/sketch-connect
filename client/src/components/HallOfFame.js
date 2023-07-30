import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImageCard from "./ImageCard";

function HallOfFame() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const currentUser = useSelector((state) => state.user);
  const sessionIds = currentUser.sessions;

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowPopup(true);
  };

  const handleDownload = () => {
    // Logic to download the selected image
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedImage("");
  };

  return (
    <div className="hall-of-fame">
      {/* Image cards */}
      {sessionIds.map((id, index) => (
        <li key={id}>
          <ImageCard sessionId={id} />
        </li>
      ))}

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
