import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./WaitingPage.css";
import Loading from "../components/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import {
  updateStatusAsync,
  getSessionAsync,
  addPlayerAsync
} from "../redux/session/thunks";
import { setSession } from "../redux/session/reducer";
import { LOCATION } from "../util/constant";
import { setLocation } from "../redux/app/reducer";
import { resetSession } from "../redux/session/reducer";
import { resetApp } from "../redux/app/reducer";

function WaitingPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const currentSession = useSelector((state) => state.session);
  const currentUser = useSelector((state) => state.user._id);
  const dispatch = useDispatch();
  const location = useLocation();

  const [playerCount, setPlayerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    dispatch(getSessionAsync(sessionId));
  }, [sessionId, dispatch]);

  useEffect(() => {
    if (currentSession._id && location.state?.fromHomePage !== true) {
      if (currentSession.players.length >= 4) {
        dispatch(resetSession());
        dispatch(resetApp());
        navigate("/");
        return;
      }
      dispatch(setLocation(LOCATION.WAITING));
      dispatch(getSessionAsync(sessionId));
      setPlayerCount(currentSession.players.length);
      setLoading(false);

      if (currentUser && !currentSession.players.includes(currentUser)) {
        dispatch(
          addPlayerAsync({ session: currentSession, player: currentUser })
        );
      } else if (!currentUser) {
        dispatch(setLocation(LOCATION.LOGIN));
        navigate("/login", { state: { from: `/waiting/${sessionId}` } });
      }
    }
  }, [currentUser, currentSession._id]);

  useEffect(() => {
    const socket = io("https://sketch-connect-be.onrender.com");
    socket.emit("join", sessionId);

    const handleNumPlayersChanged = (session) => {
      console.log(
        `Received numPlayersChanged event: ${JSON.stringify(session)}`
      );
      setPlayerCount(session.playersLength);
      setLoading(false);
    };

    const handleSessionStarted = (session) => {
      console.log(`Received sessionStarted event: ${JSON.stringify(session)}`);
      dispatch(setSession({ session: session }));
      startGame();
    };

    socket.on("numPlayersChanged", handleNumPlayersChanged);
    socket.on("sessionStarted", handleSessionStarted);

    // TODO: handle session cancelled

    return () => {
      socket.off("numPlayersChanged", handleNumPlayersChanged);
      socket.off("sessionStarted", handleSessionStarted);
      socket.disconnect();
    };
  }, [sessionId]);

  useEffect(() => {
    if (currentSession._id && currentSession.players[0] === currentUser) {
      setIsFirst(true);
    }
  }, [currentSession, currentUser]);

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

  const startGame = async () => {
    if (currentSession.players[0] === currentUser) {
      await dispatch(setLocation(LOCATION.GAME));
      navigate(`/game/turn/${sessionId}`, {
        state: { toGame: true }
      });
    } else {
      navigate(`/game/${sessionId}`, {
        state: { toGame: true }
      });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="lobby-container">
      <h2 className="lobby-header">
        {playerCount === 4
          ? `Session ${sessionId} is ready to start!`
          : `Session ${sessionId} is waiting for players to join...`}
      </h2>
      <div>
        <img
          src={"/assets/images/players/" + imageSource}
          alt="lobby"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="button-container">
        <motion.button
          className="invite-button"
          onClick={handleShareClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          INVITE
        </motion.button>
        {isFirst && playerCount === 4 && (
          <motion.button
            className="start-button"
            onClick={handleStartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            START
          </motion.button>
        )}
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
