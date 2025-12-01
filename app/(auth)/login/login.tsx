"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/app/components/ui/button";
import { loginSchema, LoginSchemaType } from "@/lib/validators/schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadProfileThunk, loginThunk } from "@/store/slices/authSlice";
import { useEffect } from "react";
import Input from "@/app/components/ui/input";
import toast from "react-hot-toast";

export const metadata = {
  title: "Login | Your App Name",
};

export default function Login() {
  // const login = useAuthStore((s) => s.login);
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  console.log(loading);
  useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(loadProfileThunk());
    };
    fetchProfile();
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const user = await dispatch(loginThunk(data)).unwrap();
      toast.success(`Welcome back, ${user.name}`);
    } catch (err: unknown) {
      console.log(err);
      toast.error(err as string);
    }
  };

  return (
    <div className="grid min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold text-black">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Email address
            </label>

            <Input {...register("email")} type="email" />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Password
            </label>

            <Input {...register("password")} type="password" />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
