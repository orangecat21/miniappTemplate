import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

export default function ProfilePage() {
  const { theme, telegramUser } = useTheme();
  const [user, setUser] = useState<{
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
          const user = WebApp.initDataUnsafe?.user;
          if (user) {
            setUser({
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username,
              photoUrl: user.photo_url,
            });
          }
        }
      } catch (error) {
        console.error('Telegram WebApp init error:', error);
      }
    };

    initTelegram();
  }, []);

  return (
    <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full`}>
      <div className="flex items-center gap-4 mb-5">
        {user?.photoUrl ? (
          <img
            src={user.photoUrl}
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
            {user
              ? `${user.firstName} ${user.lastName || ''}`.trim()
              : 'Alex Johnson'
            }
          </h1>
          <p className={`text-sm ${theme.subtextColor}`}>
            Premium Member
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        {user?.username && (
          <div className={`p-3 rounded-lg border ${theme.borderColor} flex justify-between items-center`}>
            <span className={`${theme.subtextColor} text-xs`}>Username</span>
            <span className={`${theme.textColor} text-sm font-medium`}>@{user.username}</span>
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
}
