import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CropDiagnosis from './pages/CropDiagnosis';

function DashboardLayout() {
  const { chatOpen } = useApp();

  return (
    <div className="h-screen w-full flex flex-col bg-[#F8FAF9] dark:bg-[#0F1713] text-[#1A2E22] dark:text-[#E5EFEA] transition-colors overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-row overflow-hidden relative">
        <main
          className={`h-full overflow-y-auto transition-all duration-300 ${
            chatOpen ? 'w-full lg:w-[70%] lg:flex-none' : 'w-full'
          }`}
        >
          <Outlet />
        </main>
        <Chatbot />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crop-diagnosis" element={<CropDiagnosis />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}