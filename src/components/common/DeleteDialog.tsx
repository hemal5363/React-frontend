import React from "react";
import Button from "../common/Button";
import Dialog from "../common/Dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  loading?: boolean;
  title: string;
}

const DeleteDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  loading,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title} disabled={loading}>
      <p className="text-gray-800 dark:text-gray-100">
        Are you sure you want to delete this?
      </p>
      <div className="flex justify-end gap-2 pt-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button isLoading={loading} onClick={onSuccess} variant="danger">
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
