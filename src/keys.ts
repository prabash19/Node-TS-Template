import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const keys: {
  port?: string;
  origin: string;
  mongo: string;
} = {
  port: process.env.PORT,
  origin: process.env.ORIGIN!,
  mongo: process.env.MONGODB!,
};
export default keys;
