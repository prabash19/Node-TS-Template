import mongoose from "mongoose";
mongoose.set("strictQuery", true);
export default async function connectMongo(DB: string) {
  try {
    await mongoose.connect(DB);
    console.log("DB connected");
  } catch (err) {
    console.log("DB error: ", err);
  }
}
