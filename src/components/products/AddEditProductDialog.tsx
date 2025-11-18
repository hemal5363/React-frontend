import React, { useEffect, useState } from "react";

import { createProduct, updateProduct } from "../../services/productService";
import type { IProductForm } from "../../types";

import Button from "../common/Button";
import Dialog from "../common/Dialog";
import FormInput from "../common/FormInput";

const initialForm: IProductForm = {
  name: "",
  description: "",
  unit_price: 0,
  quantity: 0,
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  formData?: IProductForm;
}

const AddEditProductDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  formData,
}) => {
  const [form, setForm] = useState<IProductForm>(initialForm);
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        await updateProduct(formData.id, form);
      } else {
        await createProduct(form);
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
      title={`${formData && formData.id ? "Edit" : "Add"} Product`}
      disabled={loading}
    >
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={formErrors.name}
          required
        />

        <FormInput
          label="Unit Price"
          name="unit_price"
          value={form.unit_price}
          onChange={handleChange}
          error={formErrors.unit_price}
          type="number"
          required
        />

        <FormInput
          label="Quantity"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          error={formErrors.quantity}
          type="number"
          required
        />

        <FormInput
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          error={formErrors.description}
          textarea
          required
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

export default AddEditProductDialog;
