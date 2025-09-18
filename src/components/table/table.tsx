import { useState, useEffect } from "react";
import type { TableProps, SortOrder } from "./types";

const Table = <T extends object>({
  columns,
  data,
  onSortChange,
}: TableProps<T>) => {
  const [sortOrders, setSortOrders] = useState<Record<string, SortOrder>>({});

  const handleSort = (accessor: keyof T) => {
    setSortOrders((prev) => {
      const key = String(accessor);
      let nextOrder: SortOrder = "";
      if (!prev[key]) nextOrder = "asc";
      else if (prev[key] === "asc") nextOrder = "desc";
      else if (prev[key] === "desc") nextOrder = "";
      return { ...prev, [key]: nextOrder };
    });
  };

  useEffect(() => {
    if (onSortChange) onSortChange(sortOrders);
  }, [sortOrders, onSortChange]);

  return (
    <>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                onClick={() => handleSort(col.accessor)}
                key={String(col.accessor)}
                className="border p-2 text-left cursor-pointer"
              >
                {col.header}
                {sortOrders[String(col.accessor)] === "asc" && " ▲"}
                {sortOrders[String(col.accessor)] === "desc" && " ▼"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="even:bg-gray-900">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="border p-2">
                  {String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
