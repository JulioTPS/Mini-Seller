import { useEffect, useState } from "react";
import type { ColumnType, Sort } from "./types";

export const Filter: React.FC<{
  filterType: ColumnType | undefined;
  children?: React.ReactNode;
  columnFilter?: string;
  columnSort?: Sort;
  onFilterChange: (columnFilter: string, columnSort: Sort) => void;
}> = ({ filterType, children, columnFilter, columnSort, onFilterChange }) => {
  const [columnFilterState, setColumnFilterState] = useState<string>(
    columnFilter || ""
  );
  const [columnSortState, setColumnSortState] = useState<Sort>(
    columnSort || ""
  );

  useEffect(() => {
    if (onFilterChange) onFilterChange(columnFilterState, columnSortState);
  }, [columnFilterState, columnSortState]);

  const handleSort = () => {
    setColumnSortState((prev) => {
      if (!prev) {
        return "asc";
      } else if (prev === "asc") {
        return "desc";
      } else {
        // prev === "desc"
        return "";
      }
    });
  };

  return (
    <>
      {Array.isArray(filterType) ? (
        <select
          value={columnFilterState}
          onChange={(e) => setColumnFilterState(e.target.value)}
        >
          <option value=""></option>
          {filterType.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : filterType === "string" ? (
        <input
          type="text"
          value={columnFilterState}
          onChange={(e) => setColumnFilterState(e.target.value)}
        />
      ) : null}
      <div onClick={() => handleSort()}>
        {children}
        {columnSort === "asc" && " ▲"}
        {columnSort === "desc" && " ▼"}
      </div>
    </>
  );
};
