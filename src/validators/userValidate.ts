import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  phone: z.number({
    required_error: "Phone is required",
    invalid_type_error: "Phone must be a number",
  }),
  location: z.object(
    {
      latittude: z.number({
        required_error: "Latittude is required",
        invalid_type_error: "Latittude must be a number",
      }),
      longitude: z.number({
        required_error: "Longitude is required",
        invalid_type_error: "Longitude must be a number",
      }),
    },
    { required_error: "Latittude & Longitude are required" }
  ),
});
