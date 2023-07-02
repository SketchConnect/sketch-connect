import express from "express";
import { connectToDatabase } from "../db/conn.js";
import ImageUploadService from "../services/ImageUploadService.js";
import { ObjectId } from "mongodb";

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
    const db = await connectToDatabase();
    const collection = db.collection("sessions");
    const sessions = await collection.find({}).toArray();
    return res.status(200).send(sessions);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
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
  try {
    const db = await connectToDatabase();
    const collection = db.collection("sessions");
    const newDocument = {
      isPublic: req.body.isPublic,
      status: req.body.status,
      players: [req.body.host],
      quadrant: [],
      finalImage: "",
    };
    const result = await collection.insertOne(newDocument);
    return res.status(200).send({ id: result.insertedId });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
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

    const db = await connectToDatabase();
    const collection = db.collection("sessions");
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDocument = { $set: { finalImage: publicUrl } };
    const result = await collection.updateOne(filter, updateDocument);

    if (result.modifiedCount === 0) {
      return res.status(404).send({ error: "No session found with given id" });
    }

    return res.status(200).send({ publicUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export default router;
