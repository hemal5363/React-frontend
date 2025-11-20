import React from "react";

type Variant = "primary" | "secondary" | "danger" | "success" | "ghost";

interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg" | "none";
  disabled?: boolean;
  className?: string;
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
};

const SIZE_CLASSES: Record<"sm" | "md" | "lg" | "none", string> = {
  sm: "p-1 text-sm",
  md: "p-2 text-base",
  lg: "p-3 text-lg",
  none: "p-0",
};

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  className,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md transition-colors ${VARIANT_CLASSES[variant]} ${
        SIZE_CLASSES[size]
      } flex items-center justify-center ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default IconButton;
