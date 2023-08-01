import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <img
        src={"../assets/images/logo.png"}
        alt="loading"
        className="loading-image"
      />
      <div className="loading-text">
        <span>Loading</span>
        <span className="loading-dots">.</span>
        <span className="loading-dots">.</span>
        <span className="loading-dots">.</span>
      </div>
    </div>
  );
};

export default Loading;
