import { NavigationItem } from './NavigationItem';
import { NAV_ITEMS } from '../../utils/constants';
import { Plus } from 'lucide-react';

interface NavigationProps {
  selectedIndex: number;
  isDark: boolean;
}

export const Navigation = ({ selectedIndex, isDark }: NavigationProps) => {
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

        <div className="relative z-10 flex flex-col items-center justify-center w-20 h-16 rounded-full transition-all duration-300 cursor-pointer">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-900 shadow-lg">
            <Plus className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
};
