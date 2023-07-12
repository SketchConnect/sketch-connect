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
    res.status(500).send({ error });
  }
});

/**
 * GET /sessions/:id
 * Gets a session with the specified ID.
 *
 * URL parameter:
 * - id (string): The ID of the session to retrieve.
 *
 * Returns:
 * - If the session is found, returns the session object.
 * - If the session is not found, returns a 404 status code.
 **/
router.get("/:id", async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (session) {
      res.status(200).send(session);
    } else {
      res.status(400).send({ error: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

/**
 * DELETE /sessions/:id
 * Deletes a session with the specified ID.
 *
 * URL parameter:
 * - id (string): The ID of the session to delete.
 *
 * Returns:
 * - A 200 status code if deletion was successful.
 * - If the session is not found, returns a 404 status code.
 **/
router.delete("/:id", async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);

    if (session) {
      res.status(204).end();
    } else {
      res.status(404).send({ error: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

/**
 * POST /sessions
 * Creates a new game session.
 *
 * Request body parameters:
 * - isPublic (boolean): Determines if the session is public.
 * - status (string): The current status of the session. One of "waiting", "ongoing", "completed", or "cancelled".
 * - players (string array): Initializes the players array with host ID.
 *
 * Returns:
 * - A JSON object of newly created session.
 */
router.post("/", async (req, res) => {
  try {
    const newSession = new Session({
      isPublic: req.body.isPublic,
      status: req.body.status,
      players: req.body.players,
      quadrant: [],
      finalImage: ""
    });
    const result = await newSession.save();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

/**
 * PATCH /:id/upload-drawing
 * Uploads the session's drawing to Google Cloud Storage and updates the session's finalImage string with the public URL of the uploaded file.
 *
 * URL parameters:
 * - id (string): The ID of the session to update.
 *
 * Request body parameters:
 * - A multipart/form-data payload with a key of "img" and the value being the file to be uploaded.
 *
 * Returns:
 * - A JSON object with a single property, publicUrl, containing the public URL of the uploaded file.
 */
router.patch("/:id/upload-drawing", async (req, res) => {
  try {
    const imageUploadService = new ImageUploadService();
    const publicUrl = await imageUploadService.uploadFile(req, "drawings");

    const result = await Session.updateOne(
      { _id: req.params.id },
      { $set: { finalImage: publicUrl } }
    );

    if (result.nModified === 0) {
      return res.status(404).send({ error: "No session found with given id" });
    }

    return res.status(200).send({ publicUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export default router;
