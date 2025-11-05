import React from "react";
import Pagination from "./Pagination";
import type { IPagination } from "../../types";
import { ArrowDownZA, ArrowUpAZ } from "lucide-react";
import { DEFAULT_PAGINATION_PAGE } from "../../utils/constant";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  data: { rows: T[]; pagination: IPagination };
  columns: Column<T>[];
  onPageChange: (page?: number, sortBy?: string, order?: string) => void;
}

const Table = <T extends { id?: string | number }>({
  data,
  columns,
  onPageChange,
}: TableProps<T>) => {
  return (
    <>
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white">
              {columns.map((col) => (
                <th key={col.key as string} className="px-4 py-2">
                  <div
                    className={`flex items-center gap-1 ${
                      col.sortable && "cursor-pointer"
                    }`}
                    onClick={
                      col.sortable
                        ? () => {
                            onPageChange(
                              DEFAULT_PAGINATION_PAGE,
                              col.key as string,
                              data.pagination.order === "asc" ? "desc" : "asc"
                            );
                          }
                        : undefined
                    }
                  >
                    {col.label}
                    {col.sortable &&
                      (data.pagination.sortBy === col.key &&
                      data.pagination.order === "asc" ? (
                        <ArrowDownZA className="w-4 h-4" />
                      ) : (
                        <ArrowUpAZ className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr
                key={row.id ?? rowIndex}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className="px-4 py-2 text-gray-900 dark:text-gray-200"
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
            {data.rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-2 text-gray-900 dark:text-gray-200 text-center"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination pagination={data.pagination} onPageChange={onPageChange} />
    </>
  );
};

export default Table;
