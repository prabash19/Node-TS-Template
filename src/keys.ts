import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const keys: {
  port: string;
  origin: string;
  mongo: string;
  redis: string;
  cloudnaryName: string;
  cloudnaryKey: string;
  cloudnaryApi: string;
} = {
  port: process.env.PORT!,
  origin: process.env.ORIGIN!,
  mongo: process.env.MONGODB!,
  redis: process.env.REDIS!,
  cloudnaryName: process.env.CLOUDNARY_NAME!,
  cloudnaryKey: process.env.CLOUDNARY_KEY!,
  cloudnaryApi: process.env.CLOUDNARY_API!,
};
export default keys;
