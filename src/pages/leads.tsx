import React, { useEffect, useState } from "react";
import type { TableColumn } from "../components/table/types";
import { LeadStatus, type Lead } from "../types/lead";
import Table from "../components/table/table";
import { getLeadsWithFilter } from "../API/leads";
import type { SortAndFilterParams } from "../components/table/types";

const Leads: React.FC = () => {
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortAndFilters, setSortAndFilters] =
    useState<SortAndFilterParams | null>(null);

  useEffect(() => {
    getLeadsWithFilter(sortAndFilters)
      .then((data) => setLeadsData(data))
      .catch((err) => setError(err.message));
  }, [sortAndFilters]);

  if (error) return <div>Error: {error}</div>;
  if (!leadsData || leadsData.length === 0) return <div>No data available</div>;

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
      <Table
        columns={leadColumns}
        data={leadsData}
        onSortAndFilterChange={(query) =>
          query ? setSortAndFilters(query) : null
        }
      />
    </>
  );
};

export default Leads;
