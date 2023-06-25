import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import "./Timer.css";

const Timer = ({ remainingTime }) => {
  const currentSession = useSelector((state) => state.currentSession);
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [lastRerender, setOneLastRerender] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (remainingTime === 0) {
      history.push(`/complete/${currentSession.id}`);
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
