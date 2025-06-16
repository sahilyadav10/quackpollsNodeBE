import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    isPublic: {
      type: Boolean,
      required: [true, "Public status is required"],
      default: false,
    },
    closesAt: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
