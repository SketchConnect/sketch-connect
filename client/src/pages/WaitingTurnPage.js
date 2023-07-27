import React, { useEffect } from "react";
import "./WaitingTurnPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function WaitingTurnPage() {
  const currentSession = useSelector((state) => state.session);
  const user = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  useEffect(() => {
    let delay = 0;

    fetch(
      `https://sketch-connect-be.onrender.com/sessions/${currentSession._id}`, 
      {
        method: "GET"
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((response) => {
      let currentTurn = response.quadrants.length;
      let userIndex = response.players.indexOf(user);

      if (currentTurn > userIndex) {
        delay = 10150 * (4 - currentTurn);
        setTimeout(() => {
            navigate(`/complete/${currentSession._id}`);
          }, delay);
        } else if (currentTurn < userIndex) {
          delay = 10150 * (userIndex - currentTurn);
          setTimeout(() => {
            navigate(`/game/turn/${currentSession._id}`);
          }, delay);
        }
      });
  }, []);

  return (
    <div className="waiting-text">
      <h1>Waiting for current player to finish drawing</h1>
    </div>
  );
}

export default WaitingTurnPage;
