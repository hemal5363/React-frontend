import axios from "axios";

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getItems = async () => {
  const response = await customAxios.get("/"); // your endpoint
  console.log(response);
  return response.data;
};

export default customAxios;
