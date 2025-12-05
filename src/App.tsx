import { useState, useEffect } from 'react';
import { Home, ShoppingBag, User, Sun, Moon } from 'lucide-react';

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  const navItems = [
    { icon: Home, label: 'Zalupa' },
    { icon: ShoppingBag, label: 'Shop' },
    { icon: User, label: 'Profile' }
  ];

  const theme = {
    bg: isDark
      ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
      : 'bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100',
    cardBg: isDark ? 'bg-gray-800/50' : 'bg-white',
    textColor: isDark ? 'text-white' : 'text-gray-900',
    subtextColor: isDark ? 'text-gray-300' : 'text-gray-600',
    borderColor: isDark ? 'border-gray-700' : 'border-gray-200',
  };

  const renderPage = () => {
    switch(selectedIndex) {
      case 0:
        return (
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full`}>
            <h1 className={`text-2xl font-bold ${theme.textColor} mb-3`}>
              Welcome Home
            </h1>
            <p className={`text-sm ${theme.subtextColor} mb-4`}>
              Your personalized dashboard
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg}`}>
                <div className={`text-2xl font-bold ${theme.textColor}`}>24</div>
                <div className={`text-xs ${theme.subtextColor}`}>Projects</div>
              </div>
              <div className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg}`}>
                <div className={`text-2xl font-bold ${theme.textColor}`}>156</div>
                <div className={`text-xs ${theme.subtextColor}`}>Items</div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full`}>
            <h1 className={`text-2xl font-bold ${theme.textColor} mb-2`}>
              Premium Shop
            </h1>
            <p className={`text-sm ${theme.subtextColor} mb-5`}>
              Unlock exclusive features
            </p>
            <div className="space-y-3">
              <div
                onClick={() => {
                  window.Telegram?.WebApp?.showAlert('Premium Plus selected!');
                }}
                className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg} hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  💎
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${theme.textColor}`}>Premium Plus</h3>
                  <p className={`${theme.subtextColor} text-xs`}>Unlimited access</p>
                </div>
                <div className={`text-xl font-bold ${theme.textColor}`}>$9.99</div>
              </div>

              <div
                onClick={() => {
                  window.Telegram?.WebApp?.showAlert('Pro Pack selected!');
                }}
                className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg} hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  ⚡
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${theme.textColor}`}>Pro Pack</h3>
                  <p className={`${theme.subtextColor} text-xs`}>Advanced tools</p>
                </div>
                <div className={`text-xl font-bold ${theme.textColor}`}>$14.99</div>
              </div>

              <div
                onClick={() => {
                  window.Telegram?.WebApp?.showAlert('Ultimate selected!');
                }}
                className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg} hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  🚀
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${theme.textColor}`}>Ultimate</h3>
                  <p className={`${theme.subtextColor} text-xs`}>Everything included</p>
                </div>
                <div className={`text-xl font-bold ${theme.textColor}`}>$24.99</div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full`}>
            <div className="flex items-center gap-4 mb-5">
              {telegramUser?.photoUrl ? (
                <img
                  src={telegramUser.photoUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full shadow-lg flex-shrink-0 object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                  👤
                </div>
              )}
              <div>
                <h1 className={`text-2xl font-bold ${theme.textColor}`}>
                  {telegramUser
                    ? `${telegramUser.firstName} ${telegramUser.lastName || ''}`.trim()
                    : 'Alex Johnson'
                  }
                </h1>
                <p className={`text-sm ${theme.subtextColor}`}>
                  Premium Member
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              {telegramUser?.username && (
                <div className={`p-3 rounded-lg border ${theme.borderColor} flex justify-between items-center`}>
                  <span className={`${theme.subtextColor} text-xs`}>Username</span>
                  <span className={`${theme.textColor} text-sm font-medium`}>@{telegramUser.username}</span>
                </div>
              )}
              <div className={`p-3 rounded-lg border ${theme.borderColor} flex justify-between items-center`}>
                <span className={`${theme.subtextColor} text-xs`}>Platform</span>
                <span className={`${theme.textColor} text-sm font-medium`}>Telegram</span>
              </div>
              <div className={`p-3 rounded-lg border ${theme.borderColor} flex justify-between items-center`}>
                <span className={`${theme.subtextColor} text-xs`}>Version</span>
                <span className={`${theme.textColor} text-sm font-medium`}>{window.Telegram?.WebApp?.version}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className={`text-2xl font-bold ${theme.textColor}`}>48</div>
                <div className={`text-xs ${theme.subtextColor}`}>Posts</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${theme.textColor}`}>2.4k</div>
                <div className={`text-xs ${theme.subtextColor}`}>Followers</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${theme.textColor}`}>892</div>
                <div className={`text-xs ${theme.subtextColor}`}>Following</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-all duration-700 flex flex-col p-4`}>
      <div className="w-full flex justify-end mb-3">
        <button
          onClick={() => setIsDark(!isDark)}
          className="bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-300" strokeWidth={2} />
          ) : (
            <Moon className="w-5 h-5 text-purple-600" strokeWidth={2} />
          )}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center pb-20">
        <div className="w-full max-w-md">
          {renderPage()}
        </div>
      </div>

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
                onClick={() => {
                  setSelectedIndex(index);
                  window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
                }}
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
    </div>
  );
}
