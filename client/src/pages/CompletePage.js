import React, { useRef, useEffect, useState } from "react";
import "./page.css";
import "./CompletePage.css";
import { useSelector, useDispatch } from "react-redux";
import { resetSession } from "../redux/session/reducer";
import { finalImageAsync, updateStatusAsync } from "../redux/session/thunks";
import { useNavigate } from "react-router-dom";
import {
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon
} from "react-share";
import { addSessionToPlayerAsync } from "../redux/user/thunks";

const CompletePage = () => {
  let navigate = useNavigate();
  const current = useSelector((state) => state.session);
  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  // let [quadrants, setQuadrants] = useState([]);
  let canvas = useRef();
  let link = useRef();
  let playerPerGame = current.players.length;
  let finalImageSrc = "https://sketchconnect.vercel.app/assets/images/logo.png"; // TODO assign to combined drawing

  useEffect(() => {
    dispatch(
      updateStatusAsync({ sessionId: current._id, status: "completed" }),
      addSessionToPlayerAsync({
        userId: currentUser._id,
        sessionId: current._id
      })
    );

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
        canvas.current.toBlob(
          (blob) => {
            const sessionId = current._id;
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
        // console.log(JSON.stringify(current))
        if (current.finalImage) {
          console.log("FINAL IMG: " + current.finalImage); // TODO - test if it's grabbing the new url
          finalImageSrc = current.finalImage;
        }

        dispatch(resetSession());
      })
      .catch((err) => console.log("Failed to fetch session: ", err));
  }, [dispatch]);

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
            onClick={() => downloadImage(current)}
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
    </div>
  );
};

export default CompletePage;
