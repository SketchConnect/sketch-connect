import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Instructions.css";

const Instructions = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="image-flip-container">
      <motion.div
        className="image-flip"
        onClick={handleClick}
        whileHover={{ scale: 0.95 }}
        animate={{
          rotateY: isFlipped ? 180 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="front">
          <img
            src="/assets/images/instructions3.jpeg"
            alt="instruction background"
          />
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
      </motion.div>
    </div>
  );
};

export default Instructions;
