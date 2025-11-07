import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ProductList from "./pages/products/ProductList";
import { PAGE_ROUTE_URLS } from "./utils/constant";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import OpenRoute from "./components/routes/OpenRoute";
import Products from "./pages/products/Products";

const App: React.FC = () => {
  const protectedRoutes = [
    { path: PAGE_ROUTE_URLS.PRODUCT_LIST, element: <ProductList /> },
    { path: PAGE_ROUTE_URLS.PRODUCTS, element: <Products /> },
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
          element={<ProtectedRoute element={route.element} />}
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
