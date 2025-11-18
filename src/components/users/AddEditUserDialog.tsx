import React, { useEffect, useState } from "react";

import { createUser, updateUser } from "../../services/userService";
import type { IUserForm } from "../../types";
import { USER_ROLES } from "../../utils/constant";

import Button from "../common/Button";
import Dialog from "../common/Dialog";
import FormInput from "../common/FormInput";
import SelectInput from "../common/SelectInput";

const ROLE_OPTIONS = [
  { value: USER_ROLES.ADMIN, label: "Admin" },
  { value: USER_ROLES.USER, label: "User" },
];

const initialForm: IUserForm = {
  name: "",
  email: "",
  role: USER_ROLES.USER,
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  formData?: IUserForm;
}

const AddEditUserDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  formData,
}) => {
  const [form, setForm] = useState<IUserForm>(initialForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
      setFormErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (formData) {
      setForm(formData);
    }
  }, [formData]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: "" });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (formData && formData.id) {
        if (formData === form) {
          onClose();
          return;
        }
        await updateUser(formData.id, form);
      } else {
        await createUser(form);
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      const errorObj = error as Record<string, string>;
      setFormErrors(errorObj);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`${formData && formData.id ? "Edit" : "Add"} User`}
      disabled={loading}
    >
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="User Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={formErrors.name}
          required
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={formErrors.email}
          required
        />

        <SelectInput
          label="Role"
          name="role"
          options={ROLE_OPTIONS}
          value={form.role}
          onChange={handleChange}
          hideNullOption
          required
          error={formErrors.role}
        />

        <div className="flex justify-end gap-2 pt-3">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" isLoading={loading}>
            {`${formData && formData.id ? "Edit" : "Add"} Product`}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddEditUserDialog;
