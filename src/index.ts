import express from "express";
import dotenv from "dotenv";

import AppError from "./utils/AppError";
import globalErrorHandler from "./utils/GlobalErrorHandler";
import connectDb from "./utils/ConnectDb";
import userRoutes from "./routes/v1/userRoutes";
import vehicleRoutes from "./routes/v1/vehicleRoutes";

dotenv.config();

const app = express();

connectDb();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/api/v1", vehicleRoutes);

app.use("*", (req, res, next) => {
  next(new AppError("This route is not yet defined in the server", 404));
});

app.use(globalErrorHandler);

app.listen(8000, () => console.log("Server running on port 8000"));
