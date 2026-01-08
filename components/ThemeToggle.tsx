import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-gray-200 dark:bg-secondary-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-secondary-700 transition-all"
      aria-label="Toggle Theme"
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};