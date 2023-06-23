import express from "express";
import { connectToDatabase } from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
 * GET /users
 * Gets a list of all the users.
 *
 * Request body parameters:
 * - none
 *
 * Returns:
 * - An array containing all the user objects in the database.
 */
router.get("/", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("users");
      const users = await collection.find({}).toArray();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

/**
 * GET /users/:id
 * Gets a user with the specified ID.
 *
 * URL parameters:
 * - id (string): The ID of the user to retrieve.
 *
 * Request body parameters:
 * - none
 *
 * Returns:
 * - If the user is found, returns the user object.
 * - If the user is not found, returns a 404 status code.
 */
router.get("/:id", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("users");
      const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
  
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

export default router;
