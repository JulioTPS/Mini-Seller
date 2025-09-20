import React, { useState } from "react";
import { LeadStatus, type Lead } from "../types/lead";

export const LeadForm: React.FC<{
  lead: Lead;
  onSaveClick: (form: Lead) => void;
}> = ({ lead, onSaveClick }) => {
  const [form, setForm] = useState<Lead>(lead);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    [e.target.name];
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSaveClick(form);
        }}
      >
        <div>
          <label>Name: </label>
          <input
            name="name"
            disabled
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Company: </label>
          <input
            name="company"
            disabled
            required
            value={form.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Source: </label>
          <input
            name="source"
            disabled
            required
            value={form.source}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Score: </label>
          <input
            name="score"
            disabled
            required
            value={form.score}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status: </label>
          <select
            required
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {Object.values(LeadStatus).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};
