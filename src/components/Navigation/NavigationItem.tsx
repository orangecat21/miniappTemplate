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
      className="relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 group hover:bg-white/5"
    >
      <Icon
        className={`w-6 h-6 transition-all duration-300 ${
          isSelected
            ? 'text-purple-600'
            : isDark 
              ? 'text-white/40' 
              : 'text-gray-400'
        }`}
        strokeWidth={2}
      />

      <span 
        className={`text-[10px] transition-all duration-300 mt-1 ${
          isSelected
            ? 'text-purple-600 font-medium'
            : isDark 
              ? 'text-white/40 font-normal' 
              : 'text-gray-400 font-normal'
        }`}
      >
        {label}
      </span>
    </a>
  );
};
