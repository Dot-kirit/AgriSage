// AgriSage — placeholder frontend data.
// Every value here is mock content. Shapes are intentionally kept close
// to what a real API response would look like, so swapping in the real
// backend later is a data-source change, not a UI rewrite.

export const soilData = {
  soilType: "Clay Loam",
  phLevel: 6.8,
  phLabel: "Slightly Acidic",
  organicMatter: "2.3%",
  npkRatio: { n: 120, p: 45, k: 60 },
};

export const weatherData = {
  temperatureC: 32,
  humidityPercent: 68,
  rainfallTodayMm: 0,
  windSpeedKmh: 12,
};

export const bestCropData = {
  recommendedCrop: "Paddy",
  suitabilityLabel: "High",
  suitabilityPercent: 85,
  season: "Kharif",
};

export const worstCropData = {
  notRecommendedCrop: "Cotton",
  reason: "Low Suitability",
  riskFactor: "High",
};

// Shown in the Analysis Report panel once "View Report" is clicked.
// Will be replaced by the real disease-detection API response.
export const diagnosisReportMock = {
  diseaseDetected: "Bacterial Leaf Spot",
  crop: "Tomato",
  severity: "Moderate",
  symptoms:
    "Water soaked spots on leaves, covered with yellow halos.",
  recommendedTreatment:
    "Use copper based bactericides and maintain proper field hygiene.",
  prevention:
    "Avoid overhead irrigation and ensure good air circulation.",
  confidencePercent: 87,
};

// Seed message shown in the chatbot on first load.
export const initialChatMessage = {
  id: "seed-1",
  sender: "assistant",
  text: "Hello! I'm your AgriSage Assistant. Ask me about your soil, weather, or the best crops for your farm.",
  timestamp: new Date().toISOString(),
};
