import { useState, useEffect } from 'react';
import type { Lead, Opportunity } from '../types';
import { loadLeads } from '../utils/api';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadLeads();
        setLeads(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leads');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === leadId ? { ...lead, ...updates } : lead
      )
    );
  };

  const convertToOpportunity = (lead: Lead, opportunityData: Omit<Opportunity, 'id'>) => {
    const newOpportunity: Opportunity = {
      ...opportunityData,
      id: `opp-${Date.now()}`,
    };

    setOpportunities(prev => [...prev, newOpportunity]);
    
    // Update lead status to converted or remove it
    setLeads(prevLeads =>
      prevLeads.filter(l => l.id !== lead.id)
    );

    return newOpportunity;
  };

  return {
    leads,
    opportunities,
    loading,
    error,
    updateLead,
    convertToOpportunity,
  };
}