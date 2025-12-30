import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully.`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
