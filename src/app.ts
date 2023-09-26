import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import keys from "./keys.js";
import connectMongo from "./utils/DB.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [keys.origin],
  })
);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json("API working");
});

connectMongo(keys.mongo);

//for undefined routes:
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} Not Found`) as any;
  err.statusCode = 404;
  next(err);
});

export default app;
