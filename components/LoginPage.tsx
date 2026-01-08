import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { signInWithGoogle } from '../services/authService';
import { APP_NAME, UI_TEXT } from '../constants';
import { Language } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { Footer } from './Footer';

interface LoginPageProps {
  lang: Language;
  toggleLang: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ lang, toggleLang }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const t = UI_TEXT[lang];

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError("Failed to sign in. Please make sure Firebase configuration is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-secondary-900 flex flex-col ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
       {/* Simple Header */}
       <header className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                <ShieldCheck size={24} />
             </div>
             <span className="text-xl font-bold text-gray-900 dark:text-white">
               <span className="text-primary-500 font-extrabold">ESA</span> SecureScout
             </span>
          </div>
          <div className="flex gap-2">
             <button onClick={toggleLang} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium text-sm">
                {lang.toUpperCase()}
             </button>
             <ThemeToggle />
          </div>
       </header>

       <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-secondary-800 rounded-2xl shadow-xl border border-gray-200 dark:border-secondary-700 overflow-hidden">
             
             <div className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600 dark:text-primary-400">
                   <ShieldCheck size={32} />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t.loginTitle || "Sign in to ESA SecureScout"}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  {t.loginSubtitle || "Authenticate with Google to access the scanner."}
                </p>

                {error && (
                  <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white dark:bg-secondary-700 border border-gray-300 dark:border-secondary-600 hover:bg-gray-50 dark:hover:bg-secondary-600 text-gray-700 dark:text-white font-medium py-3 px-4 rounded-xl transition-all shadow-sm group"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-primary-500 rounded-full animate-spin" />
                  ) : (
                    <>
                       <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                       {t.signInGoogle || "Sign in with Google"}
                    </>
                  )}
                </button>
             </div>

             <div className="bg-gray-50 dark:bg-secondary-900/50 p-6 border-t border-gray-200 dark:border-secondary-700">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">
                   {lang === 'ar' ? 'مميزات المنصة' : 'Platform Features'}
                </h3>
                <ul className="space-y-3">
                   <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      {lang === 'ar' ? 'مدعوم بـ Gemini 3 Pro' : 'Powered by Gemini 3 Pro'}
                   </li>
                   <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      {lang === 'ar' ? 'تحليل أمني شامل' : 'Comprehensive Security Analysis'}
                   </li>
                   <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      {lang === 'ar' ? 'إصلاحات برمجية فورية' : 'Instant Code Fixes'}
                   </li>
                </ul>
             </div>
          </div>
          
          <div className="mt-8 text-center">
             <p className="text-sm text-gray-500">
               {lang === 'ar' ? 'تم التطوير بواسطة إسلام العلقبي' : 'Developed by Eslam Elokpy'}
             </p>
          </div>
       </main>
       
       <Footer />
    </div>
  );
};
