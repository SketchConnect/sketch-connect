// conn.js (Connection Module)

import { MongoClient } from "mongodb";

const connectionString = process.env.DB_URI || "";

export async function connectToDatabase() {
  const client = new MongoClient(connectionString);
  try {
    await client.connect();
    return client.db("sketchconnectDB");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect to the database.");
  }
}
