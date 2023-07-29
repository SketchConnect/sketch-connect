import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./WaitingPage.css";
import { motion, AnimatePresence } from "framer-motion";
import { useInterval } from "../util/useInterval";
import {
  updateStatusAsync,
  getSessionAsync,
  addPlayerAsync
} from "../redux/session/thunks";
import { setSession } from "../redux/session/reducer";

function WaitingPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const currentSession = useSelector((state) => state.session);
  const currentUser = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  const location = useLocation();

  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    dispatch(getSessionAsync(sessionId));
  }, [sessionId, dispatch]);

  useEffect(() => {
    if (currentSession._id && location.state?.fromHomePage !== true) {
      console.log("join via link");
      if (currentUser && !currentSession.players.includes(currentUser)) {
        dispatch(
          addPlayerAsync({ session: currentSession, player: currentUser })
        );
      } else if (!currentUser) {
        navigate("/login", { state: { from: `/waiting/${sessionId}` } });
      }
    }
  }, [currentUser, currentSession._id]);

  useInterval(async () => {
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
        setPlayerCount(response.players.length);
        if (response.status === "ongoing") {
          dispatch(setSession({ session: response }));
          startGame();
        }
      });
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

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleStartClick = async () => {
    try {
      dispatch(updateStatusAsync({ sessionId: sessionId, status: "ongoing" }));
      startGame();
    } catch (err) {
      console.error("Fail to start session");
    }
  };

  const startGame = () => {
    if (currentSession.players[0] === currentUser) {
      navigate(`/game/turn/${sessionId}`);
    } else {
      navigate(`/game/${sessionId}`);
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
        <button className="start-button" onClick={handleStartClick}>
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
