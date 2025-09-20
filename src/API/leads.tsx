import type { Lead } from "../types/lead";
import type { SortAndFilterParams } from "../components/table/types";

export async function resetLeadsLocalJSON() {
  let res = await fetch(`/src/data/leads.json`);
  if (!res.ok) throw new Error(`Failed to load leads`);

  let data: Lead[] = await res.json();
  localStorage.setItem("items", JSON.stringify(data));
}

export async function getLeadsWithFilter(
  sortAndFilters: SortAndFilterParams | null
): Promise<Lead[]> {
  const items = localStorage.getItem("items");
  if (!items) throw new Error("Failed to load leads (simulated error)");

  let data: Lead[] = JSON.parse(items);
  if (sortAndFilters) {
    let sortKeys = Object.keys(sortAndFilters.sorts).filter(
      (key) =>
        sortAndFilters.sorts[key] === "asc" ||
        sortAndFilters.sorts[key] === "desc"
    );
    if (sortKeys.length > 0) {
      data.sort((a, b) => {
        for (let key of sortKeys) {
          let order = sortAndFilters.sorts[key];
          let aVal = a[key as keyof Lead];
          let bVal = b[key as keyof Lead];
          if (aVal < bVal) return order === "asc" ? -1 : 1;
          if (aVal > bVal) return order === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    let filterKeys = Object.keys(sortAndFilters.filters).filter(
      (key) => sortAndFilters.filters[key] !== ""
    );
    if (filterKeys.length > 0) {
      data = data.filter((item) => {
        return filterKeys.every((key) => {
          let filterValue = sortAndFilters.filters[key];
          let itemValue = item[key as keyof Lead];
          if (typeof itemValue === "string") {
            return itemValue.toLowerCase().includes(filterValue.toLowerCase());
          }
          return true;
        });
      });
    }
    return data;
  }
  return data;
}

export async function putLead(form: Lead): Promise<void> {
  const items = localStorage.getItem("items");
  if (!items) throw new Error("Failed to load leads (simulated error)");
  let leads: Lead[] = JSON.parse(items);

  const idx = leads.findIndex((lead) => lead.id === form.id);
  if (idx === -1) throw new Error(`Lead with id ${form.id} not found`);
  leads[idx] = form;

  localStorage.setItem("items", JSON.stringify(leads));
}

export default null;
