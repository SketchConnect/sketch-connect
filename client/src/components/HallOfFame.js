import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ImageCard from "./ImageCard";
import "./HallOfFame.css";

function HallOfFame() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const currentUser = useSelector((state) => state.user);
  const sessionIds = currentUser.sessions;
  let link = useRef();

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowPopup(true);
  };

  const handleDownload = () => {
    let link = document.createElement("a");
    if (selectedImage) {
      link.download = "downloaded_image.png";
      try {
        link.href = selectedImage;
      } catch (err) {
        console.error("Failed to download image: ", err);
      }
      link.click();
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedImage("");
  };

  return (
    <div className="hall-of-fame">
      {sessionIds.length > 0 &&
        sessionIds.map((id, index) => {
          if (id.trim() !== "") {
            return (
              <ImageCard key={id} sessionId={id} onClick={handleImageClick} />
            );
          }
          return null;
        })}

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <img src={selectedImage} alt="Popup" className="popup-image" />
            <button
              className="download-button hof-button"
              ref={link}
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

export default HallOfFame;
