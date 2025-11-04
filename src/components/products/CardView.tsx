import React from "react";
import type { IProduct } from "../../types";
import { priceFormat } from "../../utils/helper";
import IconButton from "../common/IconButton";
import { Trash, Pencil } from "lucide-react";
import Card from "../common/Card";
import Text from "../common/Text";

interface CardViewProps {
  products: IProduct[];
  onDeleteClick: (product: IProduct) => void;
  onEditClick: (product: IProduct) => void;
}

const CardView: React.FC<CardViewProps> = ({
  products,
  onDeleteClick,
  onEditClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex justify-between">
          <div>
            <Text variant="h2" size="lg" fontWeight="semibold" className="mb-2">
              {product.name}
            </Text>
            <Text className="mb-4">
              {product.description}
            </Text>
            <Text fontWeight="bold">
              Price: {priceFormat(product.unit_price)}
            </Text>
            <Text>Quantity: {product.quantity}</Text>
            <Text size="sm" className="mt-2">
              Created: {product.created_at}
            </Text>
          </div>
          <div className="flex gap-2 flex-row items-start">
            <IconButton
              variant="primary"
              size="sm"
              onClick={() => onEditClick(product)}
            >
              <Pencil />
            </IconButton>
            <IconButton
              variant="danger"
              size="sm"
              onClick={() => onDeleteClick(product)}
            >
              <Trash />
            </IconButton>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardView;
