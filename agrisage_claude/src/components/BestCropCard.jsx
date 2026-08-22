import { Sprout } from "lucide-react";
import AnalysisCard from "./AnalysisCard";
import { bestCropData } from "../data/mockData";

export default function BestCropCard({ onViewDetails }) {
  const rows = [
    { label: "Recommended Crop", value: bestCropData.recommendedCrop },
    {
      label: "Suitability",
      value: `${bestCropData.suitabilityLabel} (${bestCropData.suitabilityPercent}%)`,
    },
    { label: "Season", value: bestCropData.season },
  ];

  return (
    <AnalysisCard
      colorKey="best"
      icon={Sprout}
      title="Best Crop"
      subtitle="Crops that suit your soil and climate"
      rows={rows}
      onViewDetails={onViewDetails}
    />
  );
}
