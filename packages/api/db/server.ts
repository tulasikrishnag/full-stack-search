import { MongoMemoryServer } from "mongodb-memory-server";
import {seedData} from '../db/startAndSeedMemoryDB'
let mongoDbServer: MongoMemoryServer;

export const startServer = async (): Promise<void> => {
  mongoDbServer = await MongoMemoryServer.create({
    instance: {
      port: 3002,
    },
  });
  const uri = mongoDbServer.getUri();
  process.env.DATABASE_URL = uri;
  console.log("MongoMemoryServer started on", uri);
  await seedData()
};

export const stopServer = async (): Promise<void> => {
  if (mongoDbServer) {
    await mongoDbServer.stop();
    console.log("Successfully stopped mongoDb server");
  } else console.log("No mongoDb server found to stop");
};
