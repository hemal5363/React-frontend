import { toast } from "react-toastify";
import { PAGE_ROUTE_URLS, SESSION_STORAGE_KEYS } from "./constant";

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

export const isUserLogin = () => {
  return !!sessionStorage.getItem(SESSION_STORAGE_KEYS.TOKEN);
};

export const logOut = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.TOKEN);
  navigateTo(PAGE_ROUTE_URLS.LOGIN);
};

let navigateFn: (path: string) => void;

export const setNavigate = (fn: (path: string) => void) => {
  navigateFn = fn;
};

export const navigateTo = (path: string) => {
  if (navigateFn) navigateFn(path);
};
