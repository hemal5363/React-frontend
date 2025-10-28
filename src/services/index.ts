import axios from "axios";
import { toastError, toastSuccess } from "../utils/helper";

const customAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
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
    toastError("Something went wrong");
    return Promise.reject(error);
  }
);

export default customAxios;
