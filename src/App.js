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
        <ThemeProvider theme={theme}>
            <Header></Header>

            <Homepage />
        </ThemeProvider>
    );
}

export default App;
