import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ProductList from "./pages/products/ProductList";
import { PAGE_ROUTE_URLS } from "./utils/constant";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={PAGE_ROUTE_URLS.HOME} element={<Home />} />
      <Route path={PAGE_ROUTE_URLS.PRODUCT_LIST} element={<ProductList />} />
      <Route path={PAGE_ROUTE_URLS.REGISTER} element={<Register />} />
      <Route path={PAGE_ROUTE_URLS.LOGIN} element={<Login />} />
      <Route path={PAGE_ROUTE_URLS.UNKNOWN} element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
