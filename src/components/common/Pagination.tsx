import React from "react";
import type { IPagination } from "../../types";
import IconButton from "./IconButton";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { DEFAULT_PAGINATION_PAGE } from "../../utils/constant";
import Text from "./Text";

interface PaginationProps {
  pagination: IPagination;
  onPageChange: (page: number, sortBy?: string, order?: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  return (
    pagination.total > 0 && (
      <div className="flex justify-center items-center mt-4 gap-2">
        <div className="flex">
          <IconButton
            variant="ghost"
            disabled={!pagination.hasPrevPage}
            size="sm"
            onClick={() =>
              onPageChange(
                DEFAULT_PAGINATION_PAGE,
                pagination.sortBy,
                pagination.order
              )
            }
          >
            <ChevronsLeft />
          </IconButton>
          <IconButton
            variant="ghost"
            disabled={!pagination.hasPrevPage}
            size="sm"
            onClick={() =>
              onPageChange(
                pagination.page - 1,
                pagination.sortBy,
                pagination.order
              )
            }
          >
            <ChevronLeft />
          </IconButton>
        </div>
        <Text size="sm" fontWeight="medium">
          Page {pagination.page} of {pagination.totalPages}
        </Text>
        <div className="flex">
          <IconButton
            variant="ghost"
            disabled={!pagination.hasNextPage}
            size="sm"
            onClick={() =>
              onPageChange(
                pagination.page + 1,
                pagination.sortBy,
                pagination.order
              )
            }
          >
            <ChevronRight />
          </IconButton>
          <IconButton
            variant="ghost"
            disabled={!pagination.hasNextPage}
            size="sm"
            onClick={() =>
              onPageChange(
                pagination.totalPages,
                pagination.sortBy,
                pagination.order
              )
            }
          >
            <ChevronsRight />
          </IconButton>
        </div>
      </div>
    )
  );
};

export default Pagination;
