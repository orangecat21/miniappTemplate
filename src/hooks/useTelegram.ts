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
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [stableHeight, setStableHeight] = useState<number | null>(null);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        const tg = window.Telegram?.WebApp;

        if (tg) {
          tg.ready();
          
          // Разворачиваем на весь экран
          tg.expand();
          
          // Устанавливаем начальную высоту viewport
          setViewportHeight(tg.viewportHeight);
          setStableHeight(tg.viewportStableHeight);

          // Обработчик изменения viewport (появление/скрытие клавиатуры)
          const handleViewportChanged = (event: { isStateStable: boolean }) => {
            const currentHeight = tg.viewportHeight;
            const currentStableHeight = tg.viewportStableHeight;
            
            setViewportHeight(currentHeight);
            setStableHeight(currentStableHeight);
            
            // Если viewport стабилен, снова расширяем
            if (event.isStateStable) {
              tg.expand();
            }
          };

          tg.onEvent('viewportChanged', handleViewportChanged);

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

          // Очищаем события при размонтировании
          return () => {
            tg.offEvent('viewportChanged', handleViewportChanged);
          };
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

  const disableScroll = () => {
    window.Telegram?.WebApp?.disableScrolling();
  };

  const enableScroll = () => {
    window.Telegram?.WebApp?.enableScrolling();
  };

  return {
    telegramUser,
    isInitialized,
    showAlert,
    hapticFeedback,
    getVersion,
    isTelegram,
    viewportHeight,
    stableHeight,
    disableScroll,
    enableScroll,
  };
};
