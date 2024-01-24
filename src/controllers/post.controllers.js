import logger from "../config/logger.config.js";
import PostService from "../services/post.service.js";
import handleResponse from "../helpers/response.helpers.js";
import moment from "moment";
import postService from "../services/post.service.js";

export class PostController {
  async createPost(req, res) {
    logger.debug("Creating post");
    try {
      const user = req.user;
      const data = req.body;

      const uploadedFile = req?.files;
      console.log(uploadedFile);

      let post;
      // create post
      post = await PostService.createPost({
        title: data.title,
        body: data.body,
        createdBy: user?._id,
        // file: uploadedFile[0]?.path,
      });
      return handleResponse(201, "post created successfully", post, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findOnePost(req, res) {
    logger.debug("Fetching single post");
    try {
      const postId = req.params.postId;

      const postRes = await PostService.findById({
        _id: postId,
      });

      const { comments, ...post } = postRes?._doc;

      let response = {};

      if (post.deleted === true) {
        (response.message = "post deleted"), (response.comments = comments);
      } else {
        response = postRes;
      }

      return handleResponse(
        200,
        "post fetched successfully",
        { post: response },
        res
      );
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findAllPosts(req, res) {
    logger.debug("Fetching all posts");
    try {
      const { limit, page } = req.query;
      const post = await PostService.findAll({}, { limit, page });

      return handleResponse(200, "post fetched successfully", post, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findAuthorPosts(req, res) {
    logger.debug("Fetching author's posts");
    try {
      const { limit, page } = req.query;
      const post = await PostService.findAll(
        {
          createdBy: req.user?._id,
        },
        { limit, page }
      );

      return handleResponse(200, "post fetched successfully", post, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async updateOnePost(req, res) {
    logger.debug("Updating post");
    try {
      const postExists = await PostService.findById(req.params.postId);

      if (!postExists) {
        return handleResponse(404, "post not found", null, res);
      }

      await PostService.update(req.params.postId, req.body, { new: true });

      return handleResponse(200, "post updated successfully", {}, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async deleteOnePost(req, res) {
    logger.debug("Deleting post");
    try {
      const postId = req.params.postId;

      const post = await postService.findOne({
        _id: postId,
      });

      if (!post) {
        return handleResponse(404, "post not found", {}, res);
      }

      await PostService.update(postId, {
        $set: {
          deleted: true,
          deletedAt: moment(Date.now()).format(),
        },
      });

      return handleResponse(200, "post deleted successfully", {}, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }
}

export default new PostController();
