import express from "express";
const userRouter = express.Router();
import { isAuthorized } from "../middlewares/authorize.middleware.js";
import userController from "../controllers/user.controllers.js";

userRouter.get("/", userController.findUsers);
userRouter.get("/:id", userController.findOneUser);
userRouter.put("/", isAuthorized, userController.updateUser);
userRouter.delete("/", isAuthorized, userController.deleteOneUser);
userRouter.get("/user", userController.findUserByFilter);

export default userRouter;
