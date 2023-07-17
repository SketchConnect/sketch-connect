import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./page.css";
import "./homepage.css";
import Instructions from "../components/Instructions";
import { addPlayerAsync, addSessionAsync } from "../redux/session/thunks";
import { useNavigate } from "react-router-dom";
import { setSession } from "../redux/session/reducer";
import Modal from "../components/Modal";
import { motion } from "framer-motion";

function Homepage() {
  const currentSessionId = useSelector((state) => state.session._id);
  const currentUser = useSelector((state) => state.user._id);
  let [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionName, setSessionName] = useState("");
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
    setModalOpen(true);
  };

  const handleModalFormSubmit = (e) => {
    e.preventDefault();

    const newSession = {
      name: sessionName,
      isPublic: true,
      status: "waiting",
      players: [currentUser]
    };

    dispatch(addSessionAsync(newSession)).then((session) => {
      let payload = { session: session.payload, userId: currentUser };
      dispatch(setSession(payload));
      setModalOpen(false);
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const joinSession = (session) => {
    console.log("the user that wants to join the game is ", currentUser)
    if (session.status === "waiting" && !session.players.includes(currentUser)) {
      dispatch(addPlayerAsync({ session, player: currentUser }));
      let payload = { session: session, userId: currentUser };
      dispatch(setSession(payload));
      console.log(currentSessionId);
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
    <div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <h2>Create a new session</h2>
        <form onSubmit={handleModalFormSubmit}>
          <input
            type="text"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="Session name"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            Create Session
          </motion.button>
        </form>
      </Modal>
      <div className="page">
        <div className="content">
          {/* factor out as a component later, if necessary */}
          <div className="left-pane">
            <p id="join-session">Join a session</p>
            {sessions?.map((session) => {
              if (session.status === "waiting") {
                return (
                  <button
                    className="session-button"
                    key={session._id}
                    onClick={() => joinSession(session)}
                  >
                    <p className="session-text">{session.name}</p>
                    <p className="session-text">{session.players.length}/4</p>
                  </button>
                );
              }
              return null;
            })}
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
    </div>
  );
}

export default Homepage;
