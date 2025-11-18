import React, { useCallback, useEffect, useState } from "react";

import FormInput from "../../components/common/FormInput";
import Text from "../../components/common/Text";
import MainWithLoader from "../../components/layout/MainWithLoader";
import CardView from "../../components/products/CardView";
import SelectInput from "../../components/common/SelectInput";
import { getAllProducts } from "../../services/productService";
import type { IPagination, IProduct } from "../../types";
import { DEFAULT_PAGINATION } from "../../utils/constant";
import { asyncErrorHandler } from "../../utils/helper";

const SORT_OPTIONS = [
  { value: "created_at desc", label: "Created At (New to Old)" },
  { value: "created_at asc", label: "Created At (Old to New)" },
  { value: "name asc", label: "Name (A-Z)" },
  { value: "name desc", label: "Name (Z-A)" },
  { value: "price asc", label: "Price (Low to High)" },
  { value: "price desc", label: "Price (High to Low)" },
  { value: "quantity asc", label: "Quantity (Low to High)" },
  { value: "quantity desc", label: "Quantity (High to Low)" },
];

const Products: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<{
    rows: IProduct[];
    pagination: IPagination;
  }>({ rows: [], pagination: DEFAULT_PAGINATION });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS[0].value);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProducts = useCallback(
    asyncErrorHandler(async (page?: number) => {
      const { products, pagination: dbPagination } = await getAllProducts(
        page,
        search,
        sortBy.split(" ")[0],
        sortBy.split(" ")[1]
      );
      setTableData((prevTableData) => ({
        rows: [...prevTableData.rows, ...products],
        pagination: dbPagination,
      }));
    }, setLoading),
    [search, sortBy]
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);
      setTableData({ rows: [], pagination: DEFAULT_PAGINATION });
      getProducts();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [getProducts, search, sortBy]);

  return (
    <MainWithLoader isLoading={loading}>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center mb-8 gap-4">
        <Text variant="h1" size="md" fontWeight="bold">
          Products
        </Text>

        <FormInput
          type="search"
          placeholder="Search..."
          showSearchIcon
          name="search"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          fullWidth={false}
        />

        <div className="flex items-center gap-2">
          <SelectInput
            name="sortBy"
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            hideNullOption
            width="w-60"
          />
        </div>
      </div>

      <CardView tableData={tableData} getProducts={getProducts} />
    </MainWithLoader>
  );
};

export default Products;
