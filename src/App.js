import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "./App.css";
import Header from "./components/header";
import Homepage from "./pages/homepage";
import AboutPage from "./pages/AboutPage";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Chilanka", "cursive"].join(","),
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
