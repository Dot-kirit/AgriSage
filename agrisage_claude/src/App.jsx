import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CropDiagnosis from "./pages/CropDiagnosis";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Header, country/language selectors, and the chatbot live in
          DashboardLayout and stay mounted across both nested pages. */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="diagnosis" element={<CropDiagnosis />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
