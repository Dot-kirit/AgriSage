// src/components/WeatherCard.jsx
import React from 'react';
import { CloudSun, Droplets, CloudRain } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WeatherCard() {
  const { weatherData, isLoadingDashboard, userLocation } = useApp();

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#16231D] border border-[#E5ECE8] dark:border-[#273E34] shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#273E34] pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E1F2E6] dark:bg-[#1D3A29] flex items-center justify-center text-[#2F7E4A] dark:text-[#67B781]">
            <CloudSun className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1A2E22] dark:text-[#E5EFEA]">Local Weather</h3>
            <span className="text-[11px] text-[#52665B] dark:text-[#8CA397]">{userLocation?.district} {userLocation?.state}</span>
          </div>
        </div>
      </div>

      {isLoadingDashboard || !weatherData ? (
        <div className="py-6 text-center text-xs text-[#8CA397] animate-pulse">Syncing weather stations...</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#F8FAF9] dark:bg-[#0F1713] rounded-xl border border-[#E5ECE8] dark:border-[#273E34]">
            <span className="text-[#52665B] dark:text-[#8CA397] flex items-center gap-1 mb-1">
              <CloudSun className="w-3.5 h-3.5 text-amber-500" /> Current Temp
            </span>
            <span className="text-base font-bold text-[#1A2E22] dark:text-[#E5EFEA]">{weatherData.temperature}°C</span>
          </div>

          <div className="p-3 bg-[#F8FAF9] dark:bg-[#0F1713] rounded-xl border border-[#E5ECE8] dark:border-[#273E34]">
            <span className="text-[#52665B] dark:text-[#8CA397] flex items-center gap-1 mb-1">
              <Droplets className="w-3.5 h-3.5 text-blue-500" /> Humidity
            </span>
            <span className="text-base font-bold text-[#1A2E22] dark:text-[#E5EFEA]">{weatherData.humidity}%</span>
          </div>

          <div className="p-3 bg-[#F8FAF9] dark:bg-[#0F1713] rounded-xl border border-[#E5ECE8] dark:border-[#273E34]">
            <span className="text-[#52665B] dark:text-[#8CA397] flex items-center gap-1 mb-1">
              <CloudRain className="w-3.5 h-3.5 text-indigo-500" /> Rain Today
            </span>
            <span className="text-base font-bold text-[#1A2E22] dark:text-[#E5EFEA]">{weatherData.precipitation} mm</span>
          </div>

          <div className="p-3 bg-[#F8FAF9] dark:bg-[#0F1713] rounded-xl border border-[#E5ECE8] dark:border-[#273E34]">
            <span className="text-[#52665B] dark:text-[#8CA397] block mb-1">Day Range</span>
            <span className="text-xs font-semibold text-[#1A2E22] dark:text-[#E5EFEA]">
              {weatherData.forecastMin}°C - {weatherData.forecastMax}°C
            </span>
          </div>
        </div>
      )}
    </div>
  );
}