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

    const reader = new FileReader();
    reader.readAsDataURL(uploadedImage);

    reader.onloadend = async () => {
      try {
        // Determine language name and code from your selectedLanguage object
        const langName =
          selectedLanguage?.name ||
          selectedLanguage?.label ||
          selectedLanguage?.native ||
          'Hindi'; // fallback test

        const langCode =
          selectedLanguage?.code ||
          selectedLanguage?.id ||
          'hi';

        console.log('Sending Language Payload to API:', { langName, langCode });

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
        console.log('Received Localized Report:', liveReport);
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