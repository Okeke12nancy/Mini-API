import handleResponse from "../helpers/response.helpers.js";

import { verifyEmail, passwordChange } from "../services/email.services.js";
import { hash, verifyHash } from "../helpers/index2.helpers.js";
import { generateJwtToken, tokenVerifier } from "../helpers/jwt.helpers.js";
import UserService from "../services/user.service.js";
import { generateRandomAvatar } from "./../middlewares/avatar.middlewares.js";
import moment from "moment";
import logger from "../helpers/logger.helpers.js";

class AuthController {
  // Register a User
  async register(req, res) {
    try {
      const { email, password } = req.body;
      logger.info(`${email} --- ${password}`);

      const passwordHash = await hash(password);
      const avatar = await generateRandomAvatar(email);

      const createData = {
        ...req.body,
        password: passwordHash,
        avatar,
      };

      const user = await UserService.create(createData);

      // generate token
      const token = await generateJwtToken({
        userId: user?._id,
        tokenExpiry: moment(Date.now()).add(15, "minutes"),
      });

      const { firstName, lastName } = user;

      // firstName, lastName, userEmail, token
      const link = `${process.env.BASE_URL}/api/v1/auth/verify/?token=${token}`;
      await verifyEmail(firstName, lastName, email, link);

      return handleResponse(
        201,
        "user registered successfully. check email to verify token",
        user,
        res
      );
    } catch (e) {
      console.log(e);
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  // Log In User
  async login(req, res) {
    logger.debug("Logging in user");
    try {
      const { email, password } = req.body;

      const user = await UserService.findOne(
        {
          email,
        },
        "+password"
      );

      console.log(user);

      if (!user) {
        return handleResponse(400, "invalid email or password", {}, res);
      }

      const passwordMatch = await verifyHash(user.password, password);

      if (!passwordMatch) {
        return handleResponse(400, "invalid email or password", {}, res);
      }

      if (!user.verified) {
        return handleResponse(400, "please verify your email", {}, res);
      }

      // generate token
      const token = await generateJwtToken({
        userId: user?._id,
        email: user.email,
        verified: user.verified,
      });

      console.log(token);

      return handleResponse(200, "login successful", { user, token }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  // Already logged in user.
  async changePassword(req, res) {
    logger.debug("Changing user password");
    try {
      const { password, newPassword, confirmNewPassword } = req.body;

      if (newPassword !== confirmNewPassword) {
        return handleResponse(400, "Password mismatch", {}, res);
      }

      const user = req.user;

      // check if old password is correct
      const isCorrect = await verifyHash(user?.password, password);

      if (!isCorrect) {
        return handleResponse(400, "incorrect password", {}, res);
      }

      // hash new password
      const newPasswordHash = await hash(newPassword);

      // update user password
      await UserService.update(
        { _id: user._id },
        { password: newPasswordHash }
      );

      await passwordChange(user?.email);
      return handleResponse(200, "password changed successfully", {}, res);
    } catch (e) {
      logger.error(e);
      console.log(e);
      return handleResponse(500, e, null, res);
    }
  }

  // Verify Email Token
  async verifyUserEmail(req, res) {
    try {
      const { token } = req.query;

      const {
        data: { userId, tokenExpiry },
      } = await tokenVerifier(token);

      if (moment(Date.now()) > moment(tokenExpiry)) {
        return handleResponse(400, "Verification token expired", {}, res);
      }

      await UserService.update(userId, {
        verified: true,
        verifiedAt: moment(Date.now()).format(),
      });

      return handleResponse(200, "Email verified successfully", {}, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  // Resent verify email Token
  async resendVerifyUserEmail(req, res) {
    try {
      const { email } = req.body;

      const user = await UserService.findOne({ email });

      if (!user)
        return handleResponse(
          200,
          "Email verification resent successfully",
          {},
          res
        );

      // generate token
      const token = await generateJwtToken({
        userId: user?._id,
        tokenExpiry: moment(Date.now()).add(15, "minutes"),
      });

      const { firstName, lastName } = user;

      // firstName, lastName, userEmail, token

      const link = `${process.env.BASE_URL}/api/v1/auth/verify/?token=${token}`;
      await verifyEmail(firstName, lastName, email, link);

      return handleResponse(
        200,
        "Email verification resent successfully",
        {},
        res
      );
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }
}

export default new AuthController();
