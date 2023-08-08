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
          <h1 id="instruction-title">CLICK FOR INSTRUCTIONS</h1>
        </div>
        <div className="back">
          <video className="instruction-video" controls>
						<source src="/assets/videos/instruction.mp4" type="video/mp4" />
				  		Your browser does not support the video tag.
					</video>
        </div>
      </motion.div>
    </div>
  );
};

export default Instructions;
