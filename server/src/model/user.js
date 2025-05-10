import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: {
      type: String,
      select: false,
    },
    tokenExpires: {
      type: Date,
      select: false,
    },
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
