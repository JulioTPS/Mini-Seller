import { useState, useEffect } from "react";
import type { TableProps, Sort, SortAndFilterParams } from "./types";
import { Filter } from "./filter";

const Table = <T extends object>({
  columns,
  data,
  filters,
  onFiltersChange,
  onRowClick,
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
                      columnFilter={
                        filters ? filters.filters[String(col.accessor)] : ""
                      }
                      columnSort={
                        filters
                          ? (filters.sorts[String(col.accessor)] as Sort)
                          : ""
                      }
                      onFilterChange={(columnFilter, columnSort) =>
                        handleFilterChange(
                          col.accessor,
                          columnFilter,
                          columnSort
                        )
                      }
                    >
                      {col.header}
                    </Filter>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((lead, i) => (
            <tr
              key={i}
              className="even:bg-gray-900"
              onClick={() => onRowClick(lead)}
            >
              {columns.map((col) => (
                <td key={String(col.accessor)} className="border p-2">
                  {String(lead[col.accessor])}
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
