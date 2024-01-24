import moment from "moment";
import logger from "../helpers/logger.helpers.js";
import handleResponse from "../helpers/response.helpers.js";
import commentService from "../services/comment.service.js";
import CommentService from "../services/comment.service.js";
import PostService from "../services/post.service.js";
import UserService from "../services/user.service.js";

export class CommentController {
  async createComment(req, res) {
    logger.debug("Creating comment");
    try {
      const data = req.body;
      const user = req.user;

      // add comment to a post
      const comment = await CommentService.createOne({
        body: data.body,
        user: user._id,
        post: data.post,
      });

      if (comment) {
        await PostService.update(data.post, {
          $push: { comments: comment?.id },
        });
      }

      // if the comment has an image upload the image and update the comment model

      return handleResponse(
        201,
        "comment created successfully",
        { comment },
        res
      );
    } catch (e) {
      console.log(e);
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findOneComment(req, res) {
    logger.debug("Fetching comment");
    try {
      const { id: commentId } = req.params;

      const comment = await CommentService.findById(commentId);

      if (!comment || comment?.deleted === true) {
        return handleResponse(
          404,
          "comment does not exist or has been deleted",
          null,
          res
        );
      }

      return handleResponse(200, "comment fetched successfully", comment, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e);
    }
  }

  async findAllComment(req, res) {
    logger.debug("Fetching comments");
    try {
      const comments = await commentService.findAll({
        user: req.user?._id,
      });

      return handleResponse(
        200,
        "comments fetched successfully",
        comments,
        res
      );
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async updateOneComment(req, res) {
    logger.debug("Updating Comment");
    try {
      const comment = await CommentService.findById(req.params.id);

      if (!comment) {
        return res.json({
          msg: "comment not found",
          success: false,
        });
      }

      const updatedComment = await CommentService.updateOne(
        req.params.commentId,
        { ...req.body }
      );

      return handleResponse(
        200,
        "comment created successfully",
        updatedComment,
        res
      );
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async delete(req, res) {
    logger.debug("Deleting comment");
    try {
      const comment = await commentService.findById(req.params.id);

      if (!comment) {
        return res.json({
          msg: "Comment not found",
          success: false,
        });
      }

      await commentService.updateOne(req.params.id, {
        deleted: true,
        deletedAt: moment(Date.now()).format(),
      });

      return handleResponse(200, "comment deleted successfully", {}, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }
}

export default new CommentController();
