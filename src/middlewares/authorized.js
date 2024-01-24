import handleResponse from "../helpers/response.helpers.js";
import commentService from "../services/comment.service.js";
import postService from "../services/post.service.js";

export const isCommenter = async (req, res, next) => {
  try {
    const user = req.user;
    const { id: commentId } = req.params;

    const comment = await commentService.findById(commentId);

    if (!comment) {
      return handleResponse(404, "comment not found", {}, res);
    }
    console.log(String(comment.user), String(user?._id));
    console.log(String(comment.user) !== String(user?._id));

    if (String(comment.user) !== String(user?._id)) {
      return handleResponse(400, "Access denied", {}, res);
    }

    next();
  } catch (error) {
    return next(error);
  }
};

export const isAuthor = async (req, res, next) => {
  try {
    const user = req.user;
    const { postId } = req.params;

    const post = await postService.findById(postId);

    if (!post) {
      return handleResponse(404, "post not found", {}, res);
    }

    if (String(post.createdBy) !== String(user?._id)) {
      return handleResponse(400, "Access denied", {}, res);
    }

    next();
  } catch (error) {
    return next(error);
  }
};
