import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { languages } from '../data/languages';

export default function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage } = useApp();

  return (
    <div className="relative inline-block">
      <select
        value={selectedLanguage.code}
        onChange={(e) => {
          const found = languages.find((lang) => lang.code === e.target.value);
          if (found) setSelectedLanguage(found);
        }}
        className="appearance-none bg-white dark:bg-[#16231D] text-[#1A2E22] dark:text-[#E5EFEA] text-xs font-medium border border-[#E5ECE8] dark:border-[#273E34] rounded-lg pl-8 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#419C5F] cursor-pointer shadow-sm transition-all"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-white dark:bg-[#16231D] text-[#1A2E22] dark:text-[#E5EFEA]">
            {lang.native} ({lang.name})
          </option>
        ))}
      </select>
      <Globe className="w-3.5 h-3.5 text-[#52665B] dark:text-[#8CA397] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <ChevronDown className="w-3.5 h-3.5 text-[#52665B] dark:text-[#8CA397] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}