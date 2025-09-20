import type { Lead } from "../types/lead";
import type { SortAndFilterParams } from "../components/table/types";
import { resetOpportunitiesLocalStorage } from "./opportunities";

const LEADS_KEY = "leadsData";

export async function resetLocalStorage() {
  await resetLeadsLocalStorage();
  await resetOpportunitiesLocalStorage();
}

export async function resetLeadsLocalStorage() {
  const res = await fetch(`/src/data/leads.json`);
  if (!res.ok) throw new Error(`Failed to load leads`);

  const data: Lead[] = await res.json();
  localStorage.setItem(LEADS_KEY, JSON.stringify(data));
}

async function getLeadsLocal(): Promise<Lead[]> {
  const raw = localStorage.getItem(LEADS_KEY);
  if (!raw) throw new Error("Failed to load leads (simulated error)");
  return JSON.parse(raw);
}

export async function getLeadsWithFilter(
  sortAndFilters: SortAndFilterParams | null
): Promise<Lead[]> {
  let data = await getLeadsLocal();
  if (sortAndFilters) {
    const sortKeys = Object.keys(sortAndFilters.sorts).filter(
      (key) =>
        sortAndFilters.sorts[key] === "asc" ||
        sortAndFilters.sorts[key] === "desc"
    );
    if (sortKeys.length > 0) {
      data.sort((a, b) => {
        for (const key of sortKeys) {
          const order = sortAndFilters.sorts[key];
          const aVal = a[key as keyof Lead];
          const bVal = b[key as keyof Lead];
          if (aVal < bVal) return order === "asc" ? -1 : 1;
          if (aVal > bVal) return order === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    const filterKeys = Object.keys(sortAndFilters.filters).filter(
      (key) => sortAndFilters.filters[key] !== ""
    );
    if (filterKeys.length > 0) {
      data = data.filter((item) => {
        return filterKeys.every((key) => {
          const filterValue = sortAndFilters.filters[key];
          const itemValue = item[key as keyof Lead];
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
  const leads = await getLeadsLocal();

  const idx = leads.findIndex((lead) => lead.id === form.id);
  if (idx !== -1) {
    leads[idx] = form;
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  } else {
    throw new Error(`Lead with id ${form.id} not found`);
  }
}

export default null;
