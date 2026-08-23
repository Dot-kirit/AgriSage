# 🌱 AgriSage — Precision Agricultural AI & Crop Advisory

AgriSage is a precision agriculture and agronomy platform providing real-time telemetry, automated crop disease diagnostics from leaf imagery, dynamic crop suitability recommendations, and an integrated multilingual AI agronomist.

---

## 🌟 Key Features

* **Hyper-Local Telemetry Dashboard**: Automatically detects GPS coordinates to stream real-time weather and soil metrics (temperature, moisture, humidity, pH, and precipitation).
* **AI Crop Suitability Modeling**: Evaluates live climate data and soil telemetry to predict the most viable crops and identify high-risk choices with specific advisory reasoning.
* **Computer Vision Disease Diagnosis**: Analyzes uploaded crop leaf photos to identify plant pathogens, symptom severity, treatments, and prevention protocols.
* **Multilingual AI Agronomist**: Context-aware assistant supporting real-time agronomic chat in major regional and global languages.
* **Firebase Authentication & Persistence**: Supports Email/Password and Google OAuth sign-in, with location and telemetry states persisted across sessions.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide React
* **Routing & State**: React Router DOM v6, React Context API (`AppContext`)
* **Authentication & Database**: Firebase Auth (Email/Password & Google Sign-In), Cloud Firestore
* **Telemetry APIs**: Open-Meteo Satellite API, OpenStreetMap Nominatim
* **AI Engine**: Google Cloud Vertex AI / Gemini API

---

## 📁 Project Structure

```text
agrisage/
├── public/
├── src/
│   ├── components/
│   │   ├── BestCropCard.jsx      # Recommended crop card & metrics
│   │   ├── Chatbot.jsx           # AI agronomist chat drawer
│   │   ├── Header.jsx            # Top navbar with language & theme controls
│   │   ├── LanguageSelector.jsx  # Global language dropdown
│   │   ├── SoilCard.jsx          # Live soil metrics
│   │   ├── WeatherCard.jsx       # Real-time weather telemetry
│   │   └── WorstCropCard.jsx     # Climate risk and crop hazard card
│   ├── context/
│   │   └── AppContext.jsx        # Global telemetry, language, and session state
│   ├── data/
│   │   └── languages.js          # Supported language configurations
│   ├── pages/
│   │   ├── CropDiagnosis.jsx     # Leaf image upload & analysis report view
│   │   ├── Dashboard.jsx         # Telemetry and crop recommendation overview
│   │   └── Login.jsx             # Authentication portal (Email & Google Auth)
│   ├── services/
│   │   ├── authService.js        # Firebase authentication methods
│   │   └── firebase.js           # Firebase client initialization
│   ├── App.jsx                   # Layout and route definitions
│   ├── index.css                 # Tailwind layers and theme variables
│   └── main.jsx                  # React application entry point
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** and **npm** installed on your system.

### 2. Installation
Clone the repository and install all project dependencies:

```bash
git clone https://github.com/Dot-kirit/AgriSage.git
cd agrisage
npm install
```

### 3. Environment Configuration
Create a `.env` file in the project root by copying the template:

```bash
cp .env.example .env
```

Populate `.env` with your API keys, Firebase credentials, and Google Cloud service account keys:

```env
# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Client-Side Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Google Cloud Service Account (Backend)
GCP_CLIENT_EMAIL=your_service_account_email
GCP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# Google Cloud Vertex AI
VERTEX_PROJECT_ID=your_gcp_project_id
VERTEX_LOCATION=us-central1
VERTEX_ENDPOINT_ID=your_vertex_endpoint_id
```

### 4. Running the Application

**Start Development Server:**
```bash
npm run dev
```

**Build for Production:**
```bash
npm run build
```

---

## 🌐 Supported Languages

Configured dynamically in `src/data/languages.js`:

| Region | Languages |
| :--- | :--- |
| **India** | Hindi (`हिन्दी`), Tamil (`தமிழ்`), Telugu (`తెలుగు`), Bengali (`বাংলা`), Marathi (`मराठी`), Punjabi (`ਪੰਜਾਬੀ`), English |
| **BRICS & Global** | Portuguese (`Português`), Russian (`Русский`), Chinese (`中文`) |
| **MENA & Africa** | Arabic (`العربية`), Persian (`فارسی`), Amharic (`አማርኛ`), Afrikaans, Zulu (`isiZulu`), Xhosa (`isiXhosa`) |
