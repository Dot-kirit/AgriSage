export const mockSoilData = {
  title: 'Soil Analysis',
  subtitle: 'Real-time data about your soil health',
  type: 'Clay Loam',
  ph: '6.8 (Slightly Acidic)',
  organicMatter: '2.3%',
  npk: '120 : 45 : 60',
};

export const mockWeatherData = {
  title: 'Weather Analysis',
  subtitle: 'Current weather conditions and forecast',
  temperature: '32°C',
  humidity: '68%',
  rainfall: '0 mm',
  windSpeed: '12 km/h',
};

export const mockBestCropData = {
  title: 'Best Crop',
  subtitle: 'Crops that suit your soil and climate',
  recommendedCrop: 'Paddy',
  suitability: 'High (85%)',
  season: 'Kharif',
};

export const mockWorstCropData = {
  title: 'Worst Crop',
  subtitle: 'Crops that may not perform well in your conditions',
  notRecommended: 'Cotton',
  reason: 'Low Suitability',
  riskFactor: 'High',
};

export const mockDiagnosisReport = {
  diseaseDetected: 'Bacterial Leaf Spot',
  crop: 'Tomato',
  severity: 'Moderate',
  confidence: '87%',
  symptoms: 'Water soaked spots on leaves, covered with yellow halos.',
  recommendedTreatment: 'Use copper based bactericides and maintain proper field hygiene.',
  prevention: 'Avoid overhead irrigation and ensure good air circulation.',
};

export const initialChatMessages = [
  {
    id: 1,
    sender: 'assistant',
    text: 'Hello! I am your AgriSage Assistant. How can I assist your farming decisions today?',
    time: '10:00 AM'
  }
];