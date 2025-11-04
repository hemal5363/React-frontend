import React, { useState } from "react";
import MainWithLoader from "../../components/layout/MainWithLoader";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import type { IError, IResetForm } from "../../types";
import { PAGE_ROUTE_URLS } from "../../utils/constant";
import LinkButton from "../../components/common/LinkButton";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { toastError } from "../../utils/helper";

const initialForm: IResetForm = {
  password: "",
  confirmPassword: "",
};

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const [form, setForm] = useState<IResetForm>(initialForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setFormErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    if (!token) {
      toastError("Invalid or missing token");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, form.password);
      setSuccess(true);
      setForm(initialForm);
    } catch (error) {
      const errorObj = error as IError;
      if (Object.keys(errorObj.errors).length > 0) {
        setFormErrors(errorObj.errors);
      } else {
        toastError(errorObj.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainWithLoader>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Reset Password
          </h1>

          {success ? (
            <div className="text-center">
              <p className="text-green-600 font-medium mb-4">
                Your password has been reset successfully!
              </p>
              <LinkButton to={PAGE_ROUTE_URLS.LOGIN} className="text-blue-500">
                Go to Login
              </LinkButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="New Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                error={formErrors.password}
                required
              />

              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
                required
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
              >
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </MainWithLoader>
  );
};

export default ResetPassword;
