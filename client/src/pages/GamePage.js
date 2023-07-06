import React from "react";
import Canvas from "../components/Canvas";
import Timer from "../components/Timer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const GamePage = () => {
  return (
    <div>
      <h1>Time Left</h1>
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
      <Canvas />
    </div>
  );
};

export default GamePage;
