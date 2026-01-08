
import React from 'react';
import { X, BookOpen, Bot } from 'lucide-react';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string; // Markdown content streamed from Gemini
  isLoading: boolean;
  lang: Language;
}

export const EducationModal: React.FC<EducationModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  isLoading,
  lang 
}) => {
  if (!isOpen) return null;

  const t = UI_TEXT[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-secondary-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-secondary-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-fade-in-up border border-gray-200 dark:border-secondary-700">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-secondary-700 flex items-center justify-between bg-gray-50 dark:bg-secondary-800/50">
          <div className="flex items-center gap-3">
             <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400">
               <BookOpen size={20} />
             </div>
             <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                   <Bot size={10} />
                   {t.educationTitle}
                </p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-secondary-700 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 text-gray-800 dark:text-gray-200">
           {content ? (
             <div className="prose dark:prose-invert max-w-none">
               {/* Simple Markdown Rendering */}
               {content.split('\n').map((line, i) => {
                 if (line.startsWith('## ')) {
                   return <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-primary-600 dark:text-primary-400">{line.replace('## ', '')}</h2>;
                 }
                 if (line.startsWith('- ')) {
                   return <li key={i} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
                 }
                 if (line.trim() === '') {
                   return <br key={i} />;
                 }
                 return <p key={i} className="mb-2 leading-relaxed">{line}</p>;
               })}
               {isLoading && (
                  <span className="inline-block w-2 h-4 bg-primary-500 animate-pulse ml-1 align-middle"></span>
               )}
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center py-12 text-gray-400 space-y-4">
               <Bot size={48} className="animate-bounce text-primary-500 opacity-50" />
               <p className="animate-pulse">{lang === 'ar' ? 'جاري تحضير الشرح...' : 'Gemini is preparing the lesson...'}</p>
             </div>
           )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-secondary-700 bg-gray-50 dark:bg-secondary-800/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-white dark:bg-secondary-700 border border-gray-300 dark:border-secondary-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-secondary-600 transition-colors shadow-sm"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
