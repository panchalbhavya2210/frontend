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

export const forgotSchema = z.object({
  email: z.email("Invalid Email"),
});

export const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be 6+ chars"),
    confirmPassword: z.string().min(6, "Password must be 6+ chars"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type ForgotSchemaType = z.infer<typeof forgotSchema>;
export type ResetSchemaType = z.infer<typeof resetSchema>;
