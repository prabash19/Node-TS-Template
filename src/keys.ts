import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const keys = {
  port: process.env.PORT,
};
export default keys;
