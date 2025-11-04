import React, { useEffect, useState } from "react";
import { LayoutList, IdCard } from "lucide-react";
import type { IProduct, IProductForm } from "../../types";
import { deleteProduct, getAllProducts } from "../../services/productService";
import CardView from "../../components/products/CardView";
import TableView from "../../components/products/TableView";
import MainWithLoader from "../../components/layout/MainWithLoader";
import { LISTING_VIEW } from "../../utils/constant";
import IconButton from "../../components/common/IconButton";
import Button from "../../components/common/Button";
import AddEditProductDialog from "../../components/products/AddEditProductDialog";
import DeleteDialog from "../../components/common/DeleteDialog";
import Text from "../../components/common/Text";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [view, setView] = useState(LISTING_VIEW.CARD);
  const [loading, setLoading] = useState(true);
  const [openAddEditDialog, setAddEditDialog] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

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
      setReload(!reload);
    } catch (error) {
      console.log(error);
    } finally {
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

        {/* View Toggle */}
        <div className="flex gap-2 justify-end">
          <Button variant="success" onClick={() => setAddEditDialog(true)}>
            Add Product
          </Button>
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
        <CardView
          products={products}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      ) : (
        <TableView
          products={products}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      )}

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
