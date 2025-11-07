import React from "react";
import type { ISelectOption } from "../../types";

interface SelectInputProps {
  label?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ISelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  hideNullOption?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  error,
  disabled = false,
  hideNullOption = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none 
        dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
        ${error ? "border-red-500" : "border-gray-300"} 
        ${disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""}
        `}
      >
        {!hideNullOption && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-600"
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;
