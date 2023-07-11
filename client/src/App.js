import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { AuthContextProvider } from "./context/AuthContext";

function useWindowSize() {
  const [size, setSize] = React.useState(0);
  React.useLayoutEffect(() => {
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
  const [open, isOpen] = React.useState(false);
  const width = useWindowSize();

  React.useEffect(() => {
    if (width < 1024) {
      isOpen(true);
    } else {
      isOpen(false);
    }
  }, [width]);

  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Header />
          <Routes>
          <Route exact path="/" component={Homepage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/waiting/:sessionId" component={WaitingPage} />
          <Route path="/game" component={GamePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/complete/:sessionId" component={CompletePage} />
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
