import React, { useState } from "react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import FormInput from "../../components/common/FormInput";
import LinkButton from "../../components/common/LinkButton";
import Text from "../../components/common/Text";
import MainWithLoader from "../../components/layout/MainWithLoader";
import { loginUser } from "../../services/authService";
import type { ILoginForm } from "../../types";
import { PAGE_ROUTE_URLS } from "../../utils/constant";
import { asyncErrorHandler, navigateTo } from "../../utils/helper";

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

  const handleSubmit = asyncErrorHandler(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
      await loginUser(form);
      navigateTo(PAGE_ROUTE_URLS.HOME);
    },
    setLoading,
    setFormErrors
  );

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
            Login
          </Text>

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
              <LinkButton to={PAGE_ROUTE_URLS.FORGOT_PASSWORD} hoverLink>
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

          <Text size="sm" textCenter className="mt-4">
            Don’t have an account?{" "}
            <LinkButton to={PAGE_ROUTE_URLS.REGISTER} hoverLink>
              Register here
            </LinkButton>
          </Text>
        </Card>
      </div>
    </MainWithLoader>
  );
};

export default Login;
