import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/**
    GET /users
    gets a list of all the users

    Request body parameters:
        - none

    Returns:
        - an array containing all the user objects in the database
*/
router.get("/", async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

export default router;
