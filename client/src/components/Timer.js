import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Timer.css";

const Timer = ({ remainingTime }) => {
  const currentSession = useSelector((state) => state.session._id);
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [lastRerender, setOneLastRerender] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (remainingTime === 0) {
      navigate(`/complete/${currentSession.id}`);
    }
    return () => {
      // Cleanup function to cancel any ongoing tasks or subscriptions
      // Perform any necessary cleanup here
    };
  }, [lastRerender]);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
    return <div className="timer">Times Up!</div>;
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

export default Timer;
