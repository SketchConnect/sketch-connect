import React, { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Homepage from "./pages/homepage";
import AboutPage from "./pages/AboutPage";
import WaitingPage from "./pages/WaitingPage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import { Modal } from "@mui/material";
import CompletePage from "./pages/CompletePage";
import Warning from "./components/Warning";

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
    <>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/waiting/:sessionId" component={WaitingPage} />
          <Route path="/game" component={GamePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/complete/:sessionId" component={CompletePage} />
        </Switch>
      </BrowserRouter>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={open}
        onClose={() => isOpen(false)}
      >
        <Warning></Warning>
      </Modal>
    </>
  );
}

export default App;
