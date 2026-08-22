import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { mockWorstCropData } from '../data/mockData';

export default function WorstCropCard() {
  return (
    <div className="p-6 rounded-2xl bg-[#FDF2F2] dark:bg-[#281518] border border-[#FAD2D2] dark:border-[#4D2327] flex flex-col justify-between shadow-soft hover:shadow-md transition-all">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#FCE0E0] dark:bg-[#401C20] flex items-center justify-center text-[#DC2626] dark:text-[#F87171]">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#1A2E22] dark:text-[#E5EFEA]">{mockWorstCropData.title}</h3>
            <p className="text-xs text-[#52665B] dark:text-[#8CA397]">{mockWorstCropData.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mt-5 text-xs">
          <div className="text-[#52665B] dark:text-[#8CA397]">Not Recommended</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockWorstCropData.notRecommended}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">Reason</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockWorstCropData.reason}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">Risk Factor</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockWorstCropData.riskFactor}</div>
        </div>
      </div>

      <button className="flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] dark:text-[#F87171] mt-6 group self-start hover:underline">
        <span>View Details</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}