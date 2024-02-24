import mongoose from "mongoose";
import dotenv from "dotenv";
//db connection code
dotenv.config();
const url = process.env.MONGO_URI;
// console.log(url);
connectDB().catch((err) => console.log(err));
async function connectDB() {
  await mongoose.connect(url);
  console.log(`Quiz database connected Successfully to ${url}`);
}
export default connectDB;
