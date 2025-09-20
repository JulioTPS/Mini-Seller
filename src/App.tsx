import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Leads from "./pages/leads.tsx";
import OpportunitiesPage from "./pages/opportunities.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/leads" element={<Leads />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="/" element={<Navigate to="/leads" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
