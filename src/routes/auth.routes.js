import express from "express";
const authRouter = express.Router();

import authController from "../controllers/auth.controllers.js";

import { isAuthorized } from "../middlewares/authorize.middleware.js";
import { AuthValidator } from "../validations/auth.validations.js";
const authValidator = new AuthValidator();

// Create a new account
authRouter.post("/register", authValidator.register(), authController.register);

// Sign in to account
authRouter.post("/login", authValidator.login(), authController.login);

// Verify Email
authRouter.get("/verify", authController.verifyUserEmail);

// Resend Verification Email
authRouter.post("/resend", authController.resendVerifyUserEmail);

// Reset password , change uour password
authRouter.post(
  "/change-password",
  isAuthorized,
  authController.changePassword
);

export default authRouter;
