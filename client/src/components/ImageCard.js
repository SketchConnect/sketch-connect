import React, { useEffect, useState } from "react";

function ImageCard({ sessionId }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Replace 'your-endpoint-url' with the actual URL of your API endpoint
    fetch(`https://sketch-connect-be.onrender.com/sessions/${sessionId}`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => setSession(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Render null if session is null
  if (!session) {
    return null;
  }

  return (
    <div className="image-card">
      <img src={session.finalImage} alt="Image" />
    </div>
  );
}

export default ImageCard;
