import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      minLength: 1,
      maxLength: 2,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

export default User;
