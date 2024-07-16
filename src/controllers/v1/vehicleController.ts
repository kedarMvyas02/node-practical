import { NextFunction, Request, Response } from "express";
import { User } from "../../models/userModel";
import { Vehicle } from "../../models/vehicleModel";
import { VehicleOwnerShip } from "../../models/vehicleOwnerShipModel";
import AppError from "../../utils/AppError";
import mongoose from "mongoose";
const expressAsyncHandler = require("express-async-handler");

export const createVehicle = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, brand, number } = req.body;

    const createdVehicle = await Vehicle.create({ name, brand, number });

    return res.status(200).json({
      msg: `Vehicle: ${name} created successfully`,
      data: createdVehicle,
    });
  }
);

export const createVehicleOwner = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const vehicleId: string = req.params.vehicleId;

    const foundVehicle = await Vehicle.findById(vehicleId);

    if (!foundVehicle) {
      return next(new AppError("Vehicle not found", 404));
    }

    const createdVehicleOwnerShip = await VehicleOwnerShip.create({
      // @ts-ignore
      userId: new mongoose.Types.ObjectId(req.user._id),
      vehicleId: new mongoose.Types.ObjectId(vehicleId),
    });

    return res.status(200).json({
      msg: `Congratulations! You are the owner of ${foundVehicle.name} Vehicle`,
      data: createdVehicleOwnerShip,
    });
  }
);

export const getUserVehicles = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allVehicles = await VehicleOwnerShip.find({
      // @ts-ignore
      userId: new mongoose.Types.ObjectId(req.user._id),
    })
      .populate("vehicleId")
      .populate("userId");

    return res.status(200).json({
      // @ts-ignore
      msg: `${req.user.name}'s all vehicles found successfully`,
      data: allVehicles,
    });
  }
);

export const filter = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name?.toString()!;
    const brand = req.query.brand?.toString()!;

    const nameRegex = new RegExp(name, "i");
    const brandRegex = new RegExp(brand, "i");

    const allVehicles = await Vehicle.find({
      name: {
        $regex: nameRegex,
      },
      brand: {
        $regex: brandRegex,
      },
    })
      .populate({ path: "vehicleOwner", populate: { path: "userId" } })
      .lean();

    if (!allVehicles.length) {
      return next(new AppError("No such vehicle found", 400));
    }

    return res.status(200).json({
      msg: `Vehicles found successfully`,
      data: allVehicles,
    });
  }
);
