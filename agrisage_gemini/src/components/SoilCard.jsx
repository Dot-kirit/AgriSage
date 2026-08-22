import React from 'react';
import { Sprout, ArrowRight } from 'lucide-react';
import { mockSoilData } from '../data/mockData';

export default function SoilCard() {
  return (
    <div className="p-6 rounded-2xl bg-[#EEF8F1] dark:bg-[#14261C] border border-[#D5ECD9] dark:border-[#224733] flex flex-col justify-between shadow-soft hover:shadow-md transition-all">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#D8F0DF] dark:bg-[#1D3B2B] flex items-center justify-center text-[#2F7E4A] dark:text-[#67B781]">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#1A2E22] dark:text-[#E5EFEA]">{mockSoilData.title}</h3>
            <p className="text-xs text-[#52665B] dark:text-[#8CA397]">{mockSoilData.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mt-5 text-xs">
          <div className="text-[#52665B] dark:text-[#8CA397]">Soil Type</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockSoilData.type}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">pH Level</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockSoilData.ph}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">Organic Matter</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockSoilData.organicMatter}</div>
          <div className="text-[#52665B] dark:text-[#8CA397]">NPK Ratio</div>
          <div className="font-semibold text-right text-[#1A2E22] dark:text-[#E5EFEA]">{mockSoilData.npk}</div>
        </div>
      </div>

      <button className="flex items-center gap-1.5 text-xs font-semibold text-[#2F7E4A] dark:text-[#67B781] mt-6 group self-start hover:underline">
        <span>View Details</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}