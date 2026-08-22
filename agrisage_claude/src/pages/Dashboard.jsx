import { ArrowRight, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SoilCard from "../components/SoilCard";
import WeatherCard from "../components/WeatherCard";
import BestCropCard from "../components/BestCropCard";
import WorstCropCard from "../components/WorstCropCard";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleViewDetails = (section) => {
    // Placeholder — a detail drill-down view can be added later without
    // touching this page's data flow.
    console.log(`View details: ${section}`);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        <SoilCard onViewDetails={() => handleViewDetails("soil")} />
        <WeatherCard onViewDetails={() => handleViewDetails("weather")} />
        <BestCropCard onViewDetails={() => handleViewDetails("best-crop")} />
        <WorstCropCard onViewDetails={() => handleViewDetails("worst-crop")} />
      </div>

      <button
        type="button"
        onClick={() => navigate("/dashboard/diagnosis")}
        className="flex w-full items-center justify-center gap-2 rounded-card
          bg-agri-primary py-3.5 text-sm font-semibold text-white shadow-card
          transition-theme hover:bg-agri-primary-dark hover:shadow-panel"
      >
        <Sprout className="h-4 w-4" />
        Crop Diagnosis
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
