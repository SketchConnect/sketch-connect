import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./page.css";
import "./homepage.css";
import Instructions from "../components/Instructions";
import { addPlayerAsync, addSessionAsync } from "../redux/session/thunks";
import { useNavigate } from "react-router-dom";
import { setSession } from "../redux/session/reducer";

function Homepage() {
  const currentSessionId = useSelector((state) => state.session._id);
  const tempUser = "648265d192b9bd82bbc849ed";
  let [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://sketch-connect-be.onrender.com")
      .then(() => {
        console.log("Server is awake");
        setLoading(false);
      })
      .catch((err) => console.log(`Failed to wake server: ${err}`));
  }, []);

  useEffect(() => {
    fetch("https://sketch-connect-be.onrender.com/sessions", {
      method: "GET"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((fetchedSessions) => {
        setSessions(fetchedSessions);
      })
      .catch((err) => console.log(`Failed to fetch sessions: ${err}`));
  }, []);

  useEffect(() => {
    if (currentSessionId) {
      navigate(`/waiting/${currentSessionId}`);
    }
  }, [currentSessionId, navigate]);

  const handleAddSession = (e) => {
    e.preventDefault();
    const newSession = {
      isPublic: true,
      status: "waiting",
      players: [tempUser]
    };
    dispatch(addSessionAsync(newSession)).then((session) => {
      let payload = { session: session.payload, userId: tempUser };
      dispatch(setSession(payload));
    });
  };

  const joinSession = (session) => {
    if (session.status === "waiting" && !session.players.includes(tempUser)) {
      dispatch(addPlayerAsync(session, tempUser));
      let payload = { session: session, userId: tempUser };
      dispatch(setSession(payload));
      console.log(currentSessionId)
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <img
          src={"assets/images/logo.png"}
          alt="loading"
          className="loading-image"
        />
        <div className="loading-text">
          <span>Loading</span>
          <span className="loading-dots">.</span>
          <span className="loading-dots">.</span>
          <span className="loading-dots">.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="content">
        {/* factor out as a component later, if necessary */}
        <div className="left-pane">
          <p id="join-session">Join a session</p>
          {sessions?.map((session) => (
            <button
              className="session-button"
              onClick={() => joinSession(session)}
            >
              <p className="session-text">Session {session._id}</p>
              <p className="session-text">{session.players.length}/4</p>
            </button>
          ))}
        </div>

        <div id="circle"></div>

        <div className="right-pane">
          <div id="placeholder">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Instructions />
            </div>
          </div>
          <button id="start-session-btn" onClick={handleAddSession}>
            START NEW SESSION
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
