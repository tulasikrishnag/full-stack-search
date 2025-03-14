import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { startServer } from "./db/server";
import { gracefulShutdown } from "./lib/db";
import { hotelRouter } from "./routes/hotel";
dotenv.config();

if (process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL) {
  await startServer();
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", hotelRouter);
app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Performing graceful shutdown.");
  await gracefulShutdown();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Performing graceful shutdown.");
  await gracefulShutdown();
  process.exit(0);
});
