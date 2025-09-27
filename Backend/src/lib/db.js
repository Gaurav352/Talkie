import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        
        const response=await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully",response.connection.host);
    } catch (error) {
        console.log("ERROR IN DB CONNECTION",error);
    }
}