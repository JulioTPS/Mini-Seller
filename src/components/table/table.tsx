import { useState, useEffect } from "react";
import type { TableProps, Sort, SortAndFilterParams } from "./types";
import { Filter } from "./filter";

const Table = <T extends object>({
  columns,
  data,
  onSortAndFilterChange,
}: TableProps<T>) => {
  const [sorts, setSorts] = useState<Record<string, Sort>>({});
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSort = (accessor: keyof T) => {
    setSorts((prev) => {
      const key = String(accessor);
      let nextOrder: Sort = "";
      if (!prev[key]) nextOrder = "asc";
      else if (prev[key] === "asc") nextOrder = "desc";
      else if (prev[key] === "desc") nextOrder = "";
      return { ...prev, [key]: nextOrder };
    });
  };

  function handleFilterChange(column: keyof T, filter: string) {
    setFilters((prev) => ({ ...prev, [String(column)]: filter }));
  }

  useEffect(() => {
    if (onSortAndFilterChange)
      onSortAndFilterChange({
        sorts: sorts,
        filters: filters,
      } as SortAndFilterParams);
  }, [sorts, filters]);

  return (
    <>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="border p-2 text-left cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <div>
                    <Filter
                      filterType={col.columnFilterType}
                      onFilterChange={(filters) =>
                        handleFilterChange(col.accessor, filters)
                      }
                    />
                  </div>
                  <div onClick={() => handleSort(col.accessor)}>
                    {col.header}
                    {sorts[String(col.accessor)] === "asc" && " ▲"}
                    {sorts[String(col.accessor)] === "desc" && " ▼"}
                  </div>
                </div>
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
