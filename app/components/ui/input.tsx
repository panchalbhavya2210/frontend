import React from "react";
import { ChangeHandler } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5
                         outline-1 outline-gray-800"
    />
  );
}
