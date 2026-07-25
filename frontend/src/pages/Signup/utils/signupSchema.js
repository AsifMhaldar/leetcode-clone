import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(3, "Name should contain atleast 3 characters.."),
  emailId: z.string().email("Invalid email.."),
  password: z.string().min(8, "Password should be contain atleast 8 characters..")
});
