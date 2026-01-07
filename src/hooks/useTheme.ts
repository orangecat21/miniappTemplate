import { useState, useEffect } from 'react';
import { ThemeMode } from '../types';

export const useTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const initTheme = () => {
      try {
        const WebApp = window.Telegram?.WebApp;

        if (WebApp) {
          const colorScheme = WebApp.colorScheme;
          setIsDark(colorScheme === 'dark');

          WebApp.onEvent('themeChanged', () => {
            setIsDark(WebApp.colorScheme === 'dark');
          });
        } else {
          setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
      } catch (error) {
        console.error('Theme initialization error:', error);
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };

    initTheme();

    return () => {
      try {
        const WebApp = window.Telegram?.WebApp;
        if (WebApp?.offEvent) {
          WebApp.offEvent('themeChanged', () => {});
        }
      } catch (error) {
        console.error('Error cleaning up theme events:', error);
      }
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const themeMode: ThemeMode = isDark ? 'dark' : 'light';

  return {
    isDark,
    themeMode,
    toggleTheme,
  };
};