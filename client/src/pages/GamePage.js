import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Canvas from "../components/Canvas";
import Timer from "../components/Timer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate, useParams } from "react-router-dom";
import "./GamePage.css";
import { quadrantImageAsync, updateStatusAsync } from "../redux/session/thunks";
import { setLocation } from "../redux/app/reducer";
import { LOCATION } from "../util/constant";
import { io } from "socket.io-client";

const GamePage = () => {
  const { sessionId } = useParams();
  const currentSession = useSelector((state) => state.session);
  const players = currentSession.players;
  const user = useSelector((state) => state.user._id);
  const currPlayer = players.indexOf(user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const canvasRef = useRef(null);

  useEffect(() => {
    const socket = io("https://sketch-connect-be.onrender.com");
    socket.emit("join", sessionId);

    socket.on("sessionCompleted", (data) => {
      navigate(`/complete/${sessionId}`);
    });

    socket.on("quadrantsUpdated", (data) => {
      if (data.status === "completed") {
        dispatch(setLocation(LOCATION.COMPLETE));
        navigate(`/complete/${sessionId}`);
      }
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.captureDrawing();
      }
    }, 10100);

    return () => {
      socket.off("sessionCompleted");
      socket.off("quadrantsUpdated");
      socket.disconnect();
    };
  }, []);

  const handleCapture = useCallback(
    (blob) => {
      const formData = new FormData();
      const image = new File([blob], "image.png", {
        type: "image/png"
      });
      formData.append("img", image);
      formData.append("folder", "drawings/quadrants");
      formData.append("quadrantNumber", currPlayer.toString());

      fetch(
        `https://sketch-connect-be.onrender.com/sessions/${sessionId}/upload-drawing`,
        {
          method: "PATCH",
          body: formData
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (user === players[3]) {
            dispatch(
              updateStatusAsync({
                sessionId: sessionId,
                status: "completed"
              })
            );
            dispatch(setLocation(LOCATION.COMPLETE));
            navigate(`/complete/${sessionId}`);
          } else {
            dispatch(setLocation(LOCATION.GAME));
            navigate(`/game/${sessionId}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [sessionId, currPlayer]
  );

  let imageSource;
  if (currPlayer === 0) {
    imageSource = "p1.png";
  } else if (currPlayer === 1) {
    imageSource = "p2.png";
  } else if (currPlayer === 2) {
    imageSource = "p3.png";
  } else {
    imageSource = "p4.png";
  }
  return (
    <div className="game-container">
      <div className="game-info">
        <div>
          <h2>Session ID: {sessionId}</h2>
          <h2>Topic: {currentSession.topic}</h2>
        </div>
        <div className="curr-player">
          <img src={"/assets/images/players/" + imageSource} alt="lobby" />
          <h2>Player {currPlayer + 1}/4</h2>
        </div>
        <div className="countdown">
          <h2>Time Remaining:</h2>
          <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying
              duration={10}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 4, 0]}
            >
              {Timer}
            </CountdownCircleTimer>
          </div>
        </div>
      </div>
      <div className="drawing-space">
        <Canvas ref={canvasRef} onCapture={handleCapture} />
      </div>
    </div>
  );
};

export default GamePage;
