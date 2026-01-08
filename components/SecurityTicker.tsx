
import React from 'react';
import { AlertTriangle, Globe } from 'lucide-react';
import { THREAT_INTEL, UI_TEXT } from '../constants';
import { Language } from '../types';

interface SecurityTickerProps {
  lang: Language;
}

export const SecurityTicker: React.FC<SecurityTickerProps> = ({ lang }) => {
  const t = UI_TEXT[lang];

  return (
    <div className="bg-secondary-900 text-white text-xs py-2 border-b border-secondary-800 overflow-hidden relative z-50">
      <div className="flex items-center">
        <div className="bg-red-600 px-3 py-1 font-bold text-xs uppercase tracking-wider flex items-center gap-2 z-10 shadow-lg shrink-0">
           <Globe size={12} className="animate-pulse" />
           {t.tickerTitle}
        </div>
        
        <div className="overflow-hidden relative w-full">
          <div className="animate-marquee whitespace-nowrap flex gap-12 pl-4">
             {THREAT_INTEL.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-300">
                   <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                     item.type === 'CVE' ? 'bg-orange-900 text-orange-200' :
                     item.type === 'ALERT' ? 'bg-red-900 text-red-200' :
                     'bg-blue-900 text-blue-200'
                   }`}>
                     {item.type}
                   </span>
                   {item.text}
                </div>
             ))}
             {/* Duplicate for smooth loop */}
             {THREAT_INTEL.map((item, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-2 text-gray-300">
                   <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                     item.type === 'CVE' ? 'bg-orange-900 text-orange-200' :
                     item.type === 'ALERT' ? 'bg-red-900 text-red-200' :
                     'bg-blue-900 text-blue-200'
                   }`}>
                     {item.type}
                   </span>
                   {item.text}
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
