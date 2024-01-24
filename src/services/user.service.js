import User from "../models/user.models.js";

class UserService {
  async create(newUser) {
    const newUserData = await User.create(newUser);

    return newUserData;
  }

  async findOne(filter, select = "") {
    let user;
    if (select.length > 0) {
      user = await User.findOne(filter).select(select);
    } else {
      user = await User.findOne(filter);
    }

    return user;
  }

  async findById(id) {
    const user = await User.findById(id);

    return user;
  }

  async findAll(filter = {}, { limit = 10, page = 1 }) {
    let _limit = limit && Number(limit) >= 1 ? Number(limit) : 10;
    const offset = page && page ? limit * (parseInt(page) - 1) : 0;

    const total_users = await User.countDocuments({
      ...filter,
      deleted: false,
    });

    let pagination_info = {
      totalUsers: Number(total_users),
      currentPage: Number(page),
      totalPages: Math.ceil(Number(total_users) / _limit),
    };

    const users = await User.find({ ...filter, deleted: false })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(_limit);

    return { users, pagination_info };
  }

  async update(id, updateData = {}) {
    const user = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndRemove(id);
    return user;
  }
  async findAllWithFilters(
    { firstName, lastName, dateAdded },
    { limit = 10, page = 1 }
  ) {
    let _limit = limit && Number(limit) >= 1 ? Number(limit) : 10;
    const offset = page && page ? limit * (parseInt(page) - 1) : 0;

    const filter = {};
    if (firstName) filter.firstName = new RegExp(firstName, "i");
    if (lastName) filter.lastName = new RegExp(lastName, "i");
    if (dateAdded) filter.dateAdded = new Date(dateAdded);

    const total_users = await User.countDocuments({
      ...filter,
      deleted: false,
    });

    let pagination_info = {
      totalUsers: Number(total_users),
      currentPage: Number(page),
      totalPages: Math.ceil(Number(total_users) / _limit),
    };

    const users = await User.find({ ...filter, deleted: false })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(_limit);

    return { users, pagination_info };
  }
}

export default new UserService();
