import mongoose from "mongoose";
import { createClient } from "redis";
import { v2 as cloudinary } from "cloudinary";

mongoose.set("strictQuery", true);
export async function connectMongo(DB: string) {
  try {
    await mongoose.connect(DB);
    console.log("Mongo connected");
  } catch (err) {
    console.log("Mongo error: ", err);
  }
}

export async function connectRedis(DB: string) {
  const client = createClient({
    url: DB,
  });
  client.on("error", function (err) {
    throw err;
  });
  await client.connect();
  await client.set("foo", "bar");
}

export async function connectClouinary(
  cloud_name: string,
  api_key: string,
  api_secret: string
) {
  cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
  });
}
