import { LucideIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks';

interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isSelected: boolean;
  isDark: boolean;
}

export const NavigationItem = ({ icon: Icon, label, path, isSelected, isDark }: NavigationItemProps) => {
  const navigate = useNavigate();
  const { hapticFeedback } = useTelegram();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    hapticFeedback('light');
    navigate(path);
  };

  return (
    <a
      href={path}
      onClick={handleClick}
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
          {label}
        </span>

        <div
          className="absolute inset-0 overflow-hidden transition-all duration-200 ease-out"
          style={{
            opacity: isSelected ? 1 : 0,
          }}
        >
          <span className="text-xs font-medium text-purple-900 whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>
    </a>
  );
};