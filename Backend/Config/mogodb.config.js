import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);

    process.exit(1);
  }
}

export default connectDB;