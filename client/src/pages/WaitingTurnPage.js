import React, { useEffect, useState } from "react";
import "./WaitingTurnPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../redux/app/reducer";
import { LOCATION } from "../util/constant";

function WaitingTurnPage() {
  const currentSession = useSelector((state) => state.session);
  const user = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  let [drawn, setDrawn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `https://sketch-connect-be.onrender.com/sessions/${currentSession._id}`,
        {
          method: "GET"
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((response) => {
          if (response.quadrants.length === response.players.length) {
            clearInterval(interval);
            dispatch(setLocation(LOCATION.COMPLETE));
            navigate(`/complete/${currentSession._id}`);
          }

          let currentTurn = response.quadrants.length;
          let userIndex = response.players.indexOf(user);

          if (currentTurn === userIndex) {
            clearInterval(interval);
            setDrawn(true);
            navigate(`/game/turn/${currentSession._id}`);
          }
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [drawn]);

  return (
    <div className="waiting-text">
      <h1>Waiting for current player to finish drawing</h1>
    </div>
  );
}

export default WaitingTurnPage;
