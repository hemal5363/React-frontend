export interface IError {
  errors: Record<string, string>;
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
