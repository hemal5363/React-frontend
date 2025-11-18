import React, { useState } from "react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import FormInput from "../../components/common/FormInput";
import LinkButton from "../../components/common/LinkButton";
import Text from "../../components/common/Text";
import MainWithLoader from "../../components/layout/MainWithLoader";
import { registerUser } from "../../services/authService";
import type { IRegisterForm } from "../../types";
import { PAGE_ROUTE_URLS } from "../../utils/constant";
import { navigateTo } from "../../utils/helper";

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
      navigateTo(PAGE_ROUTE_URLS.PRODUCT_LIST);
    } catch (error) {
      const errorObj = error as Record<string, string>;
      setFormErrors(errorObj);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainWithLoader>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Card>
          <Text
            variant="h1"
            size="md"
            fontWeight="bold"
            textCenter
            className="mb-6"
          >
            Registration
          </Text>

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

          <Text size="sm" textCenter className="mt-4">
            Already have an account?{" "}
            <LinkButton to={PAGE_ROUTE_URLS.LOGIN} hoverLink>
              Login here
            </LinkButton>
          </Text>
        </Card>
      </div>
    </MainWithLoader>
  );
};

export default Register;
