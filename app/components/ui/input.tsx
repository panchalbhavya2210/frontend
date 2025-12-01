import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5
                         outline-1 outline-gray-800"
    />
  );
}
