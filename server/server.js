import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import mongoose from "mongoose";

import sessions from "./routes/sessions.js";
import users from "./routes/users.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/sessions", sessions);
app.use("/users", users);

const connectionString = process.env.DB_URI || "";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    throw new Error("Failed to connect to the database.");
  });
