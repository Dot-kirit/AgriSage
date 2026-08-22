// AgriSage — mock language options for the chatbot/report translation.
// `name` is always written in the language's own native script.
// In production these will be supplied dynamically by the backend.

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "ta", name: "தமிழ்" },
  { code: "bn", name: "বাংলা" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "zh", name: "中文" },
];

export default languages;
