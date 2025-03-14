import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import { stopServer } from "../db/server";

dotenv.config();

let client: MongoClient;
let dbConnection: Db;

export const getConnection = async () => {
  const uri = process.env.DATABASE_URL;
  client = new MongoClient(uri as string, {
    minPoolSize: parseInt(process.env.DB_CONNECTION_MIN_POOL_SIZE || "5"),
    maxPoolSize: parseInt(process.env.DB_CONNECTION_MAX_POOL_SIZE || "10"),
  });
  await client.connect();
  dbConnection = client.db();
  return dbConnection;
};

export const closeConnection = async () => {
  await client.close();
};

export const gracefulShutdown = async () => {
  await closeConnection();
  if (process.env.NODE_ENV === "development") {
    await stopServer();
  }
};
