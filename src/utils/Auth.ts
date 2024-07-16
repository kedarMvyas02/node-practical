import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";
import { User } from "../models/userModel";
const expressAsyncHandler = require("express-async-handler");

const auth = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers.authorization;
    if (!userId) {
      return next(new AppError("Please provide UserId in authorization", 401));
    }

    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return next(new AppError("You are not registered yet!", 401));
    }
    // @ts-ignore
    req.user = foundUser;
    next();
  }
);

export default auth;
