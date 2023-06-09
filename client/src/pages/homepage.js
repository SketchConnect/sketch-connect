import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./page.css";
import "./homepage.css";
import Instructions from "../components/Instructions";
import { addPlayer, addSession, setCurrentSession } from "../redux/actions";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const sessions = useSelector((state) => state.sessions);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    fetch("https://sketch-connect-be.onrender.com")
      .then(() => console.log("Server is awake"))
      .catch((err) => console.log(`Failed to wake server: ${err}`));
  }, []);

  const handleAddSession = () => {
    dispatch(addSession());
  };

  const joinSession = (session) => {
    if (session.status === "waiting" && session.players.length < 4) {
      dispatch(addPlayer(session.id));
      dispatch(setCurrentSession(session.id));
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
              <p className="session-text">Session {session.id}</p>
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
