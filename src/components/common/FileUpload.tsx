import React, { useEffect, useState } from "react";

import ImagePreview from "./ImagePreview";

interface FileUploadProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  error?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  value?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  onChange,
  accept = "image/*",
  error,
  className,
  fullWidth = true,
  disabled = false,
  value,
}) => {
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event && event.target.files?.[0]) || null;
    onChange(
      event ||
        ({
          target: { files: [], name: "profileImage" },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
    );

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(undefined);
    }
  };

  return (
    <div className={`${fullWidth && "w-full"} relative`}>
      <label htmlFor={name} className="cursor-pointer flex justify-center">
        <ImagePreview
          src={preview || undefined}
          removable
          onRemove={() => handleFileChange()}
          padding={6}
        />
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        className={`block w-full text-sm text-gray-900 dark:text-gray-100
        border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer
        bg-white dark:bg-gray-700 focus:outline-none hidden ${className}`}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
