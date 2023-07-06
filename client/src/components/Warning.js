import React from "react";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  width: "68%",
  position: "absolute",
  left: "10%",
  top: "10%",
  borderRadius: "20px",
  padding: "10% 6%"
};

function Warning() {
  return (
    <div style={containerStyle}>
      <img
        src="/assets/images/hand-stop.svg"
        alt="stop icon"
        width="80px"
      ></img>
      <h2 id="modal-title">WAIT!</h2>
      <p id="modal-description">
        Our game is best played on laptop due to canvas size resetrictions.
      </p>
      <p id="modal-description">
        Please use device with at least 1024px width for the full experience.
      </p>
    </div>
  );
}

export default Warning;
