import logger from "../config/logger.config.js";
import handleResponse from "../helpers/response.helpers.js";
import commentService from "../services/comment.service.js";
import postService from "../services/post.service.js";
import userService from "../services/user.service.js";

export class UserOnlyController {
  async findUserPostsById(req, res) {
    logger.debug("Finding all posts by one user");
    try {
      const { limit, page } = req.query;
      const userId = req.params.id;
      const user = await userService.findById(userId);
      if (!user) {
        return handleResponse(404, "user not found", {}, res);
      }

      // use the populate method to get all posts by the user
      const posts = await postService.findAll(
        { createdBy: userId },
        { limit, page }
      );
      return handleResponse(200, "user posts found", { posts }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }
  async findOneUserPostById(req, res) {
    logger.debug("Finding one post by one user");
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;

      const post = await postService.findOne({
        _id: postId,
        createdBy: userId,
      });
      if (!post) {
        return handleResponse(404, "post not found", {}, res);
      }
      return handleResponse(200, "user posts found", { post }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findOneUserComments(req, res) {
    logger.debug("Finding one comment in a post by one user ");
    try {
      const comment = await commentService.findOne({
        post: req.params.postId,
        user: req.params.userId,
        _id: req.params.commentId,
      });

      if (!comment) {
        return handleResponse(404, "No comment found", {}, res);
      }
      return handleResponse(200, "comment found", { comment }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }
  async findUserCommentById(req, res) {
    logger.debug("Finding all comments by one user in a post");
    try {
      const comments = await commentService.findAll({
        post: req.params.postId,
        user: req.params.userId,
      });

      return handleResponse(200, "comments found", { comments }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findUserByUserByUsername(req, res) {
    logger.debug("Finding a user by Username");
    try {
      const { userName } = req.params;

      const user = await userService.findOne({
        userName: { $regex: userName, $options: "i" },
      });

      if (!user) {
        return handleResponse(404, "user not found", {}, res);
      }

      return handleResponse(200, "user found", { user }, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findPostsByUserByUsername(req, res) {
    logger.debug("Finding posts by Username");
    try {
      const { limit, page } = req.query;
      const { userName } = req.params;

      const user = await userService.findOne({
        userName: { $regex: userName, $options: "i" },
      });

      if (!user) {
        return handleResponse(404, "user not found", {}, res);
      }

      const posts = await postService.findAll(
        { createdBy: user?._id },
        { limit, page }
      );

      return handleResponse(200, "posts found", posts, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }
}

export default new UserOnlyController();
