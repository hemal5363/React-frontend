import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
// import ProductList from "./pages/Products/ProductList";
import { PAGE_ROUTE_URLS } from "./utils/constant";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={PAGE_ROUTE_URLS.HOME} element={<Home />} />
      {/* <Route path={PAGE_ROUTE_URLS.PRODUCT_LIST} element={<ProductList />} /> */}
      <Route path={PAGE_ROUTE_URLS.UNKNOWN} element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
