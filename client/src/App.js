import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Homepage from "./pages/homepage";
import AboutPage from "./pages/AboutPage";
import WaitingPage from "./pages/WaitingPage";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import CompletePage from "./pages/CompletePage";

import { createTheme, ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "./context/AuthContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Chilanka", "cursive"].join(","),
  },
});

function App() {
  return (
    <div>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
