import React, { useEffect } from "react";
import "./page.css";
import "./CompletePage.css";
import { useSelector, useDispatch } from "react-redux";
import { resetSession } from "../redux/session/reducer";
import { useNavigate } from "react-router-dom";

const CompletePage = () => {
  let navigate = useNavigate();
  const current = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSession());
    console.log(current)
  }, [dispatch])

  return (
    <div className="container">
      <div className="buttons-container">
        <div className="buttons-top">
          <h2 className="page-heading">What a masterpiece!</h2>
          <button id="download-btn">Download</button>
          <button id="share-btn">Share</button>
        </div>

        <div className="buttons-bottom" onClick={() => navigate('/')}>
          <img
            id="newGame-btn"
            src={"/assets/images/puzzle-button.svg"}
            alt="click to play new game"
          />
          <h2 id="newGame-txt">
            New
            <br /> Game
          </h2>
        </div>
      </div>
      <div className="drawing-container">
        <span id="drawing"></span>
      </div>
    </div>
  );
};

export default CompletePage;
