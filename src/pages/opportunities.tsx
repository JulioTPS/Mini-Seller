import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SidePanel } from "../components/side-panel/sidePanel";
import { OpportunityStage, type Opportunity } from "../types/opportunity";
import {
  getOpportunities,
  getOpportunitiesWithFilter,
  putOpportunity,
} from "../API/opportunities";
import Table from "../components/table/table";
import type {
  SortAndFilterParams,
  TableColumn,
} from "../components/table/types";
import { OpportunityForm } from "./opportunityForm";

const OpportunitiesPage: React.FC = () => {
  const location = useLocation();
  const opportunity = location.state?.opportunity;
  const [selectedRow, setSelectedRow] = useState<Opportunity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SortAndFilterParams | null>(() => {
    const saved = localStorage.getItem("lastLeadQuery");
    const filters: SortAndFilterParams = saved ? JSON.parse(saved) : null;
    return filters;
  });
  const [opportunitiesData, setOpportunitiesData] = useState<Opportunity[]>([]);

  useEffect(() => {
    getOpportunitiesWithFilter(filters)
      .then((data) => setOpportunitiesData(data))
      .catch((err) => setError(err.message));
  }, [filters]);

  useEffect(() => {
    if (opportunity) {
      const foundOpportunity = getOpportunities().find(
        (o) => o.id === opportunity.id
      );
      if (foundOpportunity) setSelectedRow(foundOpportunity);
    }
  }, [opportunity]);

  function onFiltersChange(params: SortAndFilterParams) {
    localStorage.setItem("lastOpportunityQuery", JSON.stringify(params));
    setFilters(params);
  }

  async function onSaveForm(form: Opportunity) {
    try {
      await putOpportunity(form);
      const data = await getOpportunitiesWithFilter(filters);
      setOpportunitiesData(data);
      setSelectedRow(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  const opportunityColumns: TableColumn<Opportunity>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name", columnFilterType: "string" },
    {
      header: "Stage",
      accessor: "stage",
      columnFilterType: Object.values(OpportunityStage),
    },
    { header: "Amount", accessor: "amount" },
    {
      header: "Acount Name",
      accessor: "accountName",
      columnFilterType: "string",
    },
  ];

  return (
    <div>
      <Table
        columns={opportunityColumns}
        data={opportunitiesData}
        filters={filters}
        onFiltersChange={(query) => (query ? onFiltersChange(query) : null)}
        onRowClick={(row) => setSelectedRow(row)}
      />
      {(!opportunitiesData || opportunitiesData.length === 0) && (
        <div>No data available</div>
      )}
      {error && <div>Error: {error}</div>}
      {selectedRow && (
        <SidePanel onClose={() => setSelectedRow(null)}>
          <OpportunityForm
            opportunity={selectedRow}
            onSaveClick={(form) => onSaveForm(form)}
          />
        </SidePanel>
      )}
    </div>
  );
};

export default OpportunitiesPage;
