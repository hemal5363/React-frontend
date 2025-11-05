import React, { useCallback, useEffect, useState } from "react";
import type { IPagination, IProduct, IProductForm } from "../../types";
import { deleteProduct, getAllProducts } from "../../services/productService";
import TableView from "../../components/products/TableView";
import MainWithLoader from "../../components/layout/MainWithLoader";
import { DEFAULT_PAGINATION } from "../../utils/constant";
import Button from "../../components/common/Button";
import AddEditProductDialog from "../../components/products/AddEditProductDialog";
import DeleteDialog from "../../components/common/DeleteDialog";
import Text from "../../components/common/Text";
import FormInput from "../../components/common/FormInput";

const ProductList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [openAddEditDialog, setAddEditDialog] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [tableData, setTableData] = useState<{
    rows: IProduct[];
    pagination: IPagination;
  }>({ rows: [], pagination: DEFAULT_PAGINATION });
  const [search, setSearch] = useState("");

  const getProducts = useCallback(
    async (page?: number, sortBy?: string, order?: string) => {
      setLoading(true);
      try {
        const { products, pagination: dbPagination } = await getAllProducts(
          page,
          search,
          sortBy,
          order
        );
        setTableData({ rows: products, pagination: dbPagination });
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
      getProducts();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [getProducts, search, reload]);

  const onEditClick = (product: IProduct) => {
    setSelectedProduct(product);
    setAddEditDialog(true);
  };

  const onDeleteClick = (product: IProduct) => {
    setSelectedProduct(product);
    setDeleteDialog(true);
  };

  const onDeleteSuccess = async () => {
    setDeleteLoading(true);
    try {
      await deleteProduct(selectedProduct!.id);
      getProducts(
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
    setSelectedProduct(null);
    setAddEditDialog(false);
    setDeleteDialog(false);
  };

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

        {/* View Toggle */}
        <div className="flex gap-2 justify-end">
          <Button variant="success" onClick={() => setAddEditDialog(true)}>
            Add Product
          </Button>
        </div>
      </div>

      {/* Products */}
      <TableView
        tableData={tableData}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
        getProducts={getProducts}
      />

      <AddEditProductDialog
        isOpen={openAddEditDialog}
        onClose={onClose}
        onSuccess={() => setReload(!reload)}
        formData={selectedProduct as IProductForm}
      />

      <DeleteDialog
        title="Delete Product"
        isOpen={openDeleteDialog}
        onClose={onClose}
        onSuccess={onDeleteSuccess}
        loading={isDeleteLoading}
      />
    </MainWithLoader>
  );
};

export default ProductList;
