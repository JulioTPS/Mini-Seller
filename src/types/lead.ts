export enum LeadStatus {
  New = "New",
  Contacted = "Contacted",
  Abandoned = "Abandoned",
  Converted = "Converted",
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
