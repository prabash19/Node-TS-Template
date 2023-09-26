import app from "./app.js";
import keys from "./keys.js";
// import dotenv from "dotenv";
// dotenv.config({ path: "./config.env" });

// Unhandled Exception  :  USE IN PRODUCTION NOT DEV
// process.on("uncaughtException", (err) => {
//   console.log("uncaught exception is :", err.message);
//   console.log("Shutting down server due to uncaught expeptions");
//   process.exit(1);
// });
const server = app.listen(keys.port, () => {
  console.log(`server starting on : localhost://${keys.port}`);
});
// const server = app.listen(process.env.PORT, () => {
//   console.log(`server starting on : localhost://${process.env.PORT}`);
// });
// Unhandled Promise Rejection :  USE IN PRODUCTION NOT DEV

// process.on("unhandledRejection", (err) => {
//   console.log("unhandlled error is:", err.message);
//   console.log("Shutting down server due to unhandled Promise Rejection");
//   server.close(() => {
//     process.exit(1);
//   });
// });
