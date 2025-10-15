import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB=async ()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_SECRET);
        console.log("Database Connected Successfully!! ,",connect.connection.host);
    } catch (error) {
        console.log("Failed database connection",error);
    }
}