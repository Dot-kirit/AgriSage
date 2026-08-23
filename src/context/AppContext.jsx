import React, { createContext, useContext, useState, useEffect } from 'react';
import { languages } from '../data/languages';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('agrisage-theme') || 'light');
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [diagnosisReport, setDiagnosisReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'model',
      text: 'Hello! I am your AI Agronomist. How can I assist you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Read persisted location from localStorage, fallback to default if empty
  const [userLocation, setUserLocation] = useState(() => {
    const saved = localStorage.getItem('agrisage-location');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse cached location:', e);
      }
    }
    return {
      district: 'Ludhiana',
      state: 'Punjab',
      lat: 30.901,
      lon: 75.8573,
    };
  });

  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [cropRecommendations, setCropRecommendations] = useState(null);

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('agrisage-theme', theme);
  }, [theme]);

  // Persist userLocation whenever it updates
  useEffect(() => {
    if (userLocation) {
      localStorage.setItem('agrisage-location', JSON.stringify(userLocation));
    }
  }, [userLocation]);

  // Fetch telemetry on location or language change
  useEffect(() => {
    if (!userLocation?.lat || !userLocation?.lon) return;

    const fetchAgriMetrics = async () => {
      setIsLoadingDashboard(true);
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${userLocation.lat}&longitude=${userLocation.lon}&current=temperature_2m,relative_humidity_2m,precipitation,soil_temperature_0_to_7cm,soil_moisture_0_to_7cm&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
        );
        const data = await res.json();

        const liveWeather = {
          temperature: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          precipitation: data.current.precipitation,
          forecastMax: Math.round(data.daily.temperature_2m_max[0]),
          forecastMin: Math.round(data.daily.temperature_2m_min[0]),
        };

        const liveSoil = {
          moisture: Math.round(data.current.soil_moisture_0_to_7cm * 100),
          temperature: Math.round(data.current.soil_temperature_0_to_7cm),
          ph: 6.8,
        };

        setWeatherData(liveWeather);
        setSoilData(liveSoil);

        const recRes = await fetch('/api/crop-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            district: userLocation.district,
            state: userLocation.state,
            temperature: liveWeather.temperature,
            humidity: liveWeather.humidity,
            moisture: liveSoil.moisture,
            soilPh: liveSoil.ph,
            targetLanguageName: selectedLanguage?.name || 'English',
            targetLangCode: selectedLanguage?.code || 'en',
          }),
        });

        if (recRes.ok) {
          const recData = await recRes.json();
          setCropRecommendations(recData);
        } else {
          throw new Error('Endpoint returned non-200');
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);

        setCropRecommendations({
          bestCrop: {
            name: 'Wheat (HD-2967)',
            expectedYield: '22-25 Quintals/Acre',
            confidence: 94,
            reason: 'Optimal soil pH (6.8) and moderate ambient temperatures provide ideal conditions for root tillering and grain development.',
            sowingWindow: 'Nov 01 - Nov 25',
          },
          worstCrop: {
            name: 'Cotton',
            riskLevel: 'High Risk',
            confidence: 89,
            reason: 'Low seasonal soil moisture (9%) and current temperature thresholds increase boll shedding and root stress.',
            primaryThreat: 'Low Moisture & Boll Shedding',
          },
        });
      } finally {
        setIsLoadingDashboard(false);
      }
    };

    fetchAgriMetrics();
  }, [userLocation, selectedLanguage]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleImageUpload = (file) => {
    if (file) {
      setUploadedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setDiagnosisReport(null);
    }
  };

  const handleClearImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedImage(null);
    setPreviewUrl(null);
    setDiagnosisReport(null);
  };

  const predictCropDisease = async () => {
    if (!uploadedImage) return;
    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.readAsDataURL(uploadedImage);

    reader.onloadend = async () => {
      try {
        const langName =
          selectedLanguage?.name ||
          selectedLanguage?.label ||
          selectedLanguage?.native ||
          'Hindi';

        const langCode =
          selectedLanguage?.code ||
          selectedLanguage?.id ||
          'hi';

        const response = await fetch('/api/crop-diagnosis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: reader.result,
            targetLanguageName: langName,
            targetLangCode: langCode,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Prediction failed');
        }

        const liveReport = await response.json();
        setDiagnosisReport(liveReport);
      } catch (err) {
        console.error('Diagnosis Error:', err);
        alert(`Diagnosis Error: ${err.message}`);
      } finally {
        setIsAnalyzing(false);
      }
    };
  };

  const sendChatMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setIsChatLoading(true);

    try {
      const langName =
        selectedLanguage?.name ||
        selectedLanguage?.native ||
        selectedLanguage?.label ||
        'English';

      const langCode =
        selectedLanguage?.code ||
        selectedLanguage?.id ||
        'en';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          targetLanguageName: langName,
          targetLangCode: langCode,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();

      const botMsg = {
        id: Date.now() + 1,
        sender: 'model',
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'model',
          text: 'Sorry, I ran into an issue connecting to the advisory server. Please try again.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        selectedLanguage,
        setSelectedLanguage,
        chatOpen,
        setChatOpen,
        isChatLoading,
        chatMessages,
        sendChatMessage,
        uploadedImage,
        previewUrl,
        diagnosisReport,
        isAnalyzing,
        handleImageUpload,
        handleClearImage,
        predictCropDisease,
        userLocation,
        setUserLocation,
        weatherData,
        soilData,
        isLoadingDashboard,
        cropRecommendations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};