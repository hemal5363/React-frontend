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

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  sortBy: string;
  order: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface IUserForm {
  id?: string;
  name: string;
  email: string;
  role: string;
}

export interface ISelectOption {
  label: string;
  value: string | number;
}

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  maxWidth?: string;
  minWidth?: string;
}
