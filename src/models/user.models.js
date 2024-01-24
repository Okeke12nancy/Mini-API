import mongoose from "mongoose";
// import paginate from "mongoose-paginate-v2";
// import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    //FIRST NAME
    firstName: {
      type: String,
      required: [true, "please tell us your furst name!"],
    },

    //LAST NAME
    lastName: {
      type: String,
      required: [true, "Please tell us your last name!"],
    },

    //USER NAME
    userName: {
      type: String,
      required: [true, "Please tell us your username"],
    },

    avatar: {
      type: String,
      default: "",
    },

    // DATE ADDED
    dateAdded: {
      type: Date,
      default: Date.now,
    },

    //EMAIL ADDRESS
    email: {
      type: String,
      unique: true,
      required: ["please provide your email"],
      lowercase: true,
    },

    // PHONE NUMBER
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    //USER PASSWORD
    password: {
      type: String,
      required: [true, "please provide a password"],
      minlength: 8,
      select: false,
    },

    // USER GENDER
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },

    // BIRTH DATE
    birthDate: {
      type: Date,
    },

    // USER LOCATION
    location: {
      type: String,
      required: true,
    },

    // USER BIO
    bio: {
      type: String,
      trim: true,
    },

    //USER PASSWORD CHANGED AT
    passwordChangedAt: {
      type: Date,
      select: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verifiedAt: {
      type: Date,
    },

    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },

    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

// userSchema.plugin(paginate);
// userSchema.plugin(aggregatePaginate);

const User = mongoose.model("Users", userSchema);

export default User;
