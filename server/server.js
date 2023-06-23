import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import sessions from "./routes/sessions.js";
import users from "./routes/users.js";
import { connectToDatabase } from "./db/conn.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/sessions", sessions);
app.use("/users", users);

// start the Express server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
