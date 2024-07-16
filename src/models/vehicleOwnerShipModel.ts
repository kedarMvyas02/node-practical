import mongoose from "mongoose";

const vehicleOwnerShipSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const VehicleOwnerShip = mongoose.model(
  "VehicleOwnerShip",
  vehicleOwnerShipSchema
);
