import React, { useEffect, useState } from "react";

function ImageCard({ sessionId, onClick }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetch(`https://sketch-connect-be.onrender.com/sessions/${sessionId}`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => setSession(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!session) {
    return null;
  }

  return (
    <div
      className="image-card"
      onClick={() => onClick(session.finalImage)} // Trigger the onClick event when the image card is clicked
    >
      <img src={session.finalImage} alt="final-drawing" />
      <p className="topic-text">{session.topic}</p>
    </div>
  );
}

export default ImageCard;
