import { ReactNode } from 'react';
import { ThemeColors } from '../../types';

interface CardProps {
  children: ReactNode;
  theme: ThemeColors;
  className?: string;
}

export const Card = ({ children, theme, className = '' }: CardProps) => {
  return (
    <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full ${className}`}>
      {children}
    </div>
  );
};