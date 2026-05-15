import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    let mongodburl = process.env.MONGODB_URL;
    const projectname = "resume-builder";

    console.log("Attempting to connect to:", mongodburl);
    await mongoose.connect(mongodburl, {
      dbName: projectname,
      serverSelectionTimeoutMS: 5000 // fail fast
    });
    console.log("Successfully connected to MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error connecting to mongoDB:", error.message);
    process.exit(1);
  }
};

connectDB();
