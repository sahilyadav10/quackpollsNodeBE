import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: [true, "Poll reference is required"],
    },
    option: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Option",
      required: [true, "Option reference is required"],
    },
    votedAt: {
      type: Date,
      default: Date.now,
      required: [true, "Vote timestamp is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
