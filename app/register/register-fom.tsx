"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterSchemaType } from "@/lib/validators/schema";
import { useAppDispatch } from "@/store/hooks";
import { registerUserThunk } from "@/store/slices/authSlice";
import { loginUserWithGoogle, loginUserWithX } from "@/lib/authApi";

import toast from "react-hot-toast";
import Link from "next/link";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

export default function Register() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      await dispatch(registerUserThunk(formData)).unwrap();
      toast.success("Registration successful");
    } catch (err: unknown) {
      toast.error(err as string);
    }
  };

  return (
    <div className="min-h-screen w-full grid place-items-center px-4 py-10 bg-background">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <FieldGroup>
            {/* HEADER */}
            <div className="flex flex-col items-center text-center gap-1">
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Fill in your details to create a new account.
              </p>
            </div>

            {/* NAME */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </Field>

            {/* EMAIL */}
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </Field>

            {/* PASSWORD */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </Field>

            {/* IMAGE UPLOAD */}
            <Field>
              <FieldLabel htmlFor="image">Profile Image</FieldLabel>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setValue("image", file, { shouldValidate: true });
                }}
              />
            </Field>

            {/* REGISTER BUTTON */}
            <Field>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
            </Field>

            <FieldSeparator>Or continue with</FieldSeparator>

            {/* SOCIAL LOGIN */}
            <Field className="flex flex-col gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={loginUserWithGoogle}
                className="w-full gap-2"
              >
                Sign up with Google
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={loginUserWithX}
                className="w-full gap-2"
              >
                Continue with X
              </Button>
            </Field>

            <FieldDescription className="text-center">
              Already have an account?{" "}
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
