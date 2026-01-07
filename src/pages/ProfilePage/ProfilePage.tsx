import { Card } from '../../components/Card';
import { PROFILE_STATS } from '../../utils/constants';
import { formatUserName } from '../../utils/helpers';
import { ThemeColors, TelegramUser } from '../../types';

interface ProfilePageProps {
  theme: ThemeColors;
  telegramUser: TelegramUser | null;
  telegramVersion?: string;
}

export const ProfilePage = ({ theme, telegramUser, telegramVersion }: ProfilePageProps) => {
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

      <div className="grid grid-cols-3 gap-3">
        {PROFILE_STATS.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-2xl font-bold ${theme.textColor}`}>{stat.value}</div>
            <div className={`text-xs ${theme.subtextColor}`}>{stat.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};