import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
    stack: err.stack,
  });
};

export default globalErrorHandler;
