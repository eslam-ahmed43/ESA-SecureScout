import React from 'react';
import { ShieldCheck, Languages } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  toggleLang: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, toggleLang, onReset }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md border-b border-gray-200 dark:border-secondary-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={onReset}>
            <div className="bg-primary-600 text-white p-1.5 rounded-lg shadow-lg shadow-primary-500/20 group-hover:bg-primary-500 transition-colors">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              <span className="text-primary-500 font-extrabold">ESA</span> SecureScout
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLang}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-1 font-medium text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-800"
            >
              <Languages size={18} />
              <span className="hidden sm:inline">{lang.toUpperCase()}</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};