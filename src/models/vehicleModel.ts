import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    number: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

vehicleSchema.virtual("vehicleOwner", {
  localField: "_id",
  foreignField: "vehicleId",
  ref: "VehicleOwnerShip",
});

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
