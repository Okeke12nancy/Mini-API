import Post from "../models/post.models.js";

class postService {
  constructor() {}

  async createPost(newPost) {
    const newPostData = await Post.create(newPost);

    return newPostData;
  }

  async findOne(filter) {
    const post = await Post.findOne({ ...filter, deleted: false })
      .populate([
        {
          path: "createdBy",
          select: ["firstName", "lastName", "email"],
        },
        {
          path: "comments",
          select: ["body", "createdAt", "user"],
        },
      ])
      .sort({ createdAt: 1 });

    return post;
  }

  async findById(id) {
    const post = await Post.findById(id)
      .populate([
        {
          path: "createdBy",
          select: ["firstName", "lastName", "email"],
        },
        {
          path: "comments",
          select: ["body", "createdAt", "user"],
        },
      ])
      .sort({ createdAt: 1 });
    return post;
  }

  async findAll(filter = {}, { limit = 10, page = 1 }) {
    let _limit = limit && Number(limit) >= 1 ? Number(limit) : 10;
    const offset = page && page ? limit * (parseInt(page) - 1) : 0;

    const total_posts = await Post.countDocuments({
      ...filter,
      deleted: false,
    });

    let pagination_info = {
      totalPosts: Number(total_posts),
      currentPage: Number(page),
      totalPages: Math.ceil(Number(total_posts) / _limit),
    };

    const posts = await Post.find({ ...filter, deleted: false })
      .populate([
        {
          path: "createdBy",
          select: ["firstName", "lastName", "email"],
        },
        {
          path: "comments",
          select: ["body", "createdAt", "user"],
        },
      ])
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(_limit);

    return { posts, pagination_info };
  }

  async update(id, updateData = {}) {
    const post = await Post.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return post;
  }

  // async delete(id) {
  //   const post = await Post.findByIdAndUpdate(id);
  //   return post;
  // }
}

export default new postService();
