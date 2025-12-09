// @ts-nocheck
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordThunk } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";

import toast from "react-hot-toast";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const forgotSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotSchemaType = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotSchemaType>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotSchemaType) => {
    try {
      await dispatch(forgotPasswordThunk(data)).unwrap();
      toast.success("Password reset link sent.");
    } catch (err: unknown) {
      toast.error(err as string);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-8")}
        >
          <FieldGroup>
            {/* HEADER */}
            <div className="flex flex-col items-center text-center gap-1">
              <h1 className="text-2xl font-bold">Forgot Password</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email and we will send you a password reset link.
              </p>
            </div>

            {/* EMAIL FIELD */}
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </Field>

            {/* BUTTON */}
            <Field>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </Field>

            <FieldDescription className="text-center">
              Remember your password?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 font-medium"
              >
                Back to login
              </Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
