import React from "react";

interface Column<T> {
  key: keyof T | string; // property name in the object or custom key
  label: string;         // header label
  render?: (item: T) => React.ReactNode; // custom cell renderer
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

const Table = <T extends { id?: string | number }>({
  data,
  columns,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
            {columns.map((col) => (
              <th key={col.key as string} className="px-4 py-2">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
        </tbody>
      </table>
    </div>
  );
};

export default Table;
