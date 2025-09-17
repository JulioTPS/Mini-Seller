import React from 'react';

const OpportunityList = ({ opportunities }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  if (opportunities.length === 0) {
    return (
      <div className="opportunity-list">
        <h2>No opportunities yet</h2>
        <p>Convert some qualified leads to see them here!</p>
      </div>
    );
  }

  return (
    <div className="opportunity-list">
      <h2>Opportunities ({opportunities.length})</h2>
      <p>Leads that have been converted to sales opportunities</p>
      
      {opportunities.map(opportunity => (
        <div key={opportunity.id} className="opportunity-card">
          <div className="opportunity-header">
            <div className="lead-info">
              <h3>{opportunity.name}</h3>
              <p>{opportunity.email} • {opportunity.company}</p>
            </div>
            <div className={`lead-score ${getScoreClass(opportunity.score)}`}>
              {opportunity.score}
            </div>
          </div>
          
          <div className="opportunity-stage">
            {opportunity.stage}
          </div>
          
          {opportunity.notes && (
            <div className="lead-notes">
              "{opportunity.notes}"
            </div>
          )}
          
          <div className="converted-date">
            Converted on: {formatDate(opportunity.convertedDate)}
          </div>
          
          <div className="opportunity-details">
            <p><strong>Original Lead ID:</strong> #{opportunity.leadId}</p>
            <p><strong>Current Stage:</strong> {opportunity.stage}</p>
            <p><strong>Estimated Value:</strong> ${opportunity.value.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpportunityList;