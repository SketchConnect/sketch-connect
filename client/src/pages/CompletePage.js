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
  //let [quadrants, setQuadrants] = useState([]); 
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
      //setQuadrants(response.quadrants);
      make_base(response.quadrants);
    })
    .then(() => {
      let dataURL =canvas.current.toDataURL();
      // def not the way to get file
      dispatch(finalImageAsync(current._id, dataURL))
    })
    .then(
      () => {
        dispatch(resetSession());
      }
    ).catch((err) => console.log(`Failed to fetch session: ${err}`));
  }, [dispatch])

  const make_base = (quadrants) => {
    let context = canvas.current.getContext('2d');
    console.log(quadrants)

    let images = [];
    let loadedCount = 0;
  
    const loadImages = () => {
      for (let i = 0; i < 4; i++) {
        images[i] = new Image();
        // uncomment after Martin set crossOrigin allow
        //images[i].crossOrigin="anonymous";
        images[i].src = quadrants[i];
        images[i].onload = function() {
          loadedCount++;
          if (loadedCount === 4) {
            drawImages();
          }
        };
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
      
      downloadImage();
    };
  
    loadImages();
  };

  const downloadImage = () => {
    fetch(canvas.current.toDataURL())
    .then((response) => {
      response.blob();
    })
    .then((blob) => {
      const objUrl = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.download = 'Image.png';
      link.href = objUrl; //canvas.current.toDataURL()
      link.click();
    })
  }
  

  return (
    <div className="container">
      <div className="buttons-container">
        <div className="buttons-top">
          <h2 className="page-heading">What a masterpiece!</h2>
          <button id="download-btn" ref={link} onClick={() => downloadImage()}>Download</button>
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
