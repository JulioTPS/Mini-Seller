import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TableColumn } from "../components/table/types";
import { LeadStatus, type Lead } from "../types/lead";
import Table from "../components/table/table";
import { getLeadsWithFilter, putLead, resetLocalStorage } from "../API/leads";
import { convertLeadToOpportunity } from "../API/opportunities";
import type { SortAndFilterParams } from "../components/table/types";
import { SidePanel } from "../components/side-panel/sidePanel";
import { LeadForm } from "./leadForm";

const Leads: React.FC = () => {
  const navigate = useNavigate();
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SortAndFilterParams | null>(() => {
    const saved = localStorage.getItem("lastLeadQuery");
    const filters: SortAndFilterParams = saved ? JSON.parse(saved) : null;
    return filters;
  });
  const [selectedRow, setSelectedRow] = useState<Lead | null>(null);

  useEffect(() => {
    getLeadsWithFilter(filters)
      .then((data) => setLeadsData(data))
      .catch((err) => setError(err.message));
  }, [filters]);

  function onSaveForm(form: Lead) {
    putLead(form)
      .then(() => getLeadsWithFilter(filters))
      .then((data) => {
        setLeadsData(data);
        setSelectedRow(null);
      })
      .catch((err) => setError(err.message));
  }

  function onFiltersChange(params: SortAndFilterParams) {
    localStorage.setItem("lastLeadQuery", JSON.stringify(params));
    setFilters(params);
  }

  async function resetData() {
    try {
      await resetLocalStorage();
      const data = await getLeadsWithFilter(null);
      setLeadsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function convertLead(lead: Lead) {
    await convertLeadToOpportunity(lead).then((opportunity) => {
      navigate("/opportunities", {
        state: { opportunity: opportunity },
      });
    });
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
    <div className="relative card">
      <button className="!px-16" onClick={() => resetData()}>
        Reset Data
      </button>
      <Table
        columns={leadColumns}
        data={leadsData}
        filters={filters}
        onFiltersChange={(query) => (query ? onFiltersChange(query) : null)}
        onRowClick={(row) => setSelectedRow(row)}
        onCustomButtonClick={(lead) => {
          convertLead(lead);
        }}
        customButtonText="Convert to Opportunity"
      />

      {error && (
        <div className="text-center py-2 text-red-600">Error: {error}</div>
      )}
      {selectedRow && (
        <SidePanel onClose={() => setSelectedRow(null)}>
          <LeadForm
            lead={selectedRow}
            onSaveClick={(form) => onSaveForm(form)}
          />
        </SidePanel>
      )}
    </div>
  );
};

export default Leads;
