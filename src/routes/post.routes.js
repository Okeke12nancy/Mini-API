import express from "express";
const postRouter = express.Router();
import postController from "../controllers/post.controllers.js";
import { isAuthorized } from "../middlewares/authorize.middleware.js";
import { uploadFile } from "../services/fileUpload.services.js";
import { isAuthor } from "../middlewares/authorized.js";

import { PostValidator } from "../validations/post.validations.js";
const postValidator = new PostValidator();

postRouter.post(
  "/",
  isAuthorized,
  postValidator.post(),
  postController.createPost
);
postRouter.get("/", postController.findAllPosts);
postRouter.get("/all/by-author", isAuthorized, postController.findAuthorPosts);
postRouter.get("/:postId", isAuthorized, postController.findOnePost);
postRouter.patch(
  "/:postId",
  isAuthorized,
  isAuthor,
  postController.updateOnePost
);
postRouter.delete(
  "/:postId",
  isAuthorized,
  isAuthor,
  postController.deleteOnePost
);

export default postRouter;
