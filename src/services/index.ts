import axios from "axios";
import { navigateTo, toastError, toastSuccess } from "../utils/helper";
import { PAGE_ROUTE_URLS } from "../utils/constant";

const customAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
      sessionStorage.setItem("token", response.data.token);
    }
    return response.data;
  },
  (error) => {
    // Global error handling
    if (error.response && error.response.data) {
      if (["post", "patch"].includes(error.response.config.method)) {
        return Promise.reject(error.response.data);
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
      error.response.data.message.toLowerCase().includes("token")
    ) {
      toastError(error.response.data.message);
      navigateTo(PAGE_ROUTE_URLS.LOGIN);
      return Promise.reject(error);
    }
    toastError("Something went wrong");
    return Promise.reject(error);
  }
);

export default customAxios;
