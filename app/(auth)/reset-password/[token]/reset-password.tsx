"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetSchema, ResetSchemaType } from "@/lib/validators/schema";
import { useAppDispatch } from "@/store/hooks";
import { resetPasswordThunk } from "@/store/slices/authSlice";

import toast from "react-hot-toast";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetSchemaType>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetSchemaType) => {
    if (!token) {
      toast.error("Invalid or expired reset link.");
      return;
    }

    try {
      await dispatch(
        resetPasswordThunk({
          token: token as string,
          password: data.password,
        })
      ).unwrap();

      toast.success("Password reset successfully.");
    } catch (err: unknown) {
      toast.error(err as string);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-8")}
        >
          <FieldGroup>
            {/* HEADER */}
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your new password below to reset your account.
              </p>
            </div>

            {/* PASSWORD */}
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                >
                  {showPassword ? "Hide" : "See"}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </Field>

            {/* CONFIRM PASSWORD */}
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showCPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  onClick={() => setShowCPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                >
                  {showCPassword ? "Hide" : "See"}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </Field>

            {/* SUBMIT BUTTON */}
            <Field>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </Field>

            <FieldDescription className="text-center">
              Back to{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 font-medium"
              >
                Login
              </Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
