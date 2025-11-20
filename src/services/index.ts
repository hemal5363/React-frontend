import axios from "axios";

import type { CustomAxiosConfig } from "../types";
import { PAGE_ROUTE_URLS, SESSION_STORAGE_KEYS } from "../utils/constant";
import {
  logOut,
  navigateTo,
  setUserData,
  toastError,
  toastSuccess,
} from "../utils/helper";

const customAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(SESSION_STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if ((config as CustomAxiosConfig).isFormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

customAxios.interceptors.response.use(
  (response) => {
    if (
      response &&
      response.config &&
      response.config.method &&
      ["post", "patch", "delete"].includes(response.config.method)
    ) {
      toastSuccess(response.data.message);
    }
    if (response && response.data && response.data.token) {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.TOKEN, response.data.token);
      setUserData(response.data.data);
    }
    return response.data;
  },
  (error) => {
    // Global error handling
    if (error.response && error.response.data) {
      if (["post", "patch"].includes(error.response.config.method)) {
        if (Object.keys(error.response.data.errors).length > 0) {
          return Promise.reject(error.response.data.errors);
        }
        toastError(error.response.data.message);
        return Promise.reject({});
      }
      if (error.response.config.method === "delete") {
        toastError(error.response.data.message);
        return Promise.reject(error);
      }
    } else if (error.response) {
      if (error.response.config.method === "get") {
        toastError(error.message);
        return Promise.reject(error);
      }
    }
    if (
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.token
    ) {
      toastError(error.response.data.errors.token);
      logOut();
      navigateTo(PAGE_ROUTE_URLS.LOGIN);
      return Promise.reject(error);
    }
    toastError("Something went wrong");
    return Promise.reject(error);
  }
);

export default customAxios;
