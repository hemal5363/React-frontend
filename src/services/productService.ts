import customAxios from ".";
import { SERVICE_URLS } from "../utils/constant";

export const getAllProducts = async () => {
  const response = await customAxios.get(SERVICE_URLS.PRODUCTS);
  return response.data;
};
