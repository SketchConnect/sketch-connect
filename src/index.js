import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Homepage from "./pages/Homepage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap"
            rel="stylesheet"
        />
        <Homepage />
    </React.StrictMode>
);
