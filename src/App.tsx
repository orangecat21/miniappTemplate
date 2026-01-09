import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useTelegram, useTheme } from './hooks';
import { getThemeColors } from './utils/helpers';
import { Navigation } from './components';
import { ShopPage, ProfilePage, StatisticsPage } from './pages';

export default function App() {
  const location = useLocation();
  const { telegramUser, showAlert, hapticFeedback, getVersion } = useTelegram();
  const { isDark, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = getThemeColors(isDark);

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
    <div className={`min-h-screen ${theme.bg} transition-all duration-700 flex flex-col p-4`}>
      <div className="flex-1 flex items-center justify-center pb-20">
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
