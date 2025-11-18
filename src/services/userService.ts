import customAxios from ".";
import type { IUserForm } from "../types";
import { DEFAULT_PAGINATION_LIMIT, SERVICE_URLS } from "../utils/constant";

export const getAllUsers = async (
  page?: number,
  search?: string,
  sortBy?: string,
  order?: string
) => {
  const response = await customAxios.get(SERVICE_URLS.USER, {
    params: { page, limit: DEFAULT_PAGINATION_LIMIT, sortBy, order, search },
  });
  return response.data;
};

export const createUser = async (user: IUserForm) => {
  const response = await customAxios.post(SERVICE_URLS.USER, user);
  return response.data;
};

export const updateUser = async (id: string, user: IUserForm) => {
  const response = await customAxios.patch(`${SERVICE_URLS.USER}/${id}`, user);
  return response.data;
};

export const UpdatePassword = async (oldPassword: string, password: string) => {
  const response = await customAxios.patch(
    `${SERVICE_URLS.USER}/me/update-password`,
    { oldPassword, password }
  );
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await customAxios.delete(`${SERVICE_URLS.USER}/${id}`);
  return response.data;
};
