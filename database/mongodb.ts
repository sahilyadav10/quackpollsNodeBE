import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env";

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI env inside .env<development/production>.local"
  );
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI as string);
    console.log(`Connected to the DB in ${NODE_ENV}`);
  } catch (error) {
    console.error("Error connecting to the DB", error);
    process.exit(1);
  }
};
