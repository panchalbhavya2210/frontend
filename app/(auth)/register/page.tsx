"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/app/components/ui/button";
import { registerSchema, RegisterSchemaType } from "@/lib/validators/schema";
import { registerUser } from "@/lib/authApi";
import Input from "@/app/components/ui/input";
import { useDispatch } from "react-redux";
import { registerUserThunk } from "@/store/slices/authSlice";

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: RegisterSchemaType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image);
    await dispatch(registerUserThunk(formData));
  };

  return (
    <div className="grid grid-cols-12 gap-[12] min-h-full justify-center px-6 py-12 lg:px-8">
      <div className="grid-form col-span-3">
        <div className="">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold text-black">
            Register
          </h2>
        </div>

        <div className="mt-10 ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Username
              </label>

              <Input {...register("name")} />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Profile Image
              </label>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("image", file, { shouldValidate: true });
                  }
                }}
              />

              {errors.image && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.image.message}
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
      <div className="grid-bg col-span-9"></div>
    </div>
  );
}
