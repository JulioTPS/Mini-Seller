export enum LeadStatus {
  New = "New",
  Contacted = "Contacted",
  Qualified = "Qualified",
}

export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}
