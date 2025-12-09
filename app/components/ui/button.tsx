import React from "react";
import Spinner from "./spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="flex w-full justify-center items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark cursor-pointer"
      onClick={props.onClick}
    >
      {props.disabled ? <Spinner /> : ""}
      {children}
    </button>
  );
}
