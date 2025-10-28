import React from "react";
import { X } from "lucide-react";
import IconButton from "../common/IconButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
}

const Dialog: React.FC<Props> = ({
  isOpen,
  children,
  onClose,
  title,
  disabled,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </h2>
          )}
          <IconButton onClick={onClose} variant="ghost" disabled={disabled}>
            <X className="w-5 h-5" />
          </IconButton>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Dialog;
