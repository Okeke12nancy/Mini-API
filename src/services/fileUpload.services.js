import util from "util";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import config from "../config/index.js";

const version2 = cloudinary.v2;

version2.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary: version2,
});

export const parser = multer({
  storage,
});

export const uploadFile = util.promisify(parser.array("file", 3));
