import React from 'react';
import { AlertTriangle, ShieldAlert, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WorstCropCard() {
  const { cropRecommendations, isLoadingDashboard, userLocation } = useApp();
  const worstCrop = cropRecommendations?.worstCrop;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#16231D] border border-[#E5ECE8] dark:border-[#273E34] shadow-sm flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#273E34] pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1A2E22] dark:text-[#E5EFEA]">
              High Risk / Unfavorable Crop
            </h3>
            <span className="text-[11px] text-[#52665B] dark:text-[#8CA397]">
              Current Climate Risk for {userLocation?.district || 'Your Region'}
            </span>
          </div>
        </div>
        {worstCrop?.riskLevel && (
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {worstCrop.riskLevel}
          </span>
        )}
      </div>

      {/* Content Body */}
      {isLoadingDashboard || !worstCrop ? (
        <div className="space-y-3 py-2 animate-pulse">
          <div className="h-5 bg-gray-200 dark:bg-[#273E34] rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-[#273E34] rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-[#273E34] rounded w-2/3"></div>
        </div>
      ) : (
        <div className="space-y-3.5">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-rose-600 dark:text-rose-400">
              {worstCrop.name}
            </span>
            <span className="text-xs font-medium text-[#52665B] dark:text-[#8CA397]">
              Threat: <strong className="text-rose-600 dark:text-rose-400">{worstCrop.primaryThreat}</strong>
            </span>
          </div>

          <p className="text-xs text-[#52665B] dark:text-[#8CA397] leading-relaxed">
            {worstCrop.reason}
          </p>

          <div className="pt-2 border-t border-[#E5ECE8] dark:border-[#273E34] flex items-center justify-between text-xs">
            <span className="text-[#52665B] dark:text-[#8CA397] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" /> Advisory Action
            </span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              Avoid Sowing / Delay Cycle
            </span>
          </div>
        </div>
      )}
    </div>
  );
}