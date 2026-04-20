import React from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium font-heading tracking-tight transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer";

  const variants: Record<string, string> = {
    primary:
      "bg-ink text-ink-inverse hover:bg-neutral-800 active:scale-[0.97]",
    secondary:
      "bg-accent-warm text-white hover:bg-amber-600 active:scale-[0.97]",
    outline:
      "border border-ink/20 text-ink hover:bg-ink hover:text-ink-inverse active:scale-[0.97]",
    ghost:
      "text-ink-secondary hover:text-ink hover:bg-ink/5 active:scale-[0.97]",
  };

  const sizes: Record<string, string> = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-[15px]",
    lg: "px-9 py-4 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
