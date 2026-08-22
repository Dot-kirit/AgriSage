import { TriangleAlert } from "lucide-react";
import AnalysisCard from "./AnalysisCard";
import { worstCropData } from "../data/mockData";

export default function WorstCropCard({ onViewDetails }) {
  const rows = [
    { label: "Not Recommended", value: worstCropData.notRecommendedCrop },
    { label: "Reason", value: worstCropData.reason },
    { label: "Risk Factor", value: worstCropData.riskFactor },
  ];

  return (
    <AnalysisCard
      colorKey="worst"
      icon={TriangleAlert}
      title="Worst Crop"
      subtitle="Crops that may not perform well in your conditions"
      rows={rows}
      onViewDetails={onViewDetails}
    />
  );
}
