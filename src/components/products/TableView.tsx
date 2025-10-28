import React from "react";
import type { IProduct } from "../../types";
import { localeDateString, priceFormat } from "../../utils/helper";
import Table from "../common/Table";
import IconButton from "../common/IconButton";
import { Pencil, Trash } from "lucide-react";

interface TableViewProps {
  products: IProduct[];
  onDeleteClick: (product: IProduct) => void;
  onEditClick: (product: IProduct) => void;
}

const TableView: React.FC<TableViewProps> = ({
  products,
  onDeleteClick,
  onEditClick,
}) => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    {
      key: "unit_price",
      label: "Price",
      render: (product: IProduct) => priceFormat(product.unit_price),
    },
    { key: "quantity", label: "Quantity" },
    {
      key: "created_at",
      label: "Created At",
      render: (product: IProduct) => localeDateString(product.created_at),
    },
    {
      key: "action",
      label: "Action",
      render: (product: IProduct) => (
        <div className="flex gap-2">
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
      ),
    },
  ];

  return <Table data={products} columns={columns} />;
};

export default TableView;
