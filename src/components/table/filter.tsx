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
        className="border p-1 mb-1 bg-gray-800"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    );
  } else if (Array.isArray(filterType)) {
    return <div>{filterType} est un array</div>;
  }
};
