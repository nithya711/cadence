import mongoose from "mongoose";
import { setServers } from "node:dns/promises";

export const connectDB = async() => {
    try {
        setServers(["1.1.1.1", "8.8.8.8"]);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to database ! Host : ${conn.connection.host}`);
    } catch(error) {
        console.error(`Error connecting to database : ${error}`);
        process.exit(1);
    }
};