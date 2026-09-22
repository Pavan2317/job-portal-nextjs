import dns from 'dns';
import mongoose from "mongoose";

// Force public DNS to resolve MongoDB Atlas SRV records locally
dns.setServers(['1.1.1.1', '8.8.8.8']);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};