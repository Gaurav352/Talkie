import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import { connectDB } from "./lib/db.js";
import dotenv from  "dotenv";
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.route.js"
import { app,server } from "./lib/socket.js";
import path from "path"

dotenv.config();
const PORT=process.env.PORT || 7000;
const __dirname = path.resolve();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

if (process.env.NODE_ENV === "production") { 
  
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle SPA routing by serving index.html for all non-API routes
  app.get(/^(?!\/api).*/, (req, res) => {  // Safe regex for SPA fallback
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}


server.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
});
connectDB();