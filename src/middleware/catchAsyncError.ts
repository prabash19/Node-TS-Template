import { Request, Response, NextFunction } from "express";
const catchAsyncError =
  (
    AsyncFunction: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(AsyncFunction(req, res, next)).catch(next);
  };

export default catchAsyncError;
