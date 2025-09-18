import React, { useEffect, useState } from "react";
import type { SortOrder, TableColumn } from "../components/table/types";
import type { Lead } from "../types/lead";
import Table from "../components/table/table";
import { getLeadsWithFilter } from "../API/leads";

const Leads: React.FC = () => {
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Record<string, SortOrder> | null>(null);

  useEffect(() => {
    getLeadsWithFilter(filter)
      .then((data) => setLeadsData(data))
      .catch((err) => setError(err.message));
  }, [filter]);

  if (error) return <div>Error: {error}</div>;
  if (!leadsData || leadsData.length === 0) return <div>No data available</div>;

  const leadColumns: TableColumn<Lead>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Company", accessor: "company" },
    { header: "Email", accessor: "email" },
    { header: "Source", accessor: "source" },
    { header: "Score", accessor: "score" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <>
      <Table
        columns={leadColumns}
        data={leadsData}
        onSortChange={(query) => (query ? setFilter(query) : null)}
      />
    </>
  );
};

export default Leads;
