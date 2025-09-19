import React, { useState } from "react";
import { LeadStatus, type Lead } from "../types/lead";

export const LeadForm: React.FC<{ lead: Lead }> = ({ lead }) => {
  const [form, setForm] = useState<Lead>(lead);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log("form", form.status);

  return (
    <form>
      <div>
        <label>Name:</label>
        <input name="name" disabled value={form.name} onChange={handleChange} />
      </div>
      <div>
        <label>Company:</label>
        <input
          name="company"
          disabled
          value={form.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label>Source:</label>
        <input
          name="source"
          disabled
          value={form.source}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Score:</label>
        <input
          name="score"
          disabled
          value={form.score}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={form.status} onChange={handleChange}>
          {Object.values(LeadStatus).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
