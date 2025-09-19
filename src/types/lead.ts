export enum LeadStatus {
  New = "new",
  Contacted = "contacted",
  Qualified = "qualified",
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
