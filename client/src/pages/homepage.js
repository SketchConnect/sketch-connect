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
import { Avatar } from "@mantine/core";
import topicJson from "./topics.json";
import { setLocation } from "../redux/app/reducer";
import { LOCATION } from "../util/constant";

function Homepage() {
  const currentSessionId = useSelector((state) => state.session._id);
  const currentUser = useSelector((state) => state.user);
  let [sessions, setSessions] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const topics = topicJson.topics;

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
      .catch((err) => console.error("Failed to fetch sessions:", err));
  }, []);

  useEffect(() => {
    if (currentSessionId) {
      dispatch(setLocation(LOCATION.WAITING));
      navigate(`/waiting/${currentSessionId}`, {
        state: { fromHomePage: true }
      });
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
      players: [],
      topic: topics[Math.floor(Math.random() * topics.length)]
    };

    dispatch(addSessionAsync(newSession)).then((session) => {
      joinSession(session.payload.session);
      setModalOpen(false);
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const joinSession = (session) => {
    if (
      session.status === "waiting" &&
      !session.players.includes(currentUser._id) &&
      session.players.length < 4
    ) {
      let payload = { session: session, userId: currentUser._id };
      dispatch(setSession(payload));
      dispatch(addPlayerAsync({ session, player: currentUser._id }));
    }
  };

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
            minLength="1"
            maxlength="20"
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
          <div className="left-pane">
            <div className="avatar">
              <Avatar
                src={currentUser.profilePic || "/assets/images/user.png"}
                size={100}
                radius={100}
              />
              <p id="user-name">{currentUser.name}</p>
            </div>
            <div id="line-break"></div>
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
