import React, { useState } from "react";
import MainWithLoader from "../../components/layout/MainWithLoader";
import Button from "../../components/common/Button";
import type { IError, ILoginForm } from "../../types";
import FormInput from "../../components/common/FormInput";
import { PAGE_ROUTE_URLS } from "../../utils/constant";
import LinkButton from "../../components/common/LinkButton";
import { loginUser } from "../../services/authService";
import { navigateTo, toastError } from "../../utils/helper";

const initialForm: ILoginForm = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [form, setForm] = useState<ILoginForm>(initialForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await loginUser(form);
      navigateTo(PAGE_ROUTE_URLS.PRODUCT_LIST);
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
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={formErrors.email}
              required
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={formErrors.password}
              required
            />
            <div className="flex justify-end text-sm">
              <LinkButton to={PAGE_ROUTE_URLS.FORGOT_PASSWORD}>
                Forgot Password?
              </LinkButton>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
            >
              Login
            </Button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-300">
            Don’t have an account?{" "}
            <LinkButton to={PAGE_ROUTE_URLS.REGISTER}>Register here</LinkButton>
          </p>
        </div>
      </div>
    </MainWithLoader>
  );
};

export default Login;
