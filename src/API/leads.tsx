import type { Lead } from "../types/lead";
import type { SortOrder } from "../components/table/types";

export async function getLeadsWithFilter(
  sortFilter: Record<string, SortOrder> | null
): Promise<Lead[]> {
  let res = await fetch(`/src/data/leads.json`);
  if (!res.ok) throw new Error(`Failed to load leads`);

  let data: Lead[] = await res.json();
  if (sortFilter) {
    let sortKeys = Object.keys(sortFilter).filter(
      (key) => sortFilter[key] === "asc" || sortFilter[key] === "desc"
    );
    if (sortKeys.length > 0) {
      data.sort((a, b) => {
        for (let key of sortKeys) {
          let order = sortFilter[key];
          let aVal = a[key as keyof Lead];
          let bVal = b[key as keyof Lead];
          if (aVal < bVal) return order === "asc" ? -1 : 1;
          if (aVal > bVal) return order === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }
  return data;
}

export default null;
