import React, { useState } from "react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import FormInput from "../../components/common/FormInput";
import Text from "../../components/common/Text";
import MainWithLoader from "../../components/layout/MainWithLoader";
import { forgotPassword } from "../../services/authService";
import { PAGE_ROUTE_URLS } from "../../utils/constant";
import { asyncErrorHandler, navigateTo } from "../../utils/helper";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSubmit = asyncErrorHandler(async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await forgotPassword(email);
    setEmail("");
    navigateTo(PAGE_ROUTE_URLS.LOGIN);
  }, setLoading);

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
            Forgot Password
          </Text>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
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
        </Card>
      </div>
    </MainWithLoader>
  );
};

export default ForgotPassword;
