import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./WaitingPage.css";
import { motion, AnimatePresence } from "framer-motion";
import { useInterval } from "../util/useInterval";

function WaitingPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const currentSession = useSelector((state) => state.session);
  const currentUser = useSelector((state) => state.user._id);

  const [playerCount, setPlayerCount] = useState(0);

  useInterval(async () => {
    fetch(`https://sketch-connect-be.onrender.com/sessions/${currentSession._id}`, {
      method: "GET"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((response) => {
      setPlayerCount(response.players.length)
    })
  }, 1000);

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

  // TODO: the link is copied but the logic to join the session is not fully working
  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.REACT_APP_FE_URL}/waiting/${currentSession._id}`
      );
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="lobby-container">
      <h2 className="lobby-header">
        {playerCount === 4
          ? `Session ${sessionId} is ready to start!`
          : `Session ${sessionId} is waiting for players to join...`}
      </h2>
      <div>
        <img src={"/assets/images/players/" + imageSource} alt="lobby" />
      </div>
      <div className="button-container">
        <button className="invite-button" onClick={handleShareClick}>
          INVITE
        </button>
        <button
          className="start-button"
          onClick={() => {
            if (currentSession.players[0] === currentUser) {
              navigate(`/game/turn/${sessionId}`);
            } else {
              navigate(`/game/${sessionId}`);
            }
          }}
        >
          START
        </button>
      </div>
      <AnimatePresence>
        {isCopied && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              bottom: "0px",
              right: "0px",
              margin: "16px",
              padding: "24px",
              fontSize: "20px",
              backgroundColor: "#f7963e",
              color: "white",
              borderRadius: "16px"
            }}
          >
            URL copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WaitingPage;
