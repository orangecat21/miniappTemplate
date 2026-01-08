import { useState } from 'react';
import { Card } from '../../components/Card';
import { ThemeToggle } from '../../components/ThemeToggle';
import { MyRitual } from '../../components/MyRitual';
import { PROFILE_STATS } from '../../utils/constants';
import { formatUserName } from '../../utils/helpers';
import { ThemeColors, TelegramUser } from '../../types';

interface ProfilePageProps {
  theme: ThemeColors;
  telegramUser: TelegramUser | null;
  telegramVersion?: string;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ProfilePage = ({ theme, telegramUser, telegramVersion, isDark, toggleTheme }: ProfilePageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Card theme={theme}>
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
              ? formatUserName(telegramUser.firstName, telegramUser.lastName)
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
          <span className={`${theme.textColor} text-sm font-medium`}>{telegramVersion || 'N/A'}</span>
        </div>
      </div>

      <div className="flex justify-end mb-5">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {PROFILE_STATS.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-2xl font-bold ${theme.textColor}`}>{stat.value}</div>
            <div className={`text-xs ${theme.subtextColor}`}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div 
        className={`mt-5 p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg} hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
          💎
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${theme.textColor}`}>Мои ритуалы</h3>
          <p className={`${theme.subtextColor} text-xs`}>Я хочу выполнять это каждый день</p>
        </div>
        <div className={`text-xl font-bold ${theme.textColor}`}>4 шт</div>
      </div>

      <MyRitual
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme={theme}
      />
    </Card>
  );
};
