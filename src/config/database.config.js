import mongoose from "mongoose";
import config from "../config/index.js";

// Set mongoose to stricquery to know whether mongoose should enforce a stric schema or not
mongoose.set("strictQuery", false);

// connect to Database
export const connectDB = async () => {
  await mongoose
    .connect(config.databaseURL, {})
    .then(() => {
      console.log("DB connection successful!");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Disconnect DB
export const disconnectDB = async () => {
  return await mongoose.disconnect();
};

// Export the database connection
export default {
  connectDB,
  disconnectDB,
};
