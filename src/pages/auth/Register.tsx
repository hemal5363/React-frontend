import React, { useState } from "react";
import MainWithLoader from "../../components/layout/MainWithLoader";
import Button from "../../components/common/Button";
import type { IError, IRegisterForm } from "../../types";
import FormInput from "../../components/common/FormInput";
import { PAGE_ROUTE_URLS } from "../../utils/constant";
import LinkButton from "../../components/common/LinkButton";
import { registerUser } from "../../services/authService";
import { redirectTo } from "../../utils/helper";

const initialForm: IRegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register: React.FC = () => {
  const [form, setForm] = useState<IRegisterForm>(initialForm);
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

    if (form.password !== form.confirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    setLoading(true);
    try {
      await registerUser(form);
      setForm(initialForm);
      redirectTo(PAGE_ROUTE_URLS.PRODUCT_LIST);
    } catch (error) {
      const errorObj = error as IError;
      setFormErrors(errorObj.errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainWithLoader>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={formErrors.name}
              required
            />
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
              Register
            </Button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-300">
            Already have an account?{" "}
            <LinkButton to={PAGE_ROUTE_URLS.LOGIN}>Login here</LinkButton>
          </p>
        </div>
      </div>
    </MainWithLoader>
  );
};

export default Register;
