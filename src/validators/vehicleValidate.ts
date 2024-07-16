import { z } from "zod";

export const createVehicleSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  brand: z.string({
    required_error: "Brand is required",
    invalid_type_error: "Brand must be a string",
  }),
  number: z.number({
    required_error: "Number is required",
    invalid_type_error: "Number must be a number",
  }),
});
