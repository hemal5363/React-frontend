// src/routes/ProtectedRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { PAGE_ROUTE_URLS, SESSION_STORAGE_KEYS } from "../../utils/constant";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = sessionStorage.getItem(SESSION_STORAGE_KEYS.TOKEN);

  if (!token) {
    return <Navigate to={PAGE_ROUTE_URLS.LOGIN} replace />;
  }

  return element;
};

export default ProtectedRoute;
