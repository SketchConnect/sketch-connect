import { MongoClient } from "mongodb";

const connectionString = process.env.DB_URI || "";

let db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  const client = new MongoClient(connectionString);
  try {
    await client.connect();
    return client.db("sketchconnectDB");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect to the database.");
  }
}
