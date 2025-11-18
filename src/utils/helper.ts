import { toast } from "react-toastify";

import type { IUser } from "../types";

import { PAGE_ROUTE_URLS, SESSION_STORAGE_KEYS, USER_ROLES } from "./constant";

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
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.USER_DATA);
  navigateTo(PAGE_ROUTE_URLS.LOGIN);
};

export const getUserData = (): IUser => {
  const data = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_DATA);
  return JSON.parse(data || "{}");
};

export const isAdmin = () => getUserData().role === USER_ROLES.ADMIN;

export const getUserRole = () => getUserData().role;

let navigateFn: (path: string) => void;

export const setNavigate = (fn: (path: string) => void) => {
  navigateFn = fn;
};

export const navigateTo = (path: string) => {
  if (navigateFn) navigateFn(path);
};
