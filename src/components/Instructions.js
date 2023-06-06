import React, { useState } from 'react';
import './Instructions.css';

const Instructions = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div className="image-flip-container" >
      <div
        className={`image-flip ${isFlipped ? 'flipped' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="front">
          <img src="/assets/images/elephant.png" alt="Image" />
        </div>
        <div className="back">
          <p>Instructions text</p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
