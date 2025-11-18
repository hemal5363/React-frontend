import React from "react";
import { Pencil, Trash } from "lucide-react";

import type { Column, IPagination, IUser } from "../../types";

import IconButton from "../common/IconButton";
import Table from "../common/Table";

interface TableViewProps {
  tableData: { rows: IUser[]; pagination: IPagination };
  onDeleteClick: (user: IUser) => void;
  onEditClick: (user: IUser) => void;
  getUsers: (page?: number) => void;
}

const TableView: React.FC<TableViewProps> = ({
  tableData,
  onDeleteClick,
  onEditClick,
  getUsers,
}) => {
  const columns: Column<IUser>[] = [
    { key: "name", label: "Name", sortable: true, maxWidth: "200px" },
    { key: "email", label: "Email", sortable: true, maxWidth: "300px" },
    { key: "role", label: "Role", sortable: true },
    {
      key: "created_at",
      label: "Created At",
      sortable: true,
    },
    {
      key: "action",
      label: "Action",
      render: (user: IUser) => (
        <div className="flex gap-2">
          <IconButton
            variant="primary"
            size="sm"
            onClick={() => onEditClick(user)}
          >
            <Pencil />
          </IconButton>
          <IconButton
            variant="danger"
            size="sm"
            onClick={() => onDeleteClick(user)}
          >
            <Trash />
          </IconButton>
        </div>
      ),
    },
  ];

  return <Table data={tableData} columns={columns} onPageChange={getUsers} />;
};

export default TableView;
