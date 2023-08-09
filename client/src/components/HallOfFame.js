import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ImageCard from "./ImageCard";

function HallOfFame() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const sessions = useSelector((state) => state.user.sessions);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowPopup(true);
  };

  const handleDownload = () => {
    if (selectedImage) {
      fetch(selectedImage)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "image.png";
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.error("Failed to download image: ", err);
        });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedImage("");
  };

  if (!sessions) {
    return <div>No sessions yet, go create some masterpieces!</div>;
  } else {
    return (
      <div className="hall-of-fame">
        {sessions.length > 0 &&
          sessions.map((session, index) => {
            console.log(session);
            return (
              <ImageCard
                key={index}
                topic={session.topic}
                finalImage={session.finalImage}
                onClick={() => handleImageClick(session.finalImage)}
              />
            );
          })}

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <img src={selectedImage} alt="Popup" className="popup-image" />
              <button
                className="download-button hof-button"
                onClick={handleDownload}
              >
                Download
              </button>
              <button className="close-button hof-button" onClick={closePopup}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HallOfFame;
