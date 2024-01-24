import logger from "../config/logger.config.js";
import handleResponse from "../helpers/response.helpers.js";
import userService from "../services/user.service.js";
import moment from "moment";
export class UserController {
  async updateUser(req, res) {
    logger.debug("Updating user");
    try {
      const user = req.user;
      const bodyToUpdate = req.body;

      // update user
      const updatedUser = await userService.update(
        { _id: user._id },
        bodyToUpdate
      );

      return handleResponse(200, "user updated successfully", updatedUser, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findUsers(req, res) {
    logger.debug("Getting all users");
    try {
      const { limit, page } = req.query;
      const users = await userService.findAll({}, { limit, page });

      return handleResponse(200, "users fetched successfully", users, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findOneUser(req, res) {
    logger.debug("getting one user");
    try {
      const user = await userService.findById({
        _id: req.params.id,
      });

      if (!user) return handleResponse(404, "user not found", null, res);

      return handleResponse(200, "user found successfully", user, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }

  async findUserByFilter(req, res) {
    logger.debug("Getting users with filters");
    try {
      const { limit, page, firstName, lastName, dateAdded } = req.query;

      const filters = {
        limit,
        page,
        firstName,
        lastName,
        dateAdded,
      };

      Object.keys(filters).forEach(
        (key) => filters[key] === undefined && delete filters[key]
      );

      const users = await userService.findAllWithFilters(filters);

      return handleResponse(200, "Users fetched successfully", users, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e.message || e, null, res);
    }
  }
  async deleteOneUser(req, res) {
    logger.debug("Deleting User");
    try {
      const user = await userService.findOne({
        _id: req.user?._id,
        deleted: false,
      });

      if (!user) return handleResponse(404, "user not found", null, res);

      await userService.update(req.user?._id, {
        $set: {
          deleted: true,
          deletedAt: moment(Date.now()).format(),
        },
      });

      return handleResponse(200, "user deleted successfully", null, res);
    } catch (e) {
      logger.error(e);
      return handleResponse(500, e, null, res);
    }
  }
}

export default new UserController();
