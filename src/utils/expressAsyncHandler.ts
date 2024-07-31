import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

const expressAsyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) =>
      next(new AppError(err, 500))
    );
  };

export default expressAsyncHandler;
