import express from "express";
import usersOnlycontrollers from "../controllers/usersOnlycontrollers.js";
const userOnlyRouter = express.Router();
// User Only
userOnlyRouter.get("/:id/posts", usersOnlycontrollers.findUserPostsById);
userOnlyRouter.get(
  "/:userId/posts/:postId",
  usersOnlycontrollers.findOneUserPostById
);

userOnlyRouter.get(
  "/:userId/comments/:commentId/posts/:postId",
  usersOnlycontrollers.findOneUserComments
);

userOnlyRouter.get(
  "/:userId/posts/:postId/comments",
  usersOnlycontrollers.findUserCommentById
);

userOnlyRouter.get(
  "/@:userName",
  usersOnlycontrollers.findUserByUserByUsername
);

userOnlyRouter.get(
  "/posts/@:userName",
  usersOnlycontrollers.findPostsByUserByUsername
);

export default userOnlyRouter;
