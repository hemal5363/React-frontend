// src/routes/OpenRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { PAGE_ROUTE_URLS, SESSION_STORAGE_KEYS } from "../../utils/constant";

interface OpenRouteProps {
  element: JSX.Element;
}

const OpenRoute: React.FC<OpenRouteProps> = ({ element }) => {
  const token = sessionStorage.getItem(SESSION_STORAGE_KEYS.TOKEN);

  if (token) {
    return <Navigate to={PAGE_ROUTE_URLS.HOME} replace />;
  }

  return element;
};

export default OpenRoute;
