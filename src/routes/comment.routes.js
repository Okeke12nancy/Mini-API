import express from "express";
const commentRouter = express.Router();

import { isAuthorized } from "../middlewares/authorize.middleware.js";
import commentController from "../controllers/comment.controllers.js";
import { isCommenter } from "../middlewares/authorized.js";

import { CommentValidator } from "../validations/comment.validation.js";
const commentValidator = new CommentValidator();

commentRouter.post(
  "/",
  isAuthorized,
  commentValidator.comment(),
  commentController.createComment
);
commentRouter.get("/", isAuthorized, commentController.findAllComment);
commentRouter.get("/:id", isAuthorized, commentController.findOneComment);
commentRouter.patch(
  "/:id",
  isAuthorized,
  isCommenter,
  commentController.updateOneComment
);
commentRouter.delete(
  "/:id",
  isAuthorized,
  isCommenter,
  commentController.delete
);

export default commentRouter;
