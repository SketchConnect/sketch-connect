import React, { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/homepage";
import AboutPage from "./pages/AboutPage";
import WaitingPage from "./pages/WaitingPage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import WaitingTurnPage from "./pages/WaitingTurnPage";
import CompletePage from "./pages/CompletePage";
import { Modal } from "@mui/material";
import Warning from "./components/Warning";

import { AuthContextProvider } from "./context/AuthContext";

function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function App() {
  const [open, isOpen] = useState(false);
  const width = useWindowSize();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sketch-connect-be.onrender.com")
      .then(() => {
        console.log("Server is awake");
        setLoading(false);
      })
      .catch((err) => console.log(`Failed to wake server: ${err}`));
  }, []);

  useEffect(() => {
    if (width < 1024) {
      isOpen(true);
    } else {
      isOpen(false);
    }
  }, [width]);

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
      <BrowserRouter>
        <AuthContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/waiting/:sessionId" element={<WaitingPage />} />
            <Route path="/game/turn/:sessionId" element={<GamePage />} />
            <Route path="/game/:sessionId" element={<WaitingTurnPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/complete/:sessionId" element={<CompletePage />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={open}
        onClose={() => isOpen(false)}
      >
        <Warning></Warning>
      </Modal>
    </div>
  );
}

export default App;
