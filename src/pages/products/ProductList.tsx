import React, { useEffect, useState } from "react";
import { LayoutList, IdCard } from "lucide-react";
import type { IProduct } from "../../types";
import { getAllProducts } from "../../services/productService";
import CardView from "../../components/products/CardView";
import TableView from "../../components/products/TableView";
import MainWithLoader from "../../components/layout/MainWithLoader";
import { LISTING_VIEW } from "../../utils/constant";
import IconButton from "../../components/common/IconButton";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [view, setView] = useState(LISTING_VIEW.CARD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <MainWithLoader isLoading={loading}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>

        {/* View Toggle */}
        <div className="flex gap-2">
          <IconButton
            onClick={() => setView(LISTING_VIEW.CARD)}
            variant={view === LISTING_VIEW.CARD ? "primary" : "secondary"}
          >
            <IdCard size={20} />
          </IconButton>
          <IconButton
            onClick={() => setView(LISTING_VIEW.LIST)}
            variant={view === LISTING_VIEW.LIST ? "primary" : "secondary"}
          >
            <LayoutList size={20} />
          </IconButton>
        </div>
      </div>

      {/* Products */}
      {view === LISTING_VIEW.CARD ? (
        <CardView products={products} />
      ) : (
        <TableView products={products} />
      )}
    </MainWithLoader>
  );
};

export default ProductList;
