import React, { useState } from "react";
import { OpportunityStage, type Opportunity } from "../types/opportunity";

export const OpportunityForm: React.FC<{
  opportunity: Opportunity;
  onSaveClick: (form: Opportunity) => void;
}> = ({ opportunity, onSaveClick }) => {
  const [form, setForm] = useState<Opportunity>(opportunity);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    return [e.target.name];
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
          <label>Name:</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stage:</label>
          <select name="stage" value={form.stage} onChange={handleChange}>
            {Object.values(OpportunityStage).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Account Name:</label>
          <input
            required
            name="accountName"
            disabled
            value={form.accountName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Lead ID:</label>
          {form.leadId}
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};
