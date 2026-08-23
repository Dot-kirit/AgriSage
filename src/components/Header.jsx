import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut, Sprout } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('agrisage-location');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/90 dark:bg-[#16231D]/90 backdrop-blur-md border-b border-[#E5ECE8] dark:border-[#273E34] transition-colors">
      <div 
        className="flex items-center gap-2.5 cursor-pointer select-none"
        onClick={() => navigate('/dashboard')}
      >
        <div className="w-8 h-8 rounded-full bg-[#E1F2E6] dark:bg-[#1D3A29] flex items-center justify-center text-[#2F7E4A] dark:text-[#67B781]">
          <Sprout className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-[#1A2E22] dark:text-[#E5EFEA] tracking-tight">
          AgriSage
        </span>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSelector />

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-lg text-[#52665B] dark:text-[#8CA397] hover:bg-[#F2F9F4] dark:hover:bg-[#1D2F27] border border-[#E5ECE8] dark:border-[#273E34] transition-all cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#52665B] dark:text-[#8CA397] hover:text-[#1A2E22] dark:hover:text-[#E5EFEA] bg-transparent hover:bg-[#F2F9F4] dark:hover:bg-[#1D2F27] border border-[#E5ECE8] dark:border-[#273E34] rounded-lg transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}