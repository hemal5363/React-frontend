import { toast } from "react-toastify";

export const getNewDate = (date?: Date | undefined | string) => {
  return new Date(date || Date.now());
};

export const localeDateString = (date: Date | string) => {
  if (typeof date === "string") date = new Date(date);
  return date.toLocaleDateString();
};

export const priceFormat = (num: number) => {
  return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export const toastError = (message: string) => {
  toast.error(message);
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};
