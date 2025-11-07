import React, { useEffect, useState } from "react";
import type { IPagination, IProduct } from "../../types";
import { priceFormat } from "../../utils/helper";
import Card from "../common/Card";
import Text from "../common/Text";
import Loader from "../common/Loader";

interface CardViewProps {
  tableData: { rows: IProduct[]; pagination: IPagination };
  getProducts: (page?: number) => Promise<void>;
}

const CardView: React.FC<CardViewProps> = ({ tableData, getProducts }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isFetching = false;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        tableData.pagination.hasNextPage &&
        !isFetching
      ) {
        isFetching = true;
        setLoading(true);
        getProducts(tableData.pagination.page + 1).finally(() => {
          isFetching = false;
          setLoading(false);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    getProducts,
    tableData.pagination.hasNextPage,
    tableData.pagination.page,
  ]);

  return (
    <>
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tableData.rows.map((product) => (
          <Card key={product.id}>
            <Text variant="h2" size="lg" fontWeight="semibold" className="mb-2">
              {product.name}
            </Text>
            <Text className="mb-4">{product.description}</Text>
            <Text fontWeight="bold">
              Price: {priceFormat(product.unit_price)}
            </Text>
            <Text>Quantity: {product.quantity}</Text>
            <Text size="sm" className="mt-2">
              Created: {product.created_at}
            </Text>
          </Card>
        ))}
      </div>
      {tableData.rows.length === 0 && (
        <Text textCenter>No products found.</Text>
      )}
      {loading && <Loader />}
    </>
  );
};

export default CardView;
