import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { AuthenticatedLayout } from './components/AuthenticatedLayout';
import { LandingPage } from './components/LandingPage';
import { analyzeSecurity, streamVulnerabilityExplanation } from './services/geminiService';
import { ScanState, Language } from './types';
import { SCAN_STEPS } from './constants';
import { ShieldCheck, Loader2 } from 'lucide-react';

// Dynamic Imports
const ReportDashboard = lazy(() => import('./components/ReportDashboard').then(module => ({ default: module.ReportDashboard })));
const ScanningOverlay = lazy(() => import('./components/ScanningOverlay').then(module => ({ default: module.ScanningOverlay })));
const EducationModal = lazy(() => import('./components/EducationModal').then(module => ({ default: module.EducationModal })));

const SecureScoutApp: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [scanState, setScanState] = useState<ScanState>({
    isScanning: false,
    progress: 0,
    currentStep: 0,
    report: null,
    error: null,
  });
  
  // Education Modal State
  const [eduModal, setEduModal] = useState({
    isOpen: false,
    title: '',
    content: '',
    isLoading: false
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, []);

  const handleScan = async (input: string) => {
    setScanState({
      isScanning: true,
      progress: 0,
      currentStep: 0,
      report: null,
      error: null
    });

    abortControllerRef.current = new AbortController();
    
    let progress = 0;
    let step = 0;
    const totalSteps = SCAN_STEPS[lang].length;

    progressIntervalRef.current = window.setInterval(() => {
      setScanState(prev => {
        if (!prev.isScanning) return prev;
        
        const remaining = 95 - progress;
        const jump = Math.max(0.2, remaining / 20); 
        progress += jump;

        const stepThreshold = 100 / totalSteps;
        if (progress > (step + 1) * stepThreshold && step < totalSteps - 1) {
          step++;
        }

        return {
          ...prev,
          progress: Math.min(progress, 98),
          currentStep: step
        };
      });
    }, 200);

    try {
      const report = await analyzeSecurity(input, lang);
      
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setScanState({
        isScanning: false,
        progress: 100,
        currentStep: totalSteps - 1,
        report: report,
        error: null
      });

    } catch (err: any) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (err.message === 'cancelled') return;

      setScanState(prev => ({
        ...prev,
        isScanning: false,
        error: err.message || "An unexpected error occurred."
      }));
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setScanState(prev => ({
      ...prev,
      isScanning: false,
      progress: 0,
      currentStep: 0,
      error: null
    }));
  };

  const resetScan = () => {
    setScanState({
      isScanning: false,
      progress: 0,
      currentStep: 0,
      report: null,
      error: null
    });
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const handleExplain = async (title: string) => {
    setEduModal({ isOpen: true, title, content: '', isLoading: true });
    await new Promise(r => setTimeout(r, 500));
    try {
       const stream = streamVulnerabilityExplanation(title, lang);
       for await (const chunk of stream) {
         setEduModal(prev => ({
           ...prev,
           content: prev.content + chunk,
           isLoading: true
         }));
       }
       setEduModal(prev => ({ ...prev, isLoading: false }));
    } catch (e) {
       console.error(e);
       setEduModal(prev => ({ 
         ...prev, 
         isLoading: false,
         content: prev.content + "\n\n(Connection interrupted)"
       }));
    }
  };

  return (
    <AuthenticatedLayout lang={lang} toggleLang={toggleLang} onReset={resetScan}>
      {scanState.error && (
        <div className="max-w-3xl mx-auto mt-6 px-4 animate-fade-in-up">
           <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
             <div className="flex">
               <div className="ml-3">
                 <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error Analysis Failed</h3>
                 <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                   <p>{scanState.error}</p>
                   <button onClick={resetScan} className="mt-3 text-red-800 dark:text-red-200 underline font-medium">Try Again</button>
                 </div>
               </div>
             </div>
           </div>
        </div>
      )}

      {!scanState.report && (
        <LandingPage 
          onScan={handleScan} 
          lang={lang} 
          isLoading={scanState.isScanning}
        />
      )}

      {scanState.isScanning && (
        <Suspense fallback={null}>
          <ScanningOverlay 
            progress={scanState.progress}
            currentStepIndex={scanState.currentStep}
            steps={SCAN_STEPS[lang]}
            onCancel={handleCancel}
            lang={lang}
          />
        </Suspense>
      )}

      {scanState.report && !scanState.isScanning && (
        <div className="animate-fade-in-up pb-12">
          <div className="bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md border-b border-gray-200 dark:border-secondary-700 py-4 px-4 sticky top-16 z-30 shadow-sm transition-all print:hidden">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
               <h2 className="font-semibold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                 <ShieldCheck className="text-green-500" size={20} />
                 Analysis Report
               </h2>
               <button 
                 onClick={resetScan}
                 className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm"
               >
                 &larr; New Scan
               </button>
            </div>
          </div>
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-primary-500 mb-4" />
              <p className="text-gray-500">Loading Dashboard...</p>
            </div>
          }>
            <ReportDashboard 
              report={scanState.report} 
              lang={lang} 
              onExplainVulnerability={handleExplain}
            />
          </Suspense>
        </div>
      )}

      <Suspense fallback={null}>
        <EducationModal 
          isOpen={eduModal.isOpen}
          onClose={() => setEduModal(prev => ({ ...prev, isOpen: false }))}
          title={eduModal.title}
          content={eduModal.content}
          isLoading={eduModal.isLoading}
          lang={lang}
        />
      </Suspense>
    </AuthenticatedLayout>
  );
};

export default SecureScoutApp;