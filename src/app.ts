import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import keys from "./keys.js";
import {
  connectClouinary,
  connectMongo,
  connectRedis,
} from "./utils/database.js";
import ErrorMiddleware from "./middleware/error.js";
import apiRoutes from "./routes/index.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect Storage
connectMongo(keys.mongo);
connectRedis(keys.redis);
connectClouinary(keys.cloudnaryName, keys.cloudnaryKey, keys.cloudnaryApi);

// Security
app.use(
  cors({
    origin: [keys.origin],
  })
);
app.use(express.json({ limit: "25mb" }));
app.use(helmet());
app.use(mongoSanitize());
// XSS and HPP need to be done

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json("API working");
});
app.use("/api", apiRoutes);

//for all undefined routes:
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} Not Found`) as any;
  err.statusCode = 404;
  next(err);
});
app.use(ErrorMiddleware);
export default app;
