import { z } from 'zod';

export const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});
