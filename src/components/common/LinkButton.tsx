import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "ghost"
  | "outline";
type Size = "sm" | "md" | "lg";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  to: string;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const LinkButton: React.FC<Props> = ({ children, to, ...props }) => {
  return (
    <Link to={to}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default LinkButton;
