import express from "express";
import app from "./app.js";
import config from "./config/index.js";
import logger from "./helpers/logger.helpers.js";
import { connectDB, disconnectDB } from "./config/database.config.js";

async function startServer() {
  const expressApp = express();

  app({ app: expressApp });

  try {
    await connectDB();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  expressApp
    .listen(config.port, () => {
      console.log(`
      ################################################
      🪐  Server listening on port: ${config.port} 🪐
      ################################################
    `);
      logger.info(`Server started`);
    })
    .on("error", async (err) => {
      logger.error(err);
      await disconnectDB();
      process.exit(1);
    });
}

startServer()
  .then(() => {
    console.log("Server started...");
  })
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (reason, p) => {
  console.log(p, reason);
  logger.error("Unhandled Rejection at: Promise ", p, reason);
  // application specific logging, throwing an error, or other logic here
});
