import React, { useEffect, useState } from "react";
import type { TableColumn } from "../components/table/types";
import { LeadStatus, type Lead } from "../types/lead";
import Table from "../components/table/table";
import { getLeadsWithFilter, putLead, resetLeadsLocalJSON } from "../API/leads";
import type { SortAndFilterParams } from "../components/table/types";
import { SidePanel } from "../components/side-panel/sidePanel";
import { LeadForm } from "./leadsForm";

const Leads: React.FC = () => {
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SortAndFilterParams | null>(() => {
    let saved = localStorage.getItem("lastLeadQuery");
    let filters: SortAndFilterParams = saved ? JSON.parse(saved) : null;
    console.log("Loaded saved query:", filters);
    return filters;
  });
  const [selectedRow, setSelectedRow] = useState<Lead | null>(null);

  useEffect(() => {
    getLeadsWithFilter(filters)
      .then((data) => setLeadsData(data))
      .catch((err) => setError(err.message));
  }, [filters]);

  function onSaveForm(form: Lead) {
    setSelectedRow(null);
    putLead(form)
      .then(() => getLeadsWithFilter(filters))
      .then((data) => setLeadsData(data))
      .catch((err) => setError(err.message));
  }

  function onFiltersChange(params: SortAndFilterParams) {
    localStorage.setItem("lastLeadQuery", JSON.stringify(params));
    setFilters(params);
  }

  function resetData() {
    resetLeadsLocalJSON()
      .then(() => getLeadsWithFilter(null))
      .then((data) => setLeadsData(data))
      .catch((err) => setError(err.message));
  }

  const leadColumns: TableColumn<Lead>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name", columnFilterType: "string" },
    { header: "Company", accessor: "company", columnFilterType: "string" },
    { header: "Email", accessor: "email", columnFilterType: "string" },
    { header: "Source", accessor: "source", columnFilterType: "string" },
    { header: "Score", accessor: "score" },
    {
      header: "Status",
      accessor: "status",
      columnFilterType: Object.values(LeadStatus),
    },
  ];

  return (
    <>
      <button onClick={() => resetData()}>Reset Leads Data</button>
      <Table
        columns={leadColumns}
        data={leadsData}
        filters={filters}
        onFiltersChange={(query) => (query ? onFiltersChange(query) : null)}
        onRowClick={(row) => setSelectedRow(row)}
        onCustomButtonClick={(lead) => alert("Custom button clicked!")}
        customButtonText="Convert to Opportunity"
      />
      {(!leadsData || leadsData.length === 0) && <div>No data available</div>}
      {error && <div>Error: {error}</div>}
      {selectedRow && (
        <SidePanel onClose={() => setSelectedRow(null)}>
          <LeadForm
            lead={selectedRow}
            onSaveClick={(form) => onSaveForm(form)}
          />
        </SidePanel>
      )}
    </>
  );
};

export default Leads;
