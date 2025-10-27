import React from "react";
import type { IProduct } from "../../types";
import { localeDateString, priceFormat } from "../../utils/helper";
import Table from "../common/Table";

interface TableViewProps {
  products: IProduct[];
}

const TableView: React.FC<TableViewProps> = ({ products }) => {
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
  ];

  return <Table data={products} columns={columns} />;
};

export default TableView;
