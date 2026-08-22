import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import CountrySelector from '../components/CountrySelector';
import LanguageSelector from '../components/LanguageSelector';
import SoilCard from '../components/SoilCard';
import WeatherCard from '../components/WeatherCard';
import BestCropCard from '../components/BestCropCard';
import WorstCropCard from '../components/WorstCropCard';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
      {/* Country on the far left, Language pushed to the far right */}
      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <CountrySelector />
        </div>
        <div className="flex justify-end">
          <LanguageSelector />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <SoilCard />
        <WeatherCard />
        <BestCropCard />
        <WorstCropCard />
      </div>

      <div className="pt-4 flex justify-center">
        <button
          onClick={() => navigate('/crop-diagnosis')}
          className="w-full max-w-xl py-3.5 px-6 rounded-2xl bg-[#419C5F] hover:bg-[#2F7E4A] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-4 h-4" />
          <span>Crop Diagnosis</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}