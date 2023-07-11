import express from "express";
import User from "../models/user.js";

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

router.post("/", async (req, res) => {
  try {
    const existingUser = await User.findOne({ oauthID: req.body.oauthID });

    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    const newUser = new User({
      oauthProvider: "Google",
      oauthID: req.body.uid,
      email: req.body.email,
      name: req.body.displayName,
      sessions: [],
      profilePic: req.body.photoURL
    });

    const result = await newUser.save();
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
