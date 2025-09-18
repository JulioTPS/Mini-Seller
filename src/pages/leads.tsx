import React, { useEffect, useState } from "react";
import type { TableColumn } from "../components/table/types";
import type { Lead } from "../types/lead";
import Table from "../components/table/table";
import { getLeads } from "../API/leads";

const Leads: React.FC = () => {
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLeads()
      .then((data) => setLeadsData(data))
      .catch((err) => setError(err.message));
  }, []);

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
      <Table columns={leadColumns} data={leadsData} />
    </>
  );
};

export default Leads;
