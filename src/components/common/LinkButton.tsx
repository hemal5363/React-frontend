import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost"
  | "outline"
  | "link";
type Size = "sm" | "md" | "lg" | "none";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  to: string;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const LinkButton: React.FC<Props> = ({
  children,
  to,
  variant = "link",
  size = "none",
  ...props
}) => {
  return (
    <Link to={to}>
      <Button {...props} variant={variant} size={size} type="button">
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
