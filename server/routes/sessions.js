import express from "express";
import Session from "../models/session.js";

const router = express.Router();

/**
 * GET /sessions
 * Gets a list of all the sessions.
 *
 * Request body parameters:
 * - none
 *
 * Returns:
 * - An array containing all the session objects in the database.
 */
router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find({});
    res.status(200).send(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).send({error});
  }
});

/**
 * POST /sessions
 * Creates a new game session.
 *
 * Request body parameters:
 * - isPublic (boolean): Determines if the session is public.
 * - status (string): The current status of the session. One of "waiting", "ongoing", "completed", or "cancelled".
 * - host (string): The host's ID, will be used to initialize the players array.
 *
 * Returns:
 * - A JSON object with a single property, id, which contains the ID of the newly created session.
 */
router.post("/", async (req, res) => {
  try {
    const newSession = new Session({
      isPublic: req.body.isPublic,
      status: req.body.status,
      players: [req.body.host],
      quadrant: [],
      finalImage: "",
    });
    const result = await newSession.save();
    res.status(200).send({ id: result._id });
  } catch (error) {
    console.error(error);
    res.status(500).send({error});
  }
});

export default router;
