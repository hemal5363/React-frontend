import React, { useState } from "react";
import MainWithLoader from "../../components/layout/MainWithLoader";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import type { IError } from "../../types";
import { forgotPassword } from "../../services/authService";
import { navigateTo } from "../../utils/helper";
import { PAGE_ROUTE_URLS } from "../../utils/constant";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setEmail(value);
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setEmail("");
      setFormError("");
      navigateTo(PAGE_ROUTE_URLS.LOGIN);
    } catch (error) {
      const err = error as IError;
      setFormError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainWithLoader>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Forgot Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              error={formError}
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
            >
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
    </MainWithLoader>
  );
};

export default ForgotPassword;
