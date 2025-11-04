import React, { useState } from "react";
import MainWithLoader from "../../components/layout/MainWithLoader";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import { forgotPassword } from "../../services/authService";
import { navigateTo } from "../../utils/helper";
import { PAGE_ROUTE_URLS } from "../../utils/constant";
import Card from "../../components/common/Card";
import Text from "../../components/common/Text";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { resetToken } = await forgotPassword(email);
      setEmail("");
      navigateTo(PAGE_ROUTE_URLS.RESET_PASSWORD.replace(":token", resetToken));
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
