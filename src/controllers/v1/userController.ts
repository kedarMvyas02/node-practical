import { NextFunction, Request, Response } from "express";
import { User } from "../../models/userModel";
const expressAsyncHandler = require("express-async-handler");

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phone, location } = req.body;

    const createdUser = await User.create({ name, email, phone, location });

    return res.status(200).json({
      msg: `User: ${name} created successfully`,
      data: createdUser,
    });
  }
);
