import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
  return await mongoose.connect(process.env.MONGODBURI!).then(()=>{console.log("Connection successful")  } ).catch ((e)=> { console.error("Connection error", e)});
}
