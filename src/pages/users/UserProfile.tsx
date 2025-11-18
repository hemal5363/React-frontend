import React, { useCallback, useEffect, useState } from "react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import FormInput from "../../components/common/FormInput";
import Text from "../../components/common/Text";
import MainWithLoader from "../../components/layout/MainWithLoader";
import type { IUserForm } from "../../types";
import { asyncErrorHandler, logOut } from "../../utils/helper";
import {
  deleteMyProfile,
  getMyProfile,
  updateMyProfile,
} from "../../services/userService";
import DeleteDialog from "../../components/common/DeleteDialog";

const initialForm: IUserForm = {
  name: "",
  email: "",
  role: "",
};

const UserProfile: React.FC = () => {
  const [form, setForm] = useState<IUserForm>(initialForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProfile = useCallback(
    asyncErrorHandler(async () => {
      const data = await getMyProfile();
      setForm(data);
    }, setPageLoading),
    []
  );

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = asyncErrorHandler(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!form.name.trim()) {
        setFormErrors((prev) => ({ ...prev, name: "Name is required" }));
        return;
      }

      await updateMyProfile(form);
    },
    setLoading,
    setFormErrors
  );

  const handleDeleteProfile = asyncErrorHandler(
    async () => {
      await deleteMyProfile();
      logOut();
    },
    () => {
      setShowDeleteDialog(false);
      setLoading(false);
    }
  );

  return (
    <MainWithLoader isLoading={pageLoading}>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="max-w-lg w-full">
          <Text
            variant="h1"
            size="md"
            fontWeight="bold"
            textCenter
            className="mb-6"
          >
            My Profile
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
              error={formErrors.email}
              onChange={handleChange}
              disabled
            />
            <FormInput
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              error={formErrors.role}
              disabled
            />

            <div className="flex sm:flex-row flex-col gap-4">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
              >
                Save Changes
              </Button>

              <Button
                variant="danger"
                fullWidth
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete Profile
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <DeleteDialog
        title="Delete Profile"
        isOpen={showDeleteDialog}
        onSuccess={handleDeleteProfile}
        onClose={() => setShowDeleteDialog(false)}
      />
    </MainWithLoader>
  );
};

export default UserProfile;
