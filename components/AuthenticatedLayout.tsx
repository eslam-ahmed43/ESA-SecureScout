import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  toggleLang: () => void;
  onReset: () => void;
}

export const AuthenticatedLayout: React.FC<LayoutProps> = ({ 
  children, 
  lang, 
  toggleLang,
  onReset 
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${lang === 'ar' ? 'font-sans rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header lang={lang} toggleLang={toggleLang} onReset={onReset} />
      <main className="flex-grow relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};