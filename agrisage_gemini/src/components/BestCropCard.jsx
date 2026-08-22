import React from 'react';
import { Wheat, ArrowRight } from 'lucide-react';
import { mockBestCropData } from '../data/mockData';

export default function BestCropCard() {
  return (
    <div className="p-6 rounded-2xl bg-[#FEF9E7] dark:bg-[#2A2413] border border-[#FDECB2] dark:border-[#4D3F1E] flex flex-col justify-between shadow-soft hover:shadow-md transition-all">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#FDF0C8] dark:bg-[#403417] flex items-center justify-center text-[#D97706] dark:text-[#FBBF24]">
            <Wheat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#1A2E22] dark:text-[#E5EFEA]">{mockBestCropData.title}</h3>
            <p className="text-xs text-[#52665B] dark:text-[#8CA397]">{mockBestCropData.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mt-5 text-xs">
          <div className="text-[#52665B] dark:text-[#8CA397]">Recommended Crop</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockBestCropData.recommendedCrop}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">Suitability</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockBestCropData.suitability}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">Season</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockBestCropData.season}</div>
        </div>
      </div>

      <button className="flex items-center gap-1.5 text-xs font-semibold text-[#D97706] dark:text-[#FBBF24] mt-6 group self-start hover:underline">
        <span>View Details</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}