import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import countries from "../data/countries";
import languages from "../data/languages";
import {
  soilData as mockSoilData,
  weatherData as mockWeatherData,
  diagnosisReportMock,
  initialChatMessage,
} from "../data/mockData";

const AppContext = createContext(undefined);

const THEME_STORAGE_KEY = "agrisage-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/* ------------------------------------------------------------------ */
/* Future API service stubs                                            */
/* Each function is written the way it will be called once the real   */
/* backend/Firebase/Gemini integration lands — same signature, same    */
/* return shape. Swap the body, keep the contract.                     */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line no-unused-vars
async function fetchSoilData(params = {} /* country, coordinates, farmId, ... */) {
  // Backend/soil-sensor API integration will be added later.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockSoilData;
}

// eslint-disable-next-line no-unused-vars
async function fetchWeatherData(params = {} /* country, coordinates, ... */) {
  // Weather API integration will be added later.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockWeatherData;
}

// eslint-disable-next-line no-unused-vars
async function predictCropDisease(params = {} /* imageFile */) {
  // Gemini / disease-detection API integration will be added later.
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return diagnosisReportMock;
}

// eslint-disable-next-line no-unused-vars
async function sendChatMessage(params = {} /* text, language, country, history */) {
  // Chatbot backend (Gemini or similar) integration will be added later.
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    id: `assistant-${Date.now()}`,
    sender: "assistant",
    text: "This is a placeholder response. Connect the chatbot API to get real answers.",
    timestamp: new Date().toISOString(),
  };
}

export function AppProvider({ children }) {
  /* ---------------------------- Theme ---------------------------- */
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  /* ------------------------- Country / language ------------------- */
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // India first
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]); // English

  const selectCountry = useCallback((country) => setSelectedCountry(country), []);
  const selectLanguage = useCallback((language) => setSelectedLanguage(language), []);

  /* ----------------------------- Chatbot --------------------------- */
  // chatOpen === maximized (~30% panel). Lives here, not inside a page,
  // so it survives navigation between Dashboard and Crop Diagnosis.
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([initialChatMessage]);
  const [isChatSending, setIsChatSending] = useState(false);

  const toggleChat = useCallback(() => setChatOpen((prev) => !prev), []);

  const addChatMessage = useCallback((message) => {
    setChatMessages((prev) => [...prev, message]);
  }, []);

  const sendUserMessage = useCallback(
    async (text) => {
      if (!text?.trim()) return;
      const userMessage = {
        id: `user-${Date.now()}`,
        sender: "user",
        text: text.trim(),
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, userMessage]);
      setIsChatSending(true);
      try {
        const reply = await sendChatMessage({
          text: userMessage.text,
          language: selectedLanguage,
          country: selectedCountry,
          history: chatMessages,
        });
        setChatMessages((prev) => [...prev, reply]);
      } finally {
        setIsChatSending(false);
      }
    },
    [chatMessages, selectedCountry, selectedLanguage]
  );

  /* ------------------------- Image upload -------------------------- */
  const [uploadedImage, setUploadedImage] = useState(null); // File object
  const [previewUrl, setPreviewUrl] = useState(null);

  // Revoke old object URL whenever it changes/unmounts to avoid leaks.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const setUploadedImageFile = useCallback(
    (file) => {
      if (!file) return;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Uploading a new image clears any previous report.
      setDiagnosisReport(null);
    },
    [previewUrl]
  );

  const clearUploadedImage = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedImage(null);
    setPreviewUrl(null);
    setDiagnosisReport(null);
  }, [previewUrl]);

  /* ------------------------ Diagnosis report ------------------------ */
  const [diagnosisReport, setDiagnosisReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const requestDiagnosis = useCallback(async () => {
    if (!uploadedImage) return;
    setIsAnalyzing(true);
    try {
      const report = await predictCropDisease({ imageFile: uploadedImage });
      setDiagnosisReport(report);
    } finally {
      setIsAnalyzing(false);
    }
  }, [uploadedImage]);

  /* ------------------------- Current section ------------------------ */
  // "dashboard" | "diagnosis" — lets the main content area swap without
  // resetting chatbot/country/language/theme state.
  const [currentSection, setCurrentSection] = useState("dashboard");

  const goToDiagnosis = useCallback(() => setCurrentSection("diagnosis"), []);
  const goToDashboard = useCallback(() => setCurrentSection("dashboard"), []);

  /* ----------------------------- Value ------------------------------ */
  const value = useMemo(
    () => ({
      // theme
      theme,
      toggleTheme,
      // country / language
      countries,
      languages,
      selectedCountry,
      selectCountry,
      selectedLanguage,
      selectLanguage,
      // chatbot
      chatOpen,
      toggleChat,
      chatMessages,
      addChatMessage,
      sendUserMessage,
      isChatSending,
      // image upload
      uploadedImage,
      previewUrl,
      setUploadedImageFile,
      clearUploadedImage,
      // diagnosis report
      diagnosisReport,
      isAnalyzing,
      requestDiagnosis,
      // navigation/section
      currentSection,
      goToDiagnosis,
      goToDashboard,
      // API service stubs (exposed for pages that want to call them directly)
      api: {
        fetchSoilData,
        fetchWeatherData,
        predictCropDisease,
        sendChatMessage,
      },
    }),
    [
      theme,
      toggleTheme,
      selectedCountry,
      selectCountry,
      selectedLanguage,
      selectLanguage,
      chatOpen,
      toggleChat,
      chatMessages,
      addChatMessage,
      sendUserMessage,
      isChatSending,
      uploadedImage,
      previewUrl,
      setUploadedImageFile,
      clearUploadedImage,
      diagnosisReport,
      isAnalyzing,
      requestDiagnosis,
      currentSection,
      goToDiagnosis,
      goToDashboard,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- context files conventionally export both the provider and its hook
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (ctx === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return ctx;
}
