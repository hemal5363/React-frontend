import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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
  width?: string;
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
  width = "w-full",
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    const fakeEvent = {
      target: { name, value: optionValue },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(fakeEvent);
    setOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ||
    (!hideNullOption ? placeholder : "");

  return (
    <div className={`${width} relative`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div
        className={`relative ${width} border rounded-md p-2 flex justify-between items-center cursor-pointer 
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
          ${
            disabled
              ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
              : "bg-white dark:bg-gray-700"
          } 
          focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
        onClick={() => !disabled && setOpen(!open)}
      >
        <span
          className={`truncate ${
            value ? "text-gray-900 dark:text-gray-100" : "text-gray-400"
          }`}
        >
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`transition-transform text-gray-900 dark:text-gray-100 ${
            open ? "rotate-180" : ""
          }`}
          size={18}
        />
      </div>

      {/* Dropdown List */}
      {open && !disabled && (
        <div
          className={`absolute ${width} z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-52 overflow-y-auto`}
        >
          {!hideNullOption && (
            <div
              onClick={() => handleSelect("")}
              className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
            >
              {placeholder}
            </div>
          )}
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-3 py-2 text-sm cursor-pointer 
                ${
                  option.value === value
                    ? "bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;
