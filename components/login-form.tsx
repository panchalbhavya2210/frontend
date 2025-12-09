"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/lib/validators/schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useAppDispatch } from "@/store/hooks";
import { loginThunk } from "@/store/slices/authSlice";
import { loginUserWithGoogle, loginUserWithX } from "@/lib/authApi";
import { useSearchParams } from "next/navigation";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const dispatch = useAppDispatch();
  const search = useSearchParams();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  // Handle URL error (?error=no-token)
  useEffect(() => {
    if (search.get("error") === "no-token") {
      toast.error("Please login again");
    }
  }, []);

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  // Submit handler
  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const user = await dispatch(loginThunk(data)).unwrap();
      toast.info(`Welcome back, ${user.name}`);
      router.push("/dashboard");
    } catch (err) {
      toast.error(err as string);
    }
  };

  const googleLogin = async () => {
    await loginUserWithGoogle();
  };

  const xLogin = async () => {
    await loginUserWithX();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        {/* EMAIL FIELD */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </Field>

        {/* PASSWORD FIELD */}
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
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

        {/* LOGIN BUTTON */}
        <Field>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Spinner /> : ""}
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        {/* GOOGLE LOGIN */}
        <Field>
          <Button
            type="button"
            variant="outline"
            onClick={googleLogin}
            className="w-full gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21.35 11.1H12v2.8h5.35c-.3 1.54-1.69 4.52-5.35 4.52A6.15 6.15 0 0 1 5.85 12 6.15 6.15 0 0 1 12 5.58c2.11 0 3.53.9 4.34 1.68l2.04-2.04C16.89 3.27 14.69 2.4 12 2.4A9.6 9.6 0 0 0 2.4 12 9.6 9.6 0 0 0 12 21.6c5.54 0 9.22-3.87 9.22-9.32 0-.62-.07-1.1-.17-1.58Z"
              />
            </svg>
            Login with Google
          </Button>

          {/* X LOGIN */}
          <Button
            type="button"
            variant="outline"
            onClick={xLogin}
            className="w-full gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              viewBox="0 0 30 30"
            >
              <path
                fill="currentColor"
                d="M6 4c-1.105 0-2 .895-2 2v18c0 1.105.895 2 2 2h18c1.105 0 2-.895 2-2V6c0-1.105-.895-2-2-2H6zm2.65 5h4.61l2.69 3.85L19.28 9h1.45l-4.13 4.78L21.65 21H17.04l-2.99-4.27L10.37 21H8.89l4.51-5.2L8.65 9zm2.23 1.18 6.75 9.63h1.79l-6.76-9.63h-1.78z"
              />
            </svg>
            Continue with X
          </Button>

          <FieldDescription className="text-center mt-2">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
