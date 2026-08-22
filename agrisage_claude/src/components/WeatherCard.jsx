import { CloudSun } from "lucide-react";
import AnalysisCard from "./AnalysisCard";
import { weatherData } from "../data/mockData";

export default function WeatherCard({ onViewDetails }) {
  const rows = [
    { label: "Temperature", value: `${weatherData.temperatureC}°C` },
    { label: "Humidity", value: `${weatherData.humidityPercent}%` },
    { label: "Rainfall (Today)", value: `${weatherData.rainfallTodayMm} mm` },
    { label: "Wind Speed", value: `${weatherData.windSpeedKmh} km/h` },
  ];

  return (
    <AnalysisCard
      colorKey="weather"
      icon={CloudSun}
      title="Weather Analysis"
      subtitle="Current weather conditions and forecast"
      rows={rows}
      onViewDetails={onViewDetails}
    />
  );
}
