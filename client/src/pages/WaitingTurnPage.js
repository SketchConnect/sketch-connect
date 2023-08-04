import React, { useEffect, useState } from "react";
import "./WaitingTurnPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../redux/app/reducer";
import { LOCATION } from "../util/constant";
import { useSelector } from "react-redux";
import io from "socket.io-client";

function WaitingTurnPage() {
  const currentSession = useSelector((state) => state.session);
  const user = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  let [drawn, setDrawn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("https://sketch-connect-be.onrender.com");
    socket.emit("join", currentSession._id);

    socket.on("sessionCompleted", (data) => {
      navigate(`/complete/${currentSession._id}`);
    });

    socket.on("quadrantsUpdated", (data) => {
      if (data.quadrants.length === data.players.length) {
        dispatch(setLocation(LOCATION.COMPLETE));
        navigate(`/complete/${currentSession._id}`);
      }

      let currentTurn = data.quadrants.length;
      let userIndex = data.players.indexOf(user);

      if (currentTurn === userIndex) {
        setDrawn(true);
        navigate(`/game/turn/${currentSession._id}`);
      }
    });

    return () => {
      socket.off("sessionCompleted");
      socket.off("quadrantsUpdated");
      socket.disconnect();
    };
  }, [drawn]);

  return (
    <div className="waiting-text">
      <h1>Waiting for current player to finish drawing</h1>
    </div>
  );
}

export default WaitingTurnPage;
