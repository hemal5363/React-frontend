import axios from "axios";
import { toastError } from "../utils/helper";

const customAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Global error handling
    if (error.response) {
      // Server responded with a status outside 2xx
      console.error(
        "Server Error:",
        error.response.status,
        error.response.data
      );
      toastError(
        `Server Error: ${error.response.status} - ${
          error.response.data?.message || "Something went wrong"
        }`
      );
    } else if (error.request) {
      // Request was made but no response
      console.error("Network Error:", error.request);
      toastError("Network error. Please check your connection.");
    } else {
      // Something else happened
      console.error("Unexpected Error:", error.message);
      toastError(`Unexpected error: ${error.message}`);
    }
    return Promise.reject(error); // Keep promise rejection so caller can also handle it if needed
  }
);

export default customAxios;
