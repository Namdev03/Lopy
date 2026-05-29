import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log(`Database connected successfully`);
  } catch (error) {
    throw new error
  }
}
export default connectDB;