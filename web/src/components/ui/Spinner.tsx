import { cn } from "../utils/cn";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles: Record<string, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export function Spinner({ className, size = "md" }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-indigo-600 border-t-transparent",
        sizeStyles[size],
        className,
      )}
    />
  );
}
