import { NavigationItem } from './NavigationItem';
import { NAV_ITEMS } from '../../utils/constants';
import { Plus } from 'lucide-react';

interface NavigationProps {
  selectedIndex: number;
  isDark: boolean;
}

export const Navigation = ({ selectedIndex, isDark }: NavigationProps) => {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 ${isDark ? 'bg-white/5' : 'bg-white/70'} backdrop-blur-xl rounded-3xl px-2 py-2 shadow-lg transition-all duration-700 border ${isDark ? 'border-white/10' : 'border-white/50'}`}>
      <div className="relative flex items-center gap-1">
        {NAV_ITEMS.map((item, index) => (
          <NavigationItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isSelected={selectedIndex === index}
            isDark={isDark}
          />
        ))}

        <div className="mx-2 w-px h-8 bg-gradient-to-b from-transparent via-gray-300/40 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 cursor-pointer">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 hover:scale-105 transition-all duration-300">
            <Plus className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

