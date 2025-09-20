import type { SortAndFilterParams } from "../components/table/types";
import { LeadStatus, type Lead } from "../types/lead";
import { OpportunityStage, type Opportunity } from "../types/opportunity";
import { putLead } from "./leads";

const OPPORTUNITIES_KEY = "opportunitiesData";

export async function resetOpportunitiesLocalStorage() {
  let res = await fetch(`/src/data/opportunities.json`);
  if (!res.ok) throw new Error(`Failed to load opportunities`);

  let data: Opportunity[] = await res.json();
  localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(data));
}

function getOpportunitiesLocal(): Opportunity[] {
  const raw = localStorage.getItem(OPPORTUNITIES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function getNewOpportunityId(): string {
  const opportunities = getOpportunitiesLocal();
  const maxId = opportunities.reduce(
    (max, opp) => Math.max(max, parseInt(opp.id)),
    0
  );
  return (maxId + 1).toString();
}

export async function getOpportunitiesWithFilter(
  sortAndFilters: SortAndFilterParams | null
): Promise<Opportunity[]> {
  let data = await getOpportunitiesLocal();
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
          let aVal = a[key as keyof Opportunity];
          let bVal = b[key as keyof Opportunity];
          if (aVal === bVal) continue;
          if (aVal === undefined) return order === "asc" ? 1 : -1;
          if (bVal === undefined) return order === "asc" ? -1 : 1;
          return order === "asc"
            ? aVal < bVal
              ? -1
              : 1
            : aVal > bVal
            ? -1
            : 1;
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
          let itemValue = item[key as keyof Opportunity];
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

export async function convertLeadToOpportunity(
  lead: Lead
): Promise<Opportunity> {
  let id: string = getNewOpportunityId();
  let opportunity: Opportunity = {
    id: id,
    name: lead.name,
    stage: OpportunityStage.New,
    amount: undefined,
    accountName: lead.company,
    leadId: lead.id.toString(),
  };
  const opportunities = getOpportunitiesLocal();
  opportunities.push(opportunity);
  localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(opportunities));
  await putLead({ ...lead, status: LeadStatus.Converted });
  return opportunity;
}

export function getOpportunities(): Opportunity[] {
  return getOpportunitiesLocal();
}

export async function putOpportunity(form: Opportunity): Promise<void> {
  let opportunities = getOpportunitiesLocal();
  let index = opportunities.findIndex((o) => o.id === form.id);
  if (index !== -1) {
    opportunities[index] = form;
    localStorage.setItem(OPPORTUNITIES_KEY, JSON.stringify(opportunities));
  } else {
    throw new Error(`Opportunity with id ${form.id} not found`);
  }
}
