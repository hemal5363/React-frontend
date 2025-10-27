import React from "react";
import type { IProduct } from "../../types";
import { localeDateString, priceFormat } from "../../utils/helper";

interface CardViewProps {
  products: IProduct[];
}

const CardView: React.FC<CardViewProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {product.description}
          </p>
          <p className="text-gray-800 dark:text-gray-200 font-semibold">
            Price: {priceFormat(product.unit_price)}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Quantity: {product.quantity}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Created: {localeDateString(product.created_at)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardView;
