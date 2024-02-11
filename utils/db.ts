import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://Admin:Admin@ispace.vvqupbz.mongodb.net/?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectDB;
