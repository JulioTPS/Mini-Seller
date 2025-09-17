import { useState } from 'react';
import LeadsList from './components/LeadsList';
import LeadDetailPanel from './components/LeadDetailPanel';
import { useLeads } from './hooks/useLeads';
import type { Lead } from './types';
import './App.css';

function App() {
  const { leads, opportunities, loading, error, updateLead, convertToOpportunity } = useLeads();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setSelectedLead(null);
  };

  const handleConvertToOpportunity = (lead: Lead, opportunityData: any) => {
    const newOpportunity = convertToOpportunity(lead, opportunityData);
    console.log('Created opportunity:', newOpportunity);
    // You could show a success message here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mini-Seller</h1>
          <p className="mt-2 text-gray-600">
            Manage your leads and convert them into opportunities
          </p>
          {opportunities.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                🎉 {opportunities.length} opportunity{opportunities.length !== 1 ? 'ies' : 'y'} created!
              </p>
            </div>
          )}
        </div>

        {/* Leads List */}
        <LeadsList
          leads={leads}
          onLeadSelect={handleLeadSelect}
          loading={loading}
          error={error}
        />

        {/* Lead Detail Panel */}
        <LeadDetailPanel
          lead={selectedLead}
          isOpen={isPanelOpen}
          onClose={handlePanelClose}
          onUpdateLead={updateLead}
          onConvertToOpportunity={handleConvertToOpportunity}
        />
      </div>
    </div>
  );
}

export default App;
