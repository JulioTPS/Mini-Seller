import { useState, useEffect } from "react";
import leadsData from "./data/leads.json";
import "./App.css";

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
}

interface Opportunity {
  id: number;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
}

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate async fetch with setTimeout
    setTimeout(() => {
      try {
        setLeads(leadsData);
        setLoading(false);
      } catch (e) {
        setError("Failed to load leads");
        setLoading(false);
      }
    }, 500);
  }, []);

  const handleConvert = (lead: Lead) => {
    const newOpp: Opportunity = {
      id: Date.now(),
      name: lead.name,
      stage: "New",
      accountName: lead.company,
    };
    setOpportunities((prev) => [...prev, newOpp]);
    setSelectedLead(null);
  };
  if (loading) return <div className="p-4">Loading leads...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Leads Table */}
      <div>
        <h2 className="text-xl font-bold mb-2">Leads</h2>
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedLead(lead)}
              >
                <td className="p-2 border">{lead.name}</td>
                <td className="p-2 border">{lead.company}</td>
                <td className="p-2 border">{lead.score}</td>
                <td className="p-2 border">{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Opportunities Table */}
      <div>
        <h2 className="text-xl font-bold mb-2">Opportunities</h2>
        {opportunities.length === 0 ? (
          <p>No opportunities yet</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Stage</th>
                <th className="p-2 border">Account</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id}>
                  <td className="p-2 border">{opp.name}</td>
                  <td className="p-2 border">{opp.stage}</td>
                  <td className="p-2 border">{opp.accountName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over Panel */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end">
          <div className="bg-white w-96 p-4 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Lead Details</h3>
            <p>
              <strong>Name:</strong> {selectedLead.name}
            </p>
            <p>
              <strong>Company:</strong> {selectedLead.company}
            </p>
            <p>
              <strong>Email:</strong> {selectedLead.email}
            </p>
            <p>
              <strong>Status:</strong> {selectedLead.status}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => handleConvert(selectedLead)}
              >
                Convert to Opportunity
              </button>
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setSelectedLead(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
