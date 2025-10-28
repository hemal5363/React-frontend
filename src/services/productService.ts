import customAxios from ".";
import type { IProductForm } from "../types";
import { SERVICE_URLS } from "../utils/constant";

export const getAllProducts = async () => {
  const response = await customAxios.get(SERVICE_URLS.PRODUCTS);
  return response.data;
};

export const createProduct = async (product: IProductForm) => {
  const response = await customAxios.post(SERVICE_URLS.PRODUCTS, product);
  return response.data;
};

export const updateProduct = async (id: string, product: IProductForm) => {
  const response = await customAxios.patch(`${SERVICE_URLS.PRODUCTS}/${id}`, product);
  return response.data;
}

export const deleteProduct = async (id: string) => {
  const response = await customAxios.delete(`${SERVICE_URLS.PRODUCTS}/${id}`);
  return response.data;
};
