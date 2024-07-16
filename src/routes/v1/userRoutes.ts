import express from "express";
import { registerUser } from "../../controllers/v1/userController";
import { validate } from "../../validators/validate";
import { registerUserSchema } from "../../validators/userValidate";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUser);

export default router;
