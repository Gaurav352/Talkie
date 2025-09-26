import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import { connectDB } from "./lib/db.js";
import dotenv from  "dotenv";
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.route.js"


dotenv.config();
const app=express();
const PORT=5000;

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("Helloo");
});
app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
});
connectDB();