import { useEffect, useState } from "react";
import type { ColumnType } from "./types";

export const Filter: React.FC<{
  filterType: ColumnType | undefined;
  onFilterChange: (filter: string) => void;
}> = ({ filterType, onFilterChange }) => {
  const [filter, setFilter] = useState<string>("");

  if (filterType === undefined) return null;

  useEffect(() => {
    if (onFilterChange) onFilterChange(filter);
  }, [filter]);

  if (filterType === "string") {
    return (
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    );
  } else if (Array.isArray(filterType)) {
    return (
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value=""></option>
        {filterType.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
};
