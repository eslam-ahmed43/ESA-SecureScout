import React from 'react';
import { ShieldCheck, Heart, Code } from 'lucide-react';
import { UI_TEXT } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-secondary-900 border-t border-gray-200 dark:border-secondary-800 pt-10 pb-6 print:hidden mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-2">
             <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-primary-500" />
                <span className="font-bold text-gray-900 dark:text-white text-lg">
                  <span className="text-primary-500 font-extrabold">ESA</span> SecureScout
                </span>
             </div>
             <p className="text-sm text-gray-500 dark:text-gray-400">
               AI-Powered Website Security Scanner
             </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-sm">
             <div className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-secondary-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-secondary-700">
               <Code size={14} className="text-primary-500" />
               <span>Developed by Eslam Elokpy</span>
             </div>
             <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
               🏆 Built for Google DeepMind Hackathon 2025
             </div>
             <div className="text-gray-500 dark:text-gray-400 text-xs">
               🤖 Powered by Gemini 3 Pro
             </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-secondary-800 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Eslam Elokpy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
