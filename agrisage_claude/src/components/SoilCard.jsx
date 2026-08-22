import { Sprout } from "lucide-react";
import AnalysisCard from "./AnalysisCard";
import { soilData } from "../data/mockData";

export default function SoilCard({ onViewDetails }) {
  const rows = [
    { label: "Soil Type", value: soilData.soilType },
    { label: "pH Level", value: `${soilData.phLevel} (${soilData.phLabel})` },
    { label: "Organic Matter", value: soilData.organicMatter },
    {
      label: "NPK Ratio",
      value: `${soilData.npkRatio.n} : ${soilData.npkRatio.p} : ${soilData.npkRatio.k}`,
    },
  ];

  return (
    <AnalysisCard
      colorKey="soil"
      icon={Sprout}
      title="Soil Analysis"
      subtitle="Real-time data about your soil health"
      rows={rows}
      onViewDetails={onViewDetails}
    />
  );
}
