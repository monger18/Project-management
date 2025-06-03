import mongoose from "mongoose";
import { config } from "./app.config";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to the MongoDB database successfully");
    } catch (error) {
        console.log("Error connecting to the MongoDB database");
        process.exit(1);
    }
}

export default connectToDatabase;
// This function connects to the MongoDB database using Mongoose.