import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./page.css";
import "./homepage.css";
import Instructions from "../components/Instructions";
import { addUserAsync } from "../redux/user/thunks";
import { addSessionAsync, getSessionsAsync } from "../redux/session/thunks";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const tempUser = "648265d192b9bd82bbc849ed"
  let [sessions, setSessions] = useState([]);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    fetch("https://sketch-connect-be.onrender.com")
      .then(() => console.log("Server is awake"))
      .catch((err) => console.log(`Failed to wake server: ${err}`));
  }, []);

  useEffect(() => {
    fetch("https://sketch-connect-be.onrender.com/sessions", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((fetchedSessions) => {
        setSessions(fetchedSessions);
      }).catch(err => console.log(`Failed to fetch sessions: ${err}`));
  }, []);

  const handleAddSession = (e) => {
    e.preventDefault();
    const newSession = {
      isPublic: true,
      status: "waiting",
      players: [tempUser]
    };
    dispatch(addSessionAsync(newSession));
  };

  const joinSession = (session) => {
    if (session.status === "waiting" && session.players.length < 4) {
      dispatch(addUserAsync(session, tempUser));
      history.push(`/waiting/${session.id}`);
    }
  };

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
