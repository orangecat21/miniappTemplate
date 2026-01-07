import { ThemeColors, ThemeMode } from '../types';

export const getThemeColors = (isDark: boolean): ThemeColors => ({
  bg: isDark
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
    : 'bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100',
  cardBg: isDark ? 'bg-gray-800/50' : 'bg-white',
  textColor: isDark ? 'text-white' : 'text-gray-900',
  subtextColor: isDark ? 'text-gray-300' : 'text-gray-600',
  borderColor: isDark ? 'border-gray-700' : 'border-gray-200'
});

export const getSystemTheme = (): ThemeMode => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const formatUserName = (firstName: string, lastName?: string): string => {
  return `${firstName} ${lastName || ''}`.trim();
};