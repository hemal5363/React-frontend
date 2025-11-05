import React from "react";
import { Search } from "lucide-react";

interface FormInputProps {
  label?: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "search";
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
  showSearchIcon?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  textarea = false,
  error,
  showSearchIcon = false,
  className,
  fullWidth = true,
}) => {
  return (
    <div className={`${fullWidth && "w-full"} relative`}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      ) : (
        <div className="relative">
          {showSearchIcon && (
            <Search
              className="absolute left-3 top-1/4 -translate-y-1/2 text-gray-400"
              size={18}
            />
          )}

          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`${fullWidth ? "w-full" : ""} p-2 ${
              showSearchIcon ? "pl-10" : ""
            } border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
              error ? "border-red-500" : "border-gray-300"
            } ${className}`}
          />
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
