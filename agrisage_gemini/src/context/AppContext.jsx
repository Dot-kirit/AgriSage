import React, { createContext, useContext, useState, useEffect } from 'react';
import { countries } from '../data/countries';
import { languages } from '../data/languages';
import {
  mockSoilData,
  mockWeatherData,
  mockBestCropData,
  mockWorstCropData,
  mockDiagnosisReport,
  initialChatMessages,
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('agrisage-theme') || 'light');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [diagnosisReport, setDiagnosisReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('agrisage-theme', theme);
  }, [theme]);

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

  const fetchSoilData = async () => mockSoilData;
  const fetchWeatherData = async () => mockWeatherData;
  const fetchCropRecommendations = async () => ({ best: mockBestCropData, worst: mockWorstCropData });

  const predictCropDisease = async () => {
    if (!uploadedImage) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setDiagnosisReport(mockDiagnosisReport);
      setIsAnalyzing(false);
    }, 800);
  };

  const sendChatMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: `Understood for ${selectedCountry.name} (${selectedLanguage.native}): "${text}". Based on your soil metrics, scheduled drip irrigation is recommended.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, assistantMessage]);
    }, 600);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        selectedCountry,
        setSelectedCountry,
        selectedLanguage,
        setSelectedLanguage,
        chatOpen,
        setChatOpen,
        chatMessages,
        sendChatMessage,
        uploadedImage,
        previewUrl,
        diagnosisReport,
        isAnalyzing,
        handleImageUpload,
        handleClearImage,
        predictCropDisease,
        fetchSoilData,
        fetchWeatherData,
        fetchCropRecommendations,
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