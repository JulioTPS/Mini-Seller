export enum OpportunityStage {
  New = "New",
  Proposal = "Proposal",
  Negotiation = "Negotiation",
  ClosedWon = "Closed Won",
  ClosedLost = "Closed Lost",
}

export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
  leadId: string;
}
