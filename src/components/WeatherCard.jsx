import React from 'react';
import { CloudSun, ArrowRight } from 'lucide-react';
import { mockWeatherData } from '../data/mockData';

export default function WeatherCard() {
  return (
    <div className="p-6 rounded-2xl bg-[#EBF5FB] dark:bg-[#122430] border border-[#D0E6F7] dark:border-[#1E3B4F] flex flex-col justify-between shadow-soft hover:shadow-md transition-all">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#D3EAFD] dark:bg-[#193547] flex items-center justify-center text-[#2563EB] dark:text-[#60A5FA]">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#1A2E22] dark:text-[#E5EFEA]">{mockWeatherData.title}</h3>
            <p className="text-xs text-[#52665B] dark:text-[#8CA397]">{mockWeatherData.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mt-5 text-xs">
          <div className="text-[#52665B] dark:text-[#8CA397]">Temperature</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockWeatherData.temperature}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">Humidity</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockWeatherData.humidity}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">Rainfall (Today)</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockWeatherData.rainfall}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">Wind Speed</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockWeatherData.windSpeed}</div>
        </div>
      </div>

      <button className="flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] mt-6 group self-start hover:underline">
        <span>View Details</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}