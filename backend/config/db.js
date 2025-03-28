import  mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // main code
        console.log(`Mongo DB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit(1);
        
    }
}