import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessionAsync } from "../redux/session/thunks";

function ImageCard({ sessionId }) {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSessionAsync(sessionId));
  }, [sessionId, dispatch]);

  return (
    <div className="image-card">
      <img src={session.finalImage} alt="Image" />
    </div>
  );
}

export default ImageCard;
