import React from "react";
import { useGoogleLogin, type TokenResponse } from "@react-oauth/google";

import { toastError } from "../../utils/helper";

import Button from "./Button";

interface IGoogleButtonProps {
  onSuccess: (tokenResponse: TokenResponse) => void;
  errorMessage?: string;
  label?: string;
  loading?: boolean;
}

const GoogleButton: React.FC<IGoogleButtonProps> = ({
  onSuccess,
  errorMessage,
  label,
  loading,
}) => {
  const googleLoginOnClick = useGoogleLogin({
    onSuccess: (tokenResponse) => onSuccess(tokenResponse),
    onError: () => toastError(errorMessage || "Something went wrong"),
  });

  return (
    <Button
      variant="outline"
      fullWidth
      onClick={() => googleLoginOnClick()}
      isLoading={loading}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        className="w-6 h-6"
      />
      {label}
    </Button>
  );
};

export default GoogleButton;
