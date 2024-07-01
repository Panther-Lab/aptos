import { count } from "console";
import { date, z } from "zod";

export const verificationInputSchema = z.object({
  userName: z.string().min(2, {
    message: "User name must be at least 2 characters.",
  }),
  email: z.string().email(),
  dob: z.string(),
  location: z.string(),
});


