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

export const LISTING_VIEW = {
  CARD: "card",
  LIST: "list",
};

export const SERVICE_URLS = {
  AUTH: "/auth",
  PRODUCTS: "/products",
  USERS: "/users",
};

export const SESSION_STORAGE_KEYS = {
  TOKEN: "token",
};
