import React, { useState } from 'react';

const LeadList = ({ leads, onUpdateLead, onConvertToOpportunity, onDeleteLead, selectedLead, setSelectedLead }) => {
  const [editingLead, setEditingLead] = useState(null);
  const [editForm, setEditForm] = useState({});

  const getScoreClass = (score) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  const handleEditStart = (lead) => {
    setEditingLead(lead.id);
    setEditForm({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      notes: lead.notes,
      score: lead.score,
      status: lead.status
    });
  };

  const handleEditSave = () => {
    onUpdateLead(editingLead, editForm);
    setEditingLead(null);
    setEditForm({});
  };

  const handleEditCancel = () => {
    setEditingLead(null);
    setEditForm({});
  };

  const handleConvert = (leadId) => {
    if (window.confirm('Convert this lead to an opportunity?')) {
      onConvertToOpportunity(leadId);
    }
  };

  const handleDelete = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      onDeleteLead(leadId);
    }
  };

  if (leads.length === 0) {
    return (
      <div className="lead-list">
        <h2>No leads found</h2>
        <p>Start by adding your first lead!</p>
      </div>
    );
  }

  return (
    <div className="lead-list">
      <h2>Active Leads ({leads.length})</h2>
      {leads.map(lead => (
        <div 
          key={lead.id} 
          className={`lead-card ${selectedLead === lead.id ? 'selected' : ''}`}
          onClick={() => setSelectedLead(selectedLead === lead.id ? null : lead.id)}
        >
          {editingLead === lead.id ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Company:</label>
                <input
                  type="text"
                  value={editForm.company}
                  onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Score (0-100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editForm.score}
                  onChange={(e) => setEditForm({...editForm, score: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                />
              </div>
              <div className="lead-actions">
                <button className="submit-btn" onClick={handleEditSave}>Save</button>
                <button className="cancel-btn" onClick={handleEditCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="lead-header">
                <div className="lead-info">
                  <h3>{lead.name}</h3>
                  <p>{lead.email} • {lead.company}</p>
                </div>
                <div className={`lead-score ${getScoreClass(lead.score)}`}>
                  {lead.score}
                </div>
              </div>
              
              <div className={`lead-status ${lead.status}`}>
                {lead.status}
              </div>
              
              {lead.notes && (
                <div className="lead-notes">
                  "{lead.notes}"
                </div>
              )}
              
              <div className="lead-actions" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="convert-btn" 
                  onClick={() => handleConvert(lead.id)}
                  disabled={lead.status === 'new'}
                  title={lead.status === 'new' ? 'Contact lead first before converting' : 'Convert to opportunity'}
                >
                  Convert to Opportunity
                </button>
                <button className="edit-btn" onClick={() => handleEditStart(lead)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(lead.id)}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeadList;