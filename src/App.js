import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import "./App.css";
import Header from "./components/header";
import Homepage from "./pages/homepage";

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
                <Route path='/' component={Homepage}></Route>
          </Switch>
        </BrowserRouter>
      </>
    );
}

export default App;
