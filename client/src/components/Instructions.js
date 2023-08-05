import React, { useState } from "react";
import "./Instructions.css";

const Instructions = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div className="image-flip-container">
      <div
        className={`image-flip ${isFlipped ? "flipped" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="front">
          <img src="/assets/images/instructions3.jpeg" alt="instruction background" />
          <h1 id="instruction-title">HOW TO PLAY</h1>
        </div>
        <div className="back">
          <p className="instructions-text">
            Welcome to 'SketchConnect,' the ultimate collaborative doodling game
            for 4 players. Assigned to unique quadrants, each participant takes
            turns drawing, only seeing a subset of previous players' work on
            their aligned edges. Witness the magic of creativity and diversity
            as the quadrants unite, creating a mesmerizing and (potentially)
            seamless masterpiece.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
