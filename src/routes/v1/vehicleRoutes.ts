import express from "express";
import { validate } from "../../validators/validate";
import { createVehicleSchema } from "../../validators/vehicleValidate";
import {
  createVehicle,
  createVehicleOwner,
  filter,
  getUserVehicles,
} from "../../controllers/v1/vehicleController";
import auth from "../../utils/Auth";

const router = express.Router();

router.use(auth);

router.post("/createVehicle", validate(createVehicleSchema), createVehicle);

router.get("/user_owned_vechicles", getUserVehicles);
router.post("/user_owned_vechicles/:vehicleId", createVehicleOwner);
router.get("/filter", filter);

export default router;
