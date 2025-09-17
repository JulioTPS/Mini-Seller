import React, { useState } from 'react';

const LeadForm = ({ onAddLead, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    notes: '',
    score: 50
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (formData.score < 0 || formData.score > 100) {
      newErrors.score = 'Score must be between 0 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddLead({
        ...formData,
        score: parseInt(formData.score)
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        notes: '',
        score: 50
      });
      
      // Navigate back to leads list
      onCancel();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  return (
    <div className="lead-form">
      <h2>Add New Lead</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter lead's full name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email address"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="company">Company *</label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="Enter company name"
            className={errors.company ? 'error' : ''}
          />
          {errors.company && <span className="error-message">{errors.company}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="score">Lead Score (0-100)</label>
          <input
            type="number"
            id="score"
            min="0"
            max="100"
            value={formData.score}
            onChange={(e) => handleInputChange('score', e.target.value)}
            className={errors.score ? 'error' : ''}
          />
          <small>Rate the lead's potential (higher = better prospect)</small>
          {errors.score && <span className="error-message">{errors.score}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Add any relevant notes about this lead..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Add Lead
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;