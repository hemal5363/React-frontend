import React from "react";
import type { IPagination, IProduct } from "../../types";
import { priceFormat } from "../../utils/helper";
import Table from "../common/Table";
import IconButton from "../common/IconButton";
import { Pencil, Trash } from "lucide-react";

interface TableViewProps {
  tableData: { rows: IProduct[]; pagination: IPagination };
  onDeleteClick: (product: IProduct) => void;
  onEditClick: (product: IProduct) => void;
  getProducts: (page?: number) => void;
}

const TableView: React.FC<TableViewProps> = ({
  tableData,
  onDeleteClick,
  onEditClick,
  getProducts,
}) => {
  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "description", label: "Description" },
    {
      key: "unit_price",
      label: "Price",
      render: (product: IProduct) => priceFormat(product.unit_price),
      sortable: true,
    },
    { key: "quantity", label: "Quantity", sortable: true },
    {
      key: "created_at",
      label: "Created At",
      sortable: true,
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

  return (
    <Table data={tableData} columns={columns} onPageChange={getProducts} />
  );
};

export default TableView;
