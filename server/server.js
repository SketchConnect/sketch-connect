// https://socket.io/docs/v4/
// https://mongoosejs.com/docs/
import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupChangeStreams } from "./changeStreams.js";

import sessions from "./routes/sessions.js";
import users from "./routes/users.js";

const PORT = process.env.PORT || 5050;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS", "HEAD"]
  }
});

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
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database");

    setupChangeStreams(io);

    io.on("connection", (socket) => {
      console.log(`New socket connected: ${socket.id}`);

      socket.on("join", (sessionId) => {
        console.log(`Socket ${socket.id} joined room: ${sessionId}`);
        socket.join(sessionId);
      });

      socket.on("leave", (sessionId) => {
        console.log(`Socket ${socket.id} left room: ${sessionId}`);
        socket.leave(sessionId);
      });
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    throw new Error("Failed to connect to the database.");
  });
