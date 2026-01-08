import React, { useState } from 'react';
import { Shield, Search, Globe, Code } from 'lucide-react';
import { UI_TEXT } from '../constants';
import { Language } from '../types';

interface HeroProps {
  onScan: (input: string) => void;
  lang: Language;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onScan, lang, isLoading }) => {
  const [input, setInput] = useState('');
  const t = UI_TEXT[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onScan(input);
    }
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-500 ring-1 ring-primary-500/20">
              <Shield size={48} className="animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
            <span className="text-primary-500">ESA</span> {t.heroTitle.replace("ESA ", "")}
          </h1>
          
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300 mb-10">
            {t.heroSubtitle}
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-white dark:bg-secondary-800 rounded-lg shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
                <div className="pl-4 text-gray-400">
                  {input.startsWith('http') ? <Globe size={20} /> : <Code size={20} />}
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder={t.placeholder}
                  className={`block w-full p-4 text-gray-900 dark:text-white placeholder-gray-500 bg-transparent border-0 focus:ring-0 sm:text-lg ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                />
                <div className="pr-2 pl-2">
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-md shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Search size={20} />
                    )}
                    <span className="hidden sm:inline">{t.scanButton}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Feature Badges */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-secondary-800">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              XSS & CSRF
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-secondary-800">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              SQL Injection
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-secondary-800">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Misconfiguration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
