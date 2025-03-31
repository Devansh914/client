// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const dbconnect = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    const uri = process.env.mongodb_url; // Set this in your environment variables
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    const connection = await mongoose.connect(uri, {});

    isConnected = true;
    console.log("MongoDB connected:", connection.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
