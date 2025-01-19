import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

let URL= process.env.MONGO_URI;


const connectDB = async () => {
   
    await mongoose.connect(URL).then(()=>{
        console.log(`connected to database`)
    }).catch((err)=>{
        console.log(`connection error====${err}`);
    });
}

export default connectDB;