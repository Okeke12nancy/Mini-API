import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { addMinutes } from "./date.js";

export async function generateJwtToken(data, expiry = 720 * 4) {
  const exp = addMinutes(new Date(), expiry);

  return jwt.sign(
    {
      data,
      exp: exp.getTime() / 1000,
    },
    config.jwtSecret
  );
}

export const tokenVerifier = async (authToken) => {
  return jwt.verify(authToken, config.jwtSecret);
};
