import express from "express";
import db from "../db/conn.js";

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
    let collection = await db.collection("sessions");
    let sessions = await collection.find({}).toArray();
    res.status(200).send(sessions);
});

/**
 * POST /sessions
 * Creates a new game session.
 *
 * Request body parameters:
 * - isPublic (boolean): Determines if the session is public.
 * - status (string): The current status of the session. One of "waiting", "ongoing", "completed", or "cancelled".
 * - players (array): An array of player ids. Will be initialized with the host's id.
 * - quadrant (array): Used to store links to each of the images, initially empty.
 * - finalImage (string): Used to store the final image's URL or data, initially empty.
 *
 * Returns:
 * - A JSON object with a single property, id, which contains the ID of the newly created session.
 */
router.post("/", async (req, res) => {
    let newDocument = {
        isPublic: req.body.isPublic,
        status: req.body.status,
        players: [req.body.host],
        quadrant: [],
        finalImage: "",
    };
    let collection = await db.collection("sessions");
    let result = await collection.insertOne(newDocument);
    res.status(200).send({ id: result.insertedId });
});

export default router;
