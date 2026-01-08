
import React, { useState } from 'react';
import { 
  Shield, Search, Globe, Code, Zap, Lock, FileText, 
  CheckCircle, ArrowRight, Cpu, AlertTriangle, Terminal 
} from 'lucide-react';
import { UI_TEXT } from '../constants';
import { Language } from '../types';
import { SecurityTicker } from './SecurityTicker';

interface LandingPageProps {
  onScan: (input: string) => void;
  lang: Language;
  isLoading: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onScan, lang, isLoading }) => {
  const [input, setInput] = useState('');
  const t = UI_TEXT[lang];
  const isRtl = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onScan(input);
    }
  };

  const featuresIcons = [Cpu, Zap, Code, Globe];
  const stepIcons = [Terminal, Search, FileText];

  const vulnTypes = [
    "Cross-Site Scripting (XSS)", "SQL Injection", "CSRF Attacks", 
    "Insecure Headers", "Broken Auth", "Sensitive Data Exposure",
    "XML External Entities (XXE)", "Known Vulnerabilities"
  ];

  return (
    <div className={`flex flex-col ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Real-time Ticker */}
      <SecurityTicker lang={lang} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-28 lg:pb-40">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-900/5 dark:bg-white/5 border border-primary-200 dark:border-white/10 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
              {t.trustedBy}
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-7xl mb-8 leading-tight">
              {t.heroTitle.split('AI')[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">AI</span>
              {t.heroTitle.split('AI')[1]}
            </h1>
            
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-16">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white dark:bg-secondary-800 rounded-xl shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10 p-2">
                  <div className="pl-4 pr-2 text-gray-400">
                    {input.startsWith('http') ? <Globe size={24} /> : <Code size={24} />}
                  </div>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    placeholder={t.placeholder}
                    className={`block w-full p-3 text-gray-900 dark:text-white placeholder-gray-500 bg-transparent border-0 focus:ring-0 text-lg ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold rounded-lg shadow-lg shadow-primary-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{t.scanButton}</span>
                        {isRtl ? <ArrowRight className="rotate-180" size={18} /> : <ArrowRight size={18} />}
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                <Lock size={12} className="inline mr-1" />
                No data is stored. Scans are private and secure.
              </p>
            </form>

            {/* Vulnerability Badges */}
            <div className="flex flex-wrap justify-center gap-3 opacity-80">
               {vulnTypes.slice(0, 4).map((v, i) => (
                 <span key={i} className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-secondary-700">
                   {v}
                 </span>
               ))}
               <span className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-secondary-700">
                 +12 More
               </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-secondary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.featuresTitle}</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.map((feature: any, idx: number) => {
              const Icon = featuresIcons[idx % featuresIcons.length];
              return (
                <div key={idx} className="bg-white dark:bg-secondary-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-secondary-700 group">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.howItWorksTitle}</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-secondary-700 to-transparent"></div>

            {t.steps.map((step: any, idx: number) => {
              const Icon = stepIcons[idx % stepIcons.length];
              return (
                <div key={idx} className="relative text-center">
                  <div className="relative z-10 w-24 h-24 mx-auto bg-white dark:bg-secondary-900 border-4 border-gray-100 dark:border-secondary-800 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <Icon size={32} className="text-primary-500" />
                    <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white dark:border-secondary-900">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vulnerabilities Marquee / Grid */}
      <section className="py-20 bg-secondary-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t.vulnTitle}</h2>
          <p className="text-secondary-400">Our AI engine is trained on thousands of security vectors</p>
        </div>
        
        <div className="relative flex overflow-x-hidden">
          <div className="py-12 animate-marquee whitespace-nowrap flex gap-8">
            {[...vulnTypes, ...vulnTypes].map((v, i) => (
              <div key={i} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary-800 border border-secondary-700 text-gray-300">
                <AlertTriangle size={16} className="text-yellow-500" />
                {v}
              </div>
            ))}
          </div>
          <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex gap-8">
            {[...vulnTypes, ...vulnTypes].map((v, i) => (
              <div key={i} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary-800 border border-secondary-700 text-gray-300">
                <AlertTriangle size={16} className="text-yellow-500" />
                {v}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
