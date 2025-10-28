import { toast } from "react-toastify";

export const getNewDate = (date?: Date | undefined | string) => {
  return new Date(date || Date.now());
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

export const redirectTo = (path: string) => {
  window.location.href = path;
};
