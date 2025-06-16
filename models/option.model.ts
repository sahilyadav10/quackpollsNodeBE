import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Option text is required"],
      trim: true,
    },
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: [true, "Poll reference is required"],
    },
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vote",
      },
    ],
  },
  { timestamps: true }
);

const Option = mongoose.model("Option", optionSchema);

export default Option;
