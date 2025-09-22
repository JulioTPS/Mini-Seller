import { useEffect, useState } from "react";
import type { ColumnType, Sort } from "./types";
import "./table.css";

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
    <div className="flex flex-col items-center relative justify-end">
      {Array.isArray(filterType) ? (
        <div className="table-filters">
          <img src="/search.svg" alt="Filter Icon" className="filter-icon" />
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
        </div>
      ) : filterType === "string" ? (
        <div className="table-filters">
          <img src="/search.svg" alt="Filter Icon" className="filter-icon" />
          <input
            type="text"
            value={columnFilterState}
            onChange={(e) => setColumnFilterState(e.target.value)}
          />
        </div>
      ) : (
        <div className="h-8"></div>
      )}
      <div
        className="w-full flex justify-center items-center text-nowrap pl-[2ch] cursor-pointer border-t border-gray-300"
        onClick={() => handleSort()}
      >
        {children}
        {columnSort === "asc" && " ▲"}
        {columnSort === "desc" && " ▼"}
        {columnSort === "" && <span className="w-[2ch]"></span>}
      </div>
    </div>
  );
};
