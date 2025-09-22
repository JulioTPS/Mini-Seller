import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Leads from "./pages/leads.tsx";
import OpportunitiesPage from "./pages/opportunities.tsx";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/leads">Leads</Link>
        <Link to="/opportunities">Opportunities</Link>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/leads" element={<Leads />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/" element={<Navigate to="/leads" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
