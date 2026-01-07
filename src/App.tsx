import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useTelegram, useTheme } from './hooks';
import { getThemeColors } from './utils/helpers';
import { Navigation, ThemeToggle } from './components';
import { HomePage, ShopPage, ProfilePage, StatisticsPage } from './pages';

export default function App() {
  const location = useLocation();
  const { telegramUser, showAlert, hapticFeedback, getVersion } = useTelegram();
  const { isDark, toggleTheme } = useTheme();

  const theme = getThemeColors(isDark);

  // Определяем текущий индекс на основе URL
  const getSelectedIndex = () => {
    const path = location.pathname;
    if (path === '/shop') return 1;
    if (path === '/statistics') return 2;
    if (path === '/profile') return 3;
    return 0; // '/' или '/home'
  };

  const selectedIndex = getSelectedIndex();


  const handleShopItemSelect = (itemName: string) => {
    showAlert(`${itemName} selected!`);
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-all duration-700 flex flex-col p-4`}>
      <div className="w-full flex justify-end mb-3">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>

      <div className="flex-1 flex items-center justify-center pb-20">
        <div className="w-full max-w-md">
          <Routes>
            <Route path="/" element={<HomePage theme={theme} />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/shop"
              element={<ShopPage theme={theme} onItemSelect={handleShopItemSelect} />}
            />
            <Route
              path="/statistics"
              element={<StatisticsPage theme={theme} />}
            />
            <Route
              path="/profile"
              element={
                <ProfilePage
                  theme={theme}
                  telegramUser={telegramUser}
                  telegramVersion={getVersion()}
                />
              }
            />
          </Routes>
        </div>
      </div>

      <Navigation
        selectedIndex={selectedIndex}
        isDark={isDark}
      />
    </div>
  );
}