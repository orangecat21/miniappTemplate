import { useState, useEffect } from 'react';
import { TelegramUser } from '../types';

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

export const useTelegram = () => {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        const tg = window.Telegram?.WebApp;

        if (tg) {
          tg.ready();
          
          // Разворачиваем на весь экран с задержкой для надежности
          tg.expand();
          
          // Дополнительное расширение для мобильных устройств
          setTimeout(() => {
            if (tg) {
              tg.expand();
              // Устанавливаем высоту на весь экран
              if (tg.requestFullscreen) {
                tg.requestFullscreen();
              }
            }
          }, 100);

          // Периодическое расширение для надежности на мобильных устройствах
          const expandInterval = setInterval(() => {
            if (tg) {
              tg.expand();
            }
          }, 1000);

          const user = tg.initDataUnsafe?.user;
          if (user) {
            setTelegramUser({
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username,
              photoUrl: user.photo_url,
            });
          }

          setIsInitialized(true);

          // Очищаем интервал при размонтировании
          return () => clearInterval(expandInterval);
        } else {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Telegram WebApp init error:', error);
        setIsInitialized(true);
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

  const showAlert = (message: string) => {
    window.Telegram?.WebApp?.showAlert(message);
  };

  const hapticFeedback = (style: string = 'light') => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style);
  };

  const getVersion = () => {
    return window.Telegram?.WebApp?.version;
  };

  const isTelegram = () => {
    return !!window.Telegram?.WebApp?.initDataUnsafe?.user;
  };

  return {
    telegramUser,
    isInitialized,
    showAlert,
    hapticFeedback,
    getVersion,
    isTelegram,
  };
};