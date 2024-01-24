import Comment from "./../models/comment.models.js";
class CommentService {
  constructor() {}

  async createOne(payload) {
    const newComment = await Comment.create(payload);
    return newComment;
  }

  async findOne(filter) {
    const comment = await Comment.findOne(filter);
    return comment;
  }

  async findById(id) {
    const comment = await Comment.findById(id);
    return comment;
  }

  async findAll(filter = {}) {
    const comments = await Comment.find(filter).populate([
      { path: "user" },
      { path: "post" },
    ]);
    return comments;
  }

  async updateOne(id, updateData = {}) {
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: id },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedComment;
  }

  async deleteOne(id) {
    const comment = await Comment.findByIdAndRemove(id);
    return comment;
  }
}

export default new CommentService();
