import { useState, useEffect } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  const [telegramUser, setTelegramUser] = useState<{
    firstName: string;
    lastName?: string;
    username?: string;
    photoUrl?: string;
  } | null>(null);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        const WebApp = window.Telegram?.WebApp;

        if (WebApp) {
          WebApp.ready();
          WebApp.expand();

          const user = WebApp.initDataUnsafe?.user;
          if (user) {
            setTelegramUser({
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username,
              photoUrl: user.photo_url,
            });
          }

          const colorScheme = WebApp.colorScheme;
          setIsDark(colorScheme === 'dark');

          WebApp.onEvent('themeChanged', () => {
            setIsDark(WebApp.colorScheme === 'dark');
          });
        } else {
          setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
      } catch (error) {
        console.error('Telegram WebApp init error:', error);
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };

    initTelegram();

    return () => {
      try {
        const WebApp = window.Telegram?.WebApp;
        if (WebApp?.offEvent) {
          WebApp.offEvent('themeChanged', () => {});
        }
      } catch (error) {
        console.error('Error cleaning up Telegram events:', error);
      }
    };
  }, []);

  const theme = {
    bg: isDark
      ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
      : 'bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100',
    cardBg: isDark ? 'bg-gray-800/50' : 'bg-white',
    textColor: isDark ? 'text-white' : 'text-gray-900',
    subtextColor: isDark ? 'text-gray-300' : 'text-gray-600',
    borderColor: isDark ? 'border-gray-700' : 'border-gray-200',
  };

  return { theme, isDark, telegramUser };
}
