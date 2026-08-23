import React from 'react';
import { TrendingUp, Sparkles, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BestCropCard() {
  const { cropRecommendations, isLoadingDashboard, userLocation } = useApp();
  const bestCrop = cropRecommendations?.bestCrop;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#16231D] border border-[#E5ECE8] dark:border-[#273E34] shadow-sm flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#273E34] pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E1F2E6] dark:bg-[#1D3A29] flex items-center justify-center text-[#2F7E4A] dark:text-[#67B781]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1A2E22] dark:text-[#E5EFEA]">
              Recommended Best Crop
            </h3>
            <span className="text-[11px] text-[#52665B] dark:text-[#8CA397]">
              Optimal for {userLocation?.district || 'Your Region'}
            </span>
          </div>
        </div>
        {bestCrop?.confidence && (
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {bestCrop.confidence}% Match
          </span>
        )}
      </div>

      {/* Content Body */}
      {isLoadingDashboard || !bestCrop ? (
        <div className="space-y-3 py-2 animate-pulse">
          <div className="h-5 bg-gray-200 dark:bg-[#273E34] rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-[#273E34] rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-[#273E34] rounded w-2/3"></div>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-[#2F7E4A] dark:text-[#67B781]">
              {bestCrop.name}
            </span>
            <span className="text-xs font-medium text-[#52665B] dark:text-[#8CA397]">
              Exp. Yield: <strong className="text-[#1A2E22] dark:text-[#E5EFEA]">{bestCrop.expectedYield}</strong>
            </span>
          </div>

          <p className="text-xs text-[#52665B] dark:text-[#8CA397] leading-relaxed">
            {bestCrop.reason}
          </p>

          <div className="pt-2 border-t border-[#E5ECE8] dark:border-[#273E34] flex items-center justify-between text-xs">
            <span className="text-[#52665B] dark:text-[#8CA397] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Sowing Window
            </span>
            <span className="font-semibold text-[#1A2E22] dark:text-[#E5EFEA]">
              {bestCrop.sowingWindow}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}