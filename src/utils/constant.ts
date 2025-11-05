export const PAGE_ROUTE_URLS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  PRODUCT_LIST: "/product-list",
  UNKNOWN: "*",
};

export const HEADER_LINKS = [
  { name: "Home", path: PAGE_ROUTE_URLS.HOME },
  { name: "Products", path: PAGE_ROUTE_URLS.PRODUCT_LIST },
];

export const SERVICE_URLS = {
  AUTH: "/auth",
  PRODUCTS: "/products",
  USER: "/user",
};

export const SESSION_STORAGE_KEYS = {
  TOKEN: "token",
  USER_DATA: "userData",
};

export const DEFAULT_PAGINATION_LIMIT = 6;

export const DEFAULT_PAGINATION_PAGE = 1;

export const DEFAULT_PAGINATION = {
  total: 0,
  page: DEFAULT_PAGINATION_PAGE,
  limit: DEFAULT_PAGINATION_LIMIT,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
  sortBy: "created_at",
  order: "asc",
};
