import customAxios from ".";
import type { ILoginForm, IRegisterForm } from "../types";
import { SERVICE_URLS } from "../utils/constant";

export const registerUser = async (user: IRegisterForm) => {
  const response = await customAxios.post(SERVICE_URLS.USERS, user);
  return response.data;
};

export const loginUser = async (user: ILoginForm) => {
  const response = await customAxios.post(`${SERVICE_URLS.USERS}/login`, user);
  return response.data;
};
