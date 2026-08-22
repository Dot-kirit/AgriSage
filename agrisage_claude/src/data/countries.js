// AgriSage — supported countries for chatbot language/context.
// IMPORTANT: order is fixed, India must always appear first.
// This selection only informs chatbot context/language — it must
// NOT be used to drive soil, weather, or crop diagnosis data.

const countries = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
];

export default countries;
