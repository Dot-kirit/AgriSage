import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import CountrySelector from "../components/CountrySelector";
import LanguageSelector from "../components/LanguageSelector";
import Chatbot from "../components/Chatbot";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-agri-bg transition-theme">
      <Header />

      {/* Country/language row — sits below the sticky header, shared by
          both Dashboard and Crop Diagnosis so selection never resets. */}
      <div className="sticky top-[57px] z-20 border-b border-agri-border bg-agri-bg/95 backdrop-blur px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <CountrySelector />
          <LanguageSelector />
        </div>
      </div>

      {/* Main content (~70%) + persistent Chatbot (~30%) */}
      <div className="flex flex-1">
        <main className="min-w-0 flex-1 agri-scroll overflow-y-auto">
          <Outlet />
        </main>
        <Chatbot />
      </div>
    </div>
  );
}
