import express from "express";
import dotenv from "dotenv";
import config from "../config/index.js";
dotenv.config();

const docRouter = express.Router();

// documentation
docRouter.get("/", async (req, res) => {
  return res.redirect(config.documentation);
});

export default docRouter;
