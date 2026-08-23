import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SoilCard from '../components/SoilCard';
import WeatherCard from '../components/WeatherCard';
import BestCropCard from '../components/BestCropCard';
import WorstCropCard from '../components/WorstCropCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userLocation } = useApp();

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
      {/* Location Badge Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-[#16231D] border border-[#E5ECE8] dark:border-[#273E34] rounded-xl text-xs font-medium text-[#1A2E22] dark:text-[#E5EFEA] shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#419C5F]" />
          <span>{userLocation?.district || 'Field'}{userLocation?.state ? `, ${userLocation.state}` : ''}</span>
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
          className="w-full max-w-xl py-3.5 px-6 rounded-2xl bg-[#419C5F] hover:bg-[#2F7E4A] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Crop Diagnosis</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}