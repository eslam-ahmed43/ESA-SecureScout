import React, { useEffect, useState, useRef } from 'react';
import { ScanStepData, Language } from '../types';
import { UI_TEXT, TERMINAL_LOGS } from '../constants';
import { Shield, Server, Search, BrainCircuit, FileCheck, XCircle, Terminal } from 'lucide-react';

interface ScanningOverlayProps {
  progress: number;
  currentStepIndex: number;
  steps: ScanStepData[];
  onCancel: () => void;
  lang: Language;
}

export const ScanningOverlay: React.FC<ScanningOverlayProps> = ({ 
  progress, 
  currentStepIndex, 
  steps, 
  onCancel,
  lang
}) => {
  const t = UI_TEXT[lang];
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  // Icons corresponding to the 5 steps defined in constants
  const icons = [Shield, Server, Search, BrainCircuit, FileCheck];
  const CurrentIcon = icons[Math.min(currentStepIndex, icons.length - 1)];

  // Effect to simulate streaming logs
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = TERMINAL_LOGS[Math.floor(Math.random() * TERMINAL_LOGS.length)];
      
      // Manually formatting timestamp to avoid TS error with fractionalSecondDigits
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
      const ms = now.getMilliseconds().toString().padStart(3, '0');
      const timestamp = `${timeStr}.${ms}`;

      setLogs(prev => [...prev.slice(-6), `[${timestamp}] ${randomLog}`]); // Keep last 7 logs
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 z-50 bg-secondary-900/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-xl">
        
        {/* Main Icon Animation */}
        <div className="relative flex justify-center mb-10">
          <div className="absolute inset-0 bg-primary-500/20 blur-[60px] rounded-full animate-pulse"></div>
          <div className="relative z-10 p-6 bg-secondary-800 rounded-2xl border border-secondary-700 shadow-2xl">
            <CurrentIcon size={64} className="text-primary-500 animate-pulse" />
          </div>
          
          {/* Orbiting particles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary-500/30 rounded-full animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary-400 rounded-full shadow-[0_0_10px_#38bdf8]"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-purple-500/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc]"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
            <span>{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
          <div className="h-2 w-full bg-secondary-800 rounded-full overflow-hidden border border-secondary-700">
            <div 
              className="h-full bg-gradient-to-r from-primary-600 via-cyan-500 to-purple-600 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Terminal Window (New Feature) */}
        <div className="mb-8 bg-black/50 rounded-lg border border-gray-800 font-mono text-xs p-4 h-48 shadow-inner relative overflow-hidden">
           <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800/50 border-b border-gray-700 flex items-center px-2 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <div className="ml-2 text-gray-400 flex items-center gap-1">
                 <Terminal size={10} />
                 <span>scout_engine --live</span>
              </div>
           </div>
           <div className="mt-4 space-y-1.5 h-full overflow-y-auto pb-4 text-green-400" ref={logContainerRef}>
              {logs.map((log, i) => (
                <div key={i} className="animate-fade-in">
                   <span className="opacity-50 mr-2">&gt;</span>
                   {log}
                </div>
              ))}
              <div className="animate-pulse">_</div>
           </div>
        </div>

        {/* Steps Info */}
        <div className="text-center space-y-2 mb-8 h-12">
          <h3 className="text-xl font-bold text-white transition-all duration-300">
            {steps[Math.min(currentStepIndex, steps.length - 1)].label}
          </h3>
          <p className="text-gray-400 text-sm transition-all duration-300">
            {steps[Math.min(currentStepIndex, steps.length - 1)].subLabel}
          </p>
        </div>

        {/* Cancel Button */}
        <button 
          onClick={onCancel}
          className="mx-auto flex items-center gap-2 px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-secondary-800 transition-colors"
        >
          <XCircle size={18} />
          {t.cancelScan}
        </button>
      </div>
    </div>
  );
};