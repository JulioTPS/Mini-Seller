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
  }, [sortAndFilters]);

  return (
    <>
      <table className="border-collapse border border-gray-300 w-full mt-14">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="border p-2 text-left cursor-pointer"
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
              <td key="custom-button" className="border p-2">
                {onCustomButtonClick && customButtonText && (
                  <button onClick={() => onCustomButtonClick(lead)}>
                    {customButtonText}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
