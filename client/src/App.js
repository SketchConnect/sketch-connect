import React, { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
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

  useEffect(() => {
    if (width < 1024) {
      isOpen(true);
    } else {
      isOpen(false);
    }
  }, [width]);
  return (
    <div>
      <BrowserRouter>
<<<<<<< HEAD
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/waiting/:sessionId" component={WaitingPage} />
          <Route path="/game" component={GamePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/waitforturn/:sessionId" component={WaitingTurnPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/complete/:sessionId" component={CompletePage} />
        </Switch>
=======
        <AuthContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/waiting/:sessionId" element={<WaitingPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/complete/:sessionId" element={<CompletePage />} />
          </Routes>
        </AuthContextProvider>
>>>>>>> 4c69392dcfdc0da303c4833898501e9640614600
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
