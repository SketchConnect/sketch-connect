import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./WaitingPage.css";
import { useParams } from "react-router-dom";

function WaitingPage() {
  const { sessionId } = useParams();

  const currentSession = useSelector((state) => state.session);
  const players = currentSession.players;
  const playerCount = players.length;

  let imageSource;
  if (playerCount === 1) {
    imageSource = "player1.png";
  } else if (playerCount === 2) {
    imageSource = "player2.png";
  } else if (playerCount === 3) {
    imageSource = "player3.png";
  } else {
    imageSource = "player4.png";
  }

  return (
    <div className="lobby-container">
      <h2 className="lobby-header">
        {playerCount == 4
          ? `Session ${sessionId} is ready to start!`
          : `Session ${sessionId} is waiting for players to join...`}
      </h2>
      <div>
        <img src={"/assets/images/players/" + imageSource} alt="lobby" />
      </div>
      <div className="button-container">
        <button className="invite-button">INVITE</button>
        <NavLink className="start-button" to="/game">
          START
        </NavLink>
      </div>
    </div>
  );
}

export default WaitingPage;
