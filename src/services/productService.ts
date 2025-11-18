import customAxios from ".";

import type { IProductForm } from "../types";
import { DEFAULT_PAGINATION_LIMIT, SERVICE_URLS } from "../utils/constant";

export const getAllProducts = async (
  page?: number,
  search?: string,
  sortBy?: string,
  order?: string
) => {
  const response = await customAxios.get(SERVICE_URLS.PRODUCTS, {
    params: { page, limit: DEFAULT_PAGINATION_LIMIT, sortBy, order, search },
  });
  return response.data;
};

export const createProduct = async (product: IProductForm) => {
  const response = await customAxios.post(SERVICE_URLS.PRODUCTS, product);
  return response.data;
};

export const updateProduct = async (id: string, product: IProductForm) => {
  const response = await customAxios.patch(
    `${SERVICE_URLS.PRODUCTS}/${id}`,
    product
  );
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await customAxios.delete(`${SERVICE_URLS.PRODUCTS}/${id}`);
  return response.data;
};
