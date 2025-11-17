import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ProductList from "./pages/products/ProductList";
import { PAGE_ROUTE_URLS, USER_ROLES } from "./utils/constant";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import OpenRoute from "./components/routes/OpenRoute";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";

const App: React.FC = () => {
  const protectedRoutes = [
    {
      path: PAGE_ROUTE_URLS.PRODUCT_LIST,
      element: <ProductList />,
      accessBy: [USER_ROLES.ADMIN],
    },
    {
      path: PAGE_ROUTE_URLS.PRODUCTS,
      element: <Products />,
      accessBy: [USER_ROLES.USER],
    },
    {
      path: PAGE_ROUTE_URLS.USERS,
      element: <Users />,
      accessBy: [USER_ROLES.ADMIN],
    },
  ];
  const openRoutes = [
    { path: PAGE_ROUTE_URLS.LOGIN, element: <Login /> },
    { path: PAGE_ROUTE_URLS.REGISTER, element: <Register /> },
    { path: PAGE_ROUTE_URLS.FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: PAGE_ROUTE_URLS.RESET_PASSWORD, element: <ResetPassword /> },
  ];
  return (
    <Routes>
      <Route path={PAGE_ROUTE_URLS.HOME} element={<Home />} />
      {protectedRoutes.map((route) => (
        <Route
          path={route.path}
          element={
            <ProtectedRoute element={route.element} accessBy={route.accessBy} />
          }
        />
      ))}
      {openRoutes.map((route) => (
        <Route
          path={route.path}
          element={<OpenRoute element={route.element} />}
        />
      ))}
      <Route path={PAGE_ROUTE_URLS.UNKNOWN} element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
