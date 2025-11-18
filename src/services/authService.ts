import customAxios from ".";

import type { ILoginForm, IRegisterForm } from "../types";
import { SERVICE_URLS } from "../utils/constant";

export const registerUser = async (user: IRegisterForm) => {
  const response = await customAxios.post(
    `${SERVICE_URLS.AUTH}/register`,
    user
  );
  return response.data;
};

export const loginUser = async (user: ILoginForm) => {
  const response = await customAxios.post(`${SERVICE_URLS.AUTH}/login`, user);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await customAxios.post(
    `${SERVICE_URLS.AUTH}/forgot-password`,
    { email }
  );
  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await customAxios.patch(
    `${SERVICE_URLS.AUTH}/reset-password/${token}`,
    { password }
  );
  return response.data;
};
