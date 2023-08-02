import React, { useRef, useEffect, useState } from "react";
import "./page.css";
import "./CompletePage.css";
import { useSelector, useDispatch } from "react-redux";
import { resetSession } from "../redux/session/reducer";
import {
  finalImageAsync,
  updateStatusAsync,
  getSessionAsync
} from "../redux/session/thunks";
import { useNavigate } from "react-router-dom";
import {
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon
} from "react-share";
import { addSessionToUserAsync } from "../redux/user/thunks";
import { setLocation } from "../redux/app/reducer";
import { LOCATION } from "../util/constant";

const CompletePage = () => {
  let navigate = useNavigate();
  const currentSession = useSelector((state) => state.session);
  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  // let [quadrants, setQuadrants] = useState([]);
  let canvas = useRef();
  let link = useRef();
  let playerPerGame = currentSession.players.length;
  const [finalImageSrc, setFinalImageSrc] = useState(
    "https://sketchconnect.vercel.app/assets/images/logo.png"
  );

  useEffect(() => {
    dispatch(
      addSessionToUserAsync({
        userId: currentUser._id,
        sessionId: currentSession._id
      })
    );
    dispatch(
      updateStatusAsync({ sessionId: currentSession._id, status: "completed" })
    );

    fetch(
      `https://sketch-connect-be.onrender.com/sessions/${currentSession._id}`,
      {
        method: "GET"
      }
    )
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
        canvas.current.toBlob(
          (blob) => {
            const sessionId = currentSession._id;
            const image = new File([blob], "image.png", {
              type: "image/png"
            });
            dispatch(finalImageAsync({ sessionId, image }));
          },
          "image/png",
          1
        );
      })
      .then(() => {
        dispatch(getSessionAsync(currentSession._id));
        if (currentSession.finalImage) {
          setFinalImageSrc(currentSession.finalImage);
        }

        //dispatch(resetSession());
      })
      .catch((err) => console.error("Failed to fetch session: ", err));
  }, [currentSession._id, currentUser._id, dispatch]);

  const make_base = (quadrants) => {
    return new Promise((resolve, reject) => {
      let context = canvas.current.getContext("2d");

      let images = [];
      let loadedCount = 0;

      const loadImages = () => {
        for (let i = 0; i < playerPerGame; i++) {
          images[i] = new Image();
          images[i].crossOrigin = "anonymous";
          images[i].src = quadrants[i];
          images[i].onload = function () {
            loadedCount++;
            if (loadedCount === playerPerGame) {
              drawImages();
              resolve();
            }
          };
          images[i].onerror = reject;
        }
      };

      const drawImages = () => {
        canvas.current.width = 1600;
        canvas.current.height = 1200;
        let imageWidth = canvas.current.width / 2;
        let imageHeight = canvas.current.height / 2;

        for (let i = 0; i < playerPerGame; i++) {
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
    try {
      link.href = canvas.current.toDataURL();
    } catch (err) {
      console.error("Failed to download image: ", err);
    }
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
            onClick={() => downloadImage(currentSession)}
          >
            Download
          </button>
          <div className="socials-share">
            <div id="share-btn">Share 👇</div>
            <div className="social-btns">
              <EmailShareButton
                url={finalImageSrc}
                subject="Checkout our SketchConnect masterpiece! 🎨🧩🪄"
              >
                <EmailIcon size={50} round />
              </EmailShareButton>
              <TwitterShareButton
                url={finalImageSrc}
                title="Checkout our SketchConnect masterpiece! 🎨🧩🪄"
              >
                <TwitterIcon size={50} round />
              </TwitterShareButton>
              <PinterestShareButton
                url={finalImageSrc}
                media={finalImageSrc}
                description="Checkout our SketchConnect masterpiece! 🎨🧩🪄"
              >
                <PinterestIcon size={50} round />
              </PinterestShareButton>
            </div>
          </div>
        </div>

        <div
          className="buttons-bottom"
          onClick={() => {
            dispatch(setLocation(LOCATION.HOME));
            navigate("/");
          }}
        >
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
    </div>
  );
};

export default CompletePage;
