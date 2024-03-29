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

/**
 * POST /users
 * Creates and stores a user object.
 *
 * URL parameters:
 * - none
 *
 * Request body parameters:
 * - _id: the UID of the signed in user
 * - email: the email of the signed in user
 * - name: the name of the signed in user
 * - profilePic: the url of the signed in user's profile picture
 */
router.post("/", async (req, res) => {
  try {
    const existingUser = await User.findById(req.body._id);

    if (existingUser) {
      return res.status(200).send(existingUser);
    }

    const newUser = new User({
      _id: req.body._id,
      oauthProvider: "Google",
      email: req.body.email,
      name: req.body.name,
      sessions: [],
      profilePic: req.body.profilePic
    });

    const result = await newUser.save();
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

/**
 * PATCH /:id
 * Updates existing user object.
 *
 * URL parameters:
 * - id (string): The ID of the user to update.
 *
 * Request body parameters:
 * - name: the new name to be updated
 * - email: the new email to be updated
 */
router.patch("/:id", async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      { $set: { name: req.body.name, email: req.body.email } }
    );

    if (result.nModified === 0) {
      return res.status(404).send({ error: "No user found with given id" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

/**
 * PATCH /:id/add-session
 * Adds session to user by updating existing user object.
 *
 * URL parameters:
 * - id (string): The ID of the user to update.
 *
 * Request body parameters:
 * - sessionId: the session id to be added
 */
router.patch("/:id/add-session", async (req, res) => {
  try {
    const userId = req.params.id;
    const { sessionId } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "No session found with given id" });
    }

    const sessionToAdd = {
      topic: session.topic,
      finalImage: session.finalImage
    };

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "No user found with given id" });
    }

    const duplicateSession = user.sessions.find(
      (s) =>
        s.topic === sessionToAdd.topic &&
        s.finalImage === sessionToAdd.finalImage
    );
    if (duplicateSession) {
      return res.status(200).send(user);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { sessions: sessionToAdd } },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

export default router;
