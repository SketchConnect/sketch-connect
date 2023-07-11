import express from "express";
import User from "../models/user.js";
import Session from "../models/session.js";

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
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
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
    const user = await User.findById(req.params.id);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/**
 * GET /users/:id/past-drawings
 * Gets a user's past drawings.
 *
 * URL parameters:
 * - id (string): The ID of the user to retrieve.
 *
 * Request body parameters:
 * - none
 *
 * Returns:
 * - If the user is found, returns an array containing urls of the user's past drawings.
 * - If the user is not found, returns a 404 status code.
 */
router.get("/:id/past-drawings", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      const sessions = await Session.find({ _id: { $in: user.sessions } });
      const drawings = sessions.map((session) => session.finalImage);
      res.status(200).send(drawings);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
