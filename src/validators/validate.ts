import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export const validate = (schema: z.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        new AppError(
          result.error.errors.map((val) => val.message).join(", "),
          400
        )
      );
    }
    next();
  };
};
