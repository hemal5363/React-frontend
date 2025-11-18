import React, { useCallback, useEffect, useState } from "react";

import Button from "../../components/common/Button";
import DeleteDialog from "../../components/common/DeleteDialog";
import FormInput from "../../components/common/FormInput";
import Text from "../../components/common/Text";
import MainWithLoader from "../../components/layout/MainWithLoader";
import AddEditUserDialog from "../../components/users/AddEditUserDialog";
import TableView from "../../components/users/TableView";
import { deleteUser, getAllUsers } from "../../services/userService";
import type { IPagination, IUser } from "../../types";
import { DEFAULT_PAGINATION } from "../../utils/constant";

const Users: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [openAddEditDialog, setAddEditDialog] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [tableData, setTableData] = useState<{
    rows: IUser[];
    pagination: IPagination;
  }>({ rows: [], pagination: DEFAULT_PAGINATION });
  const [search, setSearch] = useState("");

  const getUsers = useCallback(
    async (page?: number, sortBy?: string, order?: string) => {
      setLoading(true);
      try {
        const { users, pagination: dbPagination } = await getAllUsers(
          page,
          search,
          sortBy,
          order
        );
        setTableData({ rows: users, pagination: dbPagination });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [search]
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getUsers();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [getUsers, search, reload]);

  const onEditClick = (product: IUser) => {
    setSelectedUser(product);
    setAddEditDialog(true);
  };

  const onDeleteClick = (product: IUser) => {
    setSelectedUser(product);
    setDeleteDialog(true);
  };

  const onDeleteSuccess = async () => {
    setDeleteLoading(true);
    try {
      await deleteUser(selectedUser!.id);
      getUsers(
        tableData.pagination.page,
        tableData.pagination.sortBy,
        tableData.pagination.order
      );
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
      onClose();
    }
  };

  const onClose = () => {
    setSelectedUser(null);
    setAddEditDialog(false);
    setDeleteDialog(false);
  };

  return (
    <MainWithLoader isLoading={loading}>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center mb-8 gap-4">
        <Text variant="h1" size="md" fontWeight="bold">
          Users
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

        {/* View Toggle */}
        <div className="flex gap-2 justify-end">
          <Button variant="success" onClick={() => setAddEditDialog(true)}>
            Add User
          </Button>
        </div>
      </div>

      {/* Products */}
      <TableView
        tableData={tableData}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
        getUsers={getUsers}
      />

      <AddEditUserDialog
        isOpen={openAddEditDialog}
        onClose={onClose}
        onSuccess={() => setReload(!reload)}
        formData={selectedUser as IUser}
      />

      <DeleteDialog
        title="Delete User"
        isOpen={openDeleteDialog}
        onClose={onClose}
        onSuccess={onDeleteSuccess}
        loading={isDeleteLoading}
      />
    </MainWithLoader>
  );
};

export default Users;
