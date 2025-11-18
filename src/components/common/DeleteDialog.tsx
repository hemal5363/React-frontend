import React from "react";

import Button from "../common/Button";
import Dialog from "../common/Dialog";

import Text from "./Text";

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
      <Text>Are you sure you want to delete this?</Text>
      <div className="flex justify-end gap-2 pt-6">
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
