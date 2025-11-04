import React from "react";

type Variant = "h1" | "h2" | "p";
type Size = "sm" | "md" | "lg" | "none";
type FontWeight = "normal" | "medium" | "semibold" | "bold";

interface TextProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
  fontWeight?: FontWeight;
  textCenter?: boolean;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  h1: "tracking-tight text-gray-900 dark:text-white",
  h2: "text-gray-900 dark:text-white",
  p: "text-gray-600 dark:text-gray-300",
};

const SIZE_CLASSES: Record<Variant, Record<Size, string>> = {
  h1: {
    sm: "px-4 py-1.5 text-sm",
    md: "text-2xl sm:text-3xl",
    lg: "text-5xl sm:text-7xl",
    none: "text-base",
  },
  h2: {
    sm: "px-4 py-1.5 text-sm",
    md: "text-2xl sm:text-3xl",
    lg: "text-xl",
    none: "text-base",
  },
  p: {
    sm: "text-sm",
    md: "text-sm sm:text-md",
    lg: "text-lg sm:text-xl",
    none: "text-base",
  },
};

const FONT_WEIGHT_CLASSES: Record<FontWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const Text: React.FC<TextProps> = ({
  children,
  variant = "p",
  size = "none",
  fontWeight = "normal",
  className,
  textCenter = false,
}) => {
  const Component = variant;
  return (
    <Component
      className={`${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[variant][size]} ${
        FONT_WEIGHT_CLASSES[fontWeight]
      } ${className} ${textCenter ? "text-center" : ""}`}
    >
      {children}
    </Component>
  );
};

export default Text;
