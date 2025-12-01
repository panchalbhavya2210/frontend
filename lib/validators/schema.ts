import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ chars"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(4, "Username Must Be 4+ Chars"),
  password: z.string().min(6, "Password must be 6+ chars"),
  image: z.instanceof(File, { message: "File is required" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
