import type { Lead } from "../types/lead";

export async function getLeads(): Promise<Lead[]> {
  const res = await fetch(`/src/data/leads.json`);
  if (!res.ok) throw new Error(`Failed to load leads`);

  const data: Lead[] = await res.json();
  return data;
}

export default null;
