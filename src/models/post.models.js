import mongoose from "mongoose";
// import paginate from "mongoose-paginate-v2";
// import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    body: {
      type: String,
      required: [true, "Please type your post body"],
    },

    file: {
      id: {
        type: String,
        default: "",
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comments",
      },
    ],

    deleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", {
  versionKey: false,
  virtuals: true,

  transform(doc, ret) {
    delete ret._v;
  },
});

// postSchema.virtual("Comments", {
//   ref: "Comments", // the collection/model name
//   localField: "comment",
//   foreignField: "_id",
// });

// postSchema.plugin(paginate);
// export default Post;

// userSchema.plugin(paginate);
// userSchema.plugin(aggregatePaginate);

const Post = mongoose.model("Posts", postSchema);

export default Post;
