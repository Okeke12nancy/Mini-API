import bcrypt from "bcryptjs";
import pkg from "mongoose";
import { addMinutes } from "./date.js";
const { Types } = pkg;

//hash
export async function hash(param) {
  return await bcrypt.hash(param, 12);
}

//verify hash
export async function verifyHash(hashedPram, param) {
  return await bcrypt.compare(param, hashedPram);
}

//get current timestamp
export async function get_current_timestamp(day = 0) {
  let old_date = new Date();

  let date = new Date(old_date.setDate(old_date.getDate() + day));

  return dayjs(date, "YYYY-MM-DD HH:mm:ss.SSS").toDate();
}

export const generateToken = async (length = 6, minutes = 5) => {
  if (length <= 0) {
    length = 6;
  }

  if (minutes <= 0) {
    minutes = 5;
  }

  let token = Math.floor(
    10 ** (length - 1) + Math.random() * (10 ** (length - 1) * 9)
  );
  const hashToken = await hash(token.toString());
  const tokenExpiry = addMinutes(new Date(), minutes);

  return {
    token,
    hashToken,
    tokenExpiry,
  };
};

export const convertToObjectId = (id) => {
  try {
    return new Types.ObjectId(id);
  } catch (error) {
    return id;
  }
};

export const nilObjectId = () => {
  return new Types.ObjectId("000000000000000000000000");
};

export function headerConfig(auth, contentType = "application/json") {
  return {
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-type": contentType,
    },
  };
}

export const generateUniqueString = (length = 6) => {
  if (length <= 0) {
    length = 6;
  }

  return Math.floor(
    10 ** (length - 1) + Math.random() * (10 ** (length - 1) * 9)
  );
};
