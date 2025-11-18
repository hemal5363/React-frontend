import React from "react";
import { Loader2 } from "lucide-react";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost"
  | "outline"
  | "link";
type Size = "sm" | "md" | "lg" | "none";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  hoverLink?: boolean;
  type?: "button" | "submit" | "reset";
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-indigo-500 text-white hover:bg-indigo-400 dark:bg-indigo-600 dark:hover:bg-indigo-500",
  secondary:
    "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
  danger:
    "bg-red-500 text-white hover:bg-red-400 dark:bg-red-600 dark:hover:bg-red-500",
  success:
    "bg-green-500 text-white hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-500",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
  outline:
    "border border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700",
  link: "text-gray-700 dark:text-gray-200",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2 text-base",
  lg: "px-8 py-3 text-lg",
  none: "p-0",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  hoverLink = false,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ${
        VARIANT_CLASSES[variant]
      } ${SIZE_CLASSES[size]} ${fullWidth ? "w-full" : ""} ${
        disabled || isLoading ? "opacity-60 cursor-not-allowed" : ""
      } ${className} ${hoverLink ? "hover:underline" : ""}`}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-1">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-1">{rightIcon}</span>}
    </button>
  );
};

export default Button;
