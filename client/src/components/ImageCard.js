import React, { useEffect, useState } from "react";

function ImageCard({ topic, finalImage, onClick }) {
  return (
    <div className="image-card" onClick={() => onClick(finalImage)}>
      <img src={finalImage} alt="final-drawing" />
      <p className="topic-text">{topic}</p>
    </div>
  );
}

export default ImageCard;
