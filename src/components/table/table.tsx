import { useState, useEffect } from "react";
import type { TableProps, Sort, SortAndFilterParams } from "./types";
import { Filter } from "./filter";

const Table = <T extends object>({
  columns,
  data,
  filters,
  onFiltersChange,
  onRowClick,
  onCustomButtonClick,
  customButtonText,
}: TableProps<T>) => {
  const [sortAndFilters, setFilters] = useState<SortAndFilterParams>(
    filters || ({} as SortAndFilterParams)
  );

  function handleFilterChange(
    column: keyof T,
    columnFilter: string,
    columnSort: Sort
  ) {
    setFilters((prev) => ({
      sorts: { ...prev.sorts, [String(column)]: columnSort },
      filters: { ...prev.filters, [String(column)]: columnFilter },
    }));
  }

  useEffect(() => {
    if (onFiltersChange) onFiltersChange(sortAndFilters);
  }, [sortAndFilters, onFiltersChange]);

  return (
    <div className="overflow-auto h-11/12 border-2 border-gray-400 rounded-md">
      <table className="w-full ">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="border border-gray-400 p-2 text-left"
              >
                <Filter
                  filterType={col.columnFilterType}
                  columnFilter={
                    filters?.filters
                      ? filters.filters[String(col.accessor)]
                      : ""
                  }
                  columnSort={
                    filters?.sorts
                      ? (filters.sorts[String(col.accessor)] as Sort)
                      : ""
                  }
                  onFilterChange={(columnFilter, columnSort) =>
                    handleFilterChange(col.accessor, columnFilter, columnSort)
                  }
                >
                  {col.header}
                </Filter>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((lead, i) => (
            <tr key={i} className="even:bg-gray-900">
              {columns.map((col) => (
                <td
                  onClick={() => onRowClick(lead)}
                  key={String(col.accessor)}
                  className="border p-2 cursor-pointer"
                >
                  {String(lead[col.accessor])}
                </td>
              ))}
              {onCustomButtonClick && customButtonText && (
                <td key="custom-button" className="border p-2">
                  <button onClick={() => onCustomButtonClick(lead)}>
                    {customButtonText}
                  </button>
                </td>
              )}
            </tr>
          ))}
          {(!data || data.length === 0) && (
            <tr>
              <td colSpan={columns.length} className="text-center py-8">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
