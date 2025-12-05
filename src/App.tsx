import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, User, Sun, Moon } from 'lucide-react';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProfilePage from './pages/ProfilePage';
import { useTheme } from './hooks/useTheme';

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

// Navigation component to handle tab switching
function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, theme } = useTheme();
  
  // Determine selected index based on current path
  const selectedIndex = (() => {
    switch(location.pathname) {
      case '/':
        return 0;
      case '/shop':
        return 1;
      case '/profile':
        return 2;
      default:
        return 0;
    }
  })();

  const navItems = [
    { icon: Home, label: 'Zalupa', path: '/' },
    { icon: ShoppingBag, label: 'Shop', path: '/shop' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  const handleTabClick = (index: number, path: string) => {
    navigate(path);
    
    // Trigger Telegram haptic feedback if available
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  };

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 ${isDark ? 'bg-white/10' : 'bg-white/40'} backdrop-blur-md rounded-full p-1.5 shadow-2xl transition-all duration-700`}>
      <div className="relative flex">
        <div
          className={`absolute ${isDark ? 'bg-white/30' : 'bg-white'} backdrop-blur-sm rounded-full transition-all duration-500 ease-out shadow-lg`}
          style={{
            left: `${selectedIndex * 80}px`,
            top: '0',
            bottom: '0',
            width: '80px',
            boxShadow: isDark
              ? '0 8px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
              : '0 8px 20px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
        />

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isSelected = selectedIndex === index;

          return (
            <button
              key={index}
              onClick={() => handleTabClick(index, item.path)}
              className="relative z-10 flex flex-col items-center justify-center w-20 h-16 rounded-full transition-all duration-300"
            >
              <div className="relative mb-0.5">
                <Icon
                  className="w-6 h-6 transition-all duration-200"
                  style={{
                    color: isSelected ? 'transparent' : isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(100, 100, 100, 0.6)',
                    strokeWidth: 2
                  }}
                />

                <div
                  className="absolute inset-0 overflow-hidden transition-all duration-200 ease-out"
                  style={{
                    opacity: isSelected ? 1 : 0,
                  }}
                >
                  <Icon
                    className="w-6 h-6 text-purple-900"
                    style={{ strokeWidth: 2 }}
                  />
                </div>
              </div>

              <div className="relative">
                <span
                  className="text-xs font-medium transition-all duration-200"
                  style={{
                    color: isSelected ? 'transparent' : isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(100, 100, 100, 0.6)'
                  }}
                >
                  {item.label}
                </span>

                <div
                  className="absolute inset-0 overflow-hidden transition-all duration-200 ease-out"
                  style={{
                    opacity: isSelected ? 1 : 0,
                  }}
                >
                  <span className="text-xs font-medium text-purple-900 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AppContent() {
  const { theme, isDark, telegramUser } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(isDark);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd update the theme preference here
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-all duration-700 flex flex-col p-4`}>
      <div className="w-full flex justify-end mb-3">
        <button
          onClick={toggleDarkMode}
          className="bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-300" strokeWidth={2} />
          ) : (
            <Moon className="w-5 h-5 text-purple-600" strokeWidth={2} />
          )}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center pb-20">
        <div className="w-full max-w-md">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
