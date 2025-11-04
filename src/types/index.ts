export interface IError {
  errors: Record<string, string>;
  message: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface IProductForm {
  id?: string;
  name: string;
  description: string;
  unit_price: number;
  quantity: number;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IResetForm {
  password: string;
  confirmPassword: string;
}