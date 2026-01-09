import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useTelegram, useTheme } from './hooks';
import { getThemeColors } from './utils/helpers';
import { Navigation } from './components';
import { ShopPage, ProfilePage, StatisticsPage } from './pages';

export default function App() {
  const location = useLocation();
  const { telegramUser, showAlert, hapticFeedback, getVersion, isTelegram, viewportHeight, stableHeight } = useTelegram();
  const { isDark, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = getThemeColors(isDark);

  // Используем stableHeight для контейнера - это высота без клавиатуры
  const containerHeight = stableHeight || viewportHeight || '100vh';

  // Применяем высоту viewport из Telegram для предотвращения смещения при клавиатуре
  useEffect(() => {
    if (viewportHeight) {
      document.documentElement.style.setProperty('--tg-viewport-height', `${viewportHeight}px`);
    }
    if (stableHeight) {
      document.documentElement.style.setProperty('--tg-stable-height', `${stableHeight}px`);
    }
  }, [viewportHeight, stableHeight]);

  // Проверяем, что приложение открыто в Telegram, а не в браузере
  if (!isTelegram()) {
    console.warn('Приложение открыто в браузере, а не в Telegram');
  }

  // Определяем текущий индекс на основе URL
  const getSelectedIndex = () => {
    const path = location.pathname;
    if (path === '/profile') return 0;
    if (path === '/statistics') return 1;
    if (path === '/shop') return 2;
    return 0; // По умолчанию открываем profile
  };

  const selectedIndex = getSelectedIndex();

  const handleShopItemSelect = (itemName: string) => {
    showAlert(`${itemName} selected!`);
  };

  return (
    <div 
      className={`${theme.bg} transition-all duration-700 flex flex-col p-4`}
      style={{ 
        height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight,
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      <div className="flex-1 flex items-center justify-center" style={{ overflow: 'auto' }}>
        <div className="w-full max-w-md">
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  theme={theme}
                  telegramUser={telegramUser}
                  telegramVersion={getVersion()}
                  isDark={isDark}
                  toggleTheme={toggleTheme}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              }
            />
            <Route
              path="/statistics"
              element={<StatisticsPage theme={theme} />}
            />
            <Route
              path="/shop"
              element={<ShopPage theme={theme} onItemSelect={handleShopItemSelect} />}
            />
          </Routes>
        </div>
      </div>

      <Navigation
        selectedIndex={selectedIndex}
        isDark={isDark}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}
