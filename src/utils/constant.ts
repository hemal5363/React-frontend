export const PAGE_ROUTE_URLS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  PRODUCT_LIST: "/product-list",
  PRODUCTS: "/products",
  USERS: "/users",
  CHANGE_PASSWORD: "/change-password",
  USER_PROFILE: "/user-profile",
  UNKNOWN: "*",
};

export const SERVICE_URLS = {
  AUTH: "/auth",
  PRODUCTS: "/products",
  USER: "/user",
};

export const SESSION_STORAGE_KEYS = {
  TOKEN: "token",
  USER_DATA: "userData",
};

export const SESSION_USER_DATA_CHANGE_EVENT_NAME = "session-user-data-change";

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

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};
