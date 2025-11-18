// src/routes/ProtectedRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

import { PAGE_ROUTE_URLS, SESSION_STORAGE_KEYS } from "../../utils/constant";
import { getUserRole } from "../../utils/helper";

interface ProtectedRouteProps {
  element: JSX.Element;
  accessBy: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  accessBy,
}) => {
  const token = sessionStorage.getItem(SESSION_STORAGE_KEYS.TOKEN);

  if (!token) {
    return <Navigate to={PAGE_ROUTE_URLS.LOGIN} replace />;
  }

  if (!accessBy.includes(getUserRole())) {
    return <Navigate to={PAGE_ROUTE_URLS.HOME} replace />;
  }

  return element;
};

export default ProtectedRoute;
