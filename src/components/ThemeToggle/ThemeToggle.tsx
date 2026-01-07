import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-300" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5 text-purple-600" strokeWidth={2} />
      )}
    </button>
  );
};