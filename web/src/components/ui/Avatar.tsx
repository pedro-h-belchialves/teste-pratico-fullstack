import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles: Record<string, string> = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({
  name,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-indigo-600 font-semibold text-white select-none",
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {getInitials(name)}
    </div>
  );
}
