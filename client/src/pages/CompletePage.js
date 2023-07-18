import React, { useRef, useEffect, useState } from "react";
import "./page.css";
import "./CompletePage.css";
import { useSelector, useDispatch } from "react-redux";
import { resetSession } from "../redux/session/reducer";
import { finalImageAsync } from "../redux/session/thunks";
import { useNavigate } from "react-router-dom";

const CompletePage = () => {
  let navigate = useNavigate();
  const current = useSelector((state) => state.session);
  const dispatch = useDispatch();
  // let [quadrants, setQuadrants] = useState([]);
  let canvas = useRef();
  let link = useRef();

  useEffect(() => {
    fetch(`https://sketch-connect-be.onrender.com/sessions/${current._id}`, {
      method: "GET"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((response) => {
        return make_base(response.quadrants);
      })
      .then(() => {
        canvas.current.toBlob((blob) => {
          const sessionId = current._id;
          const image = new File([blob], "image.png", {
            type: "image/png"
          });
          dispatch(finalImageAsync({ sessionId, image }));
        }, "image/png");
      })
      .then(() => {
        dispatch(resetSession());
      })
      .catch((err) => console.log(`Failed to fetch session: ${err}`));
  }, [dispatch]);

  const make_base = (quadrants) => {
    return new Promise((resolve, reject) => {
      let context = canvas.current.getContext("2d");

      let images = [];
      let loadedCount = 0;

      const loadImages = () => {
        for (let i = 0; i < 4; i++) {
          images[i] = new Image();
          images[i].crossOrigin = "anonymous";
          images[i].src = quadrants[i];
          images[i].onload = function () {
            loadedCount++;
            if (loadedCount === 4) {
              drawImages();
              resolve();
            }
          };
          images[i].onerror = reject;
        }
      };

      const drawImages = () => {
        let imageWidth = canvas.current.width / 2;
        let imageHeight = canvas.current.height / 2;

        for (let i = 0; i < 4; i++) {
          let x = (i % 2) * imageWidth;
          let y = Math.floor(i / 2) * imageHeight;
          context.drawImage(images[i], x, y, imageWidth, imageHeight);
        }
      };

      loadImages();
    });
  };

  const downloadImage = (session) => {
    let link = document.createElement("a");
    link.download = `${session.name}.png`;
    link.href = canvas.current.toDataURL();
    link.click();
  };

  return (
    <div className="container">
      <div className="buttons-container">
        <div className="buttons-top">
          <h2 className="page-heading">What a masterpiece!</h2>
          <button
            id="download-btn"
            ref={link}
            onClick={() => downloadImage(current)}
          >
            Download
          </button>
          <button id="share-btn">Share</button>
        </div>

        <div className="buttons-bottom" onClick={() => navigate("/")}>
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
      <canvas className="drawing-container" ref={canvas}></canvas>
      {/*
<div className="drawing-container">
        {quadrants?.map((quadrant) => {
          return (
            <img id="drawing" src={quadrant} alt="drawing" key={quadrant}></img>
          )
        })}
      </div>
  */}
    </div>
  );
};

export default CompletePage;
