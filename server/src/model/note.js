import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tag: {
      type: String,
      enum: ["urgent", "important"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      max: 300,
    },
  },

  { timestamps: true }
);

const Note = model("Note", noteSchema);
export default Note;
