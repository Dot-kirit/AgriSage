import React from 'react';
import { useApp } from '../context/AppContext';
import { countries } from '../data/countries';

export default function CountrySelector() {
  const { selectedCountry, setSelectedCountry } = useApp();

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {countries.map((country) => {
        const isSelected = selectedCountry.id === country.id;
        return (
          <button
            key={country.id}
            onClick={() => setSelectedCountry(country)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-[#E1F2E6] text-[#27643D] border-[#67B781] font-semibold dark:bg-[#1D3A29] dark:text-[#67B781] dark:border-[#419C5F]'
                : 'bg-white dark:bg-[#16231D] text-[#52665B] dark:text-[#8CA397] border-[#E5ECE8] dark:border-[#273E34] hover:bg-[#F2F9F4] dark:hover:bg-[#1D2F27]'
            }`}
          >
            <span className="text-sm">{country.flag}</span>
            <span>{country.name}</span>
          </button>
        );
      })}
    </div>
  );
}