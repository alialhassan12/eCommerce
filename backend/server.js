import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';

//import routes
import authRoute from './routes/auth.route.js';

const app=express();
const PORT=process.env.PORT;

async function startServer(){
    try {
        await connectDB();
        app.listen(PORT,()=>console.log("Server Started"));
    } catch (error) {
        console.log("Failed to start Server",error);
    }
}
//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}));

app.use('/api/auth',authRoute);

startServer();