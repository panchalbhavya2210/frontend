// app/components/ui/spinner.tsx

"use client";

import clsx from "clsx";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

export default function Spinner({
  size = "sm",
  color = "border-white",
}: SpinnerProps) {
  const sizeClasses: Record<SpinnerSize, string> = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div
      className={clsx(
        "rounded-full animate-spin border-t-transparent",
        sizeClasses[size],
        color,
      )}
    />
  );
}
