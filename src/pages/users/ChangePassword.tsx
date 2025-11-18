import React, { useState } from "react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import FormInput from "../../components/common/FormInput";
import Text from "../../components/common/Text";
import MainWithLoader from "../../components/layout/MainWithLoader";
import { UpdatePassword } from "../../services/userService";
import { logOut } from "../../utils/helper";

interface IPasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialForm: IPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState<IPasswordForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    setLoading(true);
    try {
      await UpdatePassword(form.currentPassword, form.newPassword);
      setForm(initialForm);
      logOut();
    } catch (error) {
      setErrors(error as Record<string, string>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainWithLoader>
      <div className="flex justify-center items-center min-h-[70vh]">
        <Card>
          <Text
            variant="h1"
            size="md"
            fontWeight="bold"
            textCenter
            className="mb-6"
          >
            Change Password
          </Text>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Current Password"
              name="currentPassword"
              type="password"
              value={form.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
              required
            />

            <FormInput
              label="New Password"
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              required
            />

            <FormInput
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <Button
              fullWidth
              type="submit"
              variant="primary"
              isLoading={loading}
            >
              Update Password
            </Button>
          </form>
        </Card>
      </div>
    </MainWithLoader>
  );
};

export default ChangePassword;
