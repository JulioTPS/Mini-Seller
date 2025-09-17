import React, { useState, useEffect } from 'react';
import './App.css';
import LeadList from './components/LeadList';
import LeadForm from './components/LeadForm';
import OpportunityList from './components/OpportunityList';

// Sample initial data
const initialLeads = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'Tech Corp',
    status: 'new',
    score: 85,
    notes: 'Interested in our premium package'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@business.com',
    company: 'Business Inc',
    status: 'contacted',
    score: 92,
    notes: 'Ready to discuss pricing'
  },
  {
    id: 3,
    name: 'Mike Davis',
    email: 'mike@startup.io',
    company: 'Startup LLC',
    status: 'qualified',
    score: 78,
    notes: 'Small budget but high potential'
  }
];

function App() {
  const [leads, setLeads] = useState(initialLeads);
  const [opportunities, setOpportunities] = useState([]);
  const [currentView, setCurrentView] = useState('leads');
  const [selectedLead, setSelectedLead] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('mini-seller-leads');
    const savedOpportunities = localStorage.getItem('mini-seller-opportunities');
    
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
    if (savedOpportunities) {
      setOpportunities(JSON.parse(savedOpportunities));
    }
  }, []);

  // Save data to localStorage whenever leads or opportunities change
  useEffect(() => {
    localStorage.setItem('mini-seller-leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('mini-seller-opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: Date.now(),
      status: 'new'
    };
    setLeads([...leads, newLead]);
  };

  const updateLead = (leadId, updates) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, ...updates } : lead
    ));
  };

  const convertToOpportunity = (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      const opportunity = {
        ...lead,
        id: Date.now(),
        leadId: leadId,
        convertedDate: new Date().toISOString(),
        stage: 'prospect',
        value: 0
      };
      
      setOpportunities([...opportunities, opportunity]);
      updateLead(leadId, { status: 'converted' });
    }
  };

  const deleteLead = (leadId) => {
    setLeads(leads.filter(lead => lead.id !== leadId));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎯 Mini-Seller</h1>
        <p>Lightweight console to triage Leads and convert them into Opportunities</p>
        
        <nav className="App-nav">
          <button 
            className={currentView === 'leads' ? 'active' : ''}
            onClick={() => setCurrentView('leads')}
          >
            Leads ({leads.filter(l => l.status !== 'converted').length})
          </button>
          <button 
            className={currentView === 'opportunities' ? 'active' : ''}
            onClick={() => setCurrentView('opportunities')}
          >
            Opportunities ({opportunities.length})
          </button>
          <button 
            className={currentView === 'add-lead' ? 'active' : ''}
            onClick={() => setCurrentView('add-lead')}
          >
            Add Lead
          </button>
        </nav>
      </header>

      <main className="App-main">
        {currentView === 'leads' && (
          <LeadList 
            leads={leads.filter(lead => lead.status !== 'converted')}
            onUpdateLead={updateLead}
            onConvertToOpportunity={convertToOpportunity}
            onDeleteLead={deleteLead}
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
          />
        )}
        
        {currentView === 'opportunities' && (
          <OpportunityList opportunities={opportunities} />
        )}
        
        {currentView === 'add-lead' && (
          <LeadForm 
            onAddLead={addLead} 
            onCancel={() => setCurrentView('leads')}
          />
        )}
      </main>
    </div>
  );
}

export default App;