import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

export default function HomePage() {
  const { theme } = useTheme();
  const [projects, setProjects] = useState(24);
  const [items, setItems] = useState(156);

  return (
    <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full`}>
      <h1 className={`text-2xl font-bold ${theme.textColor} mb-3`}>
        Welcome Home
      </h1>
      <p className={`text-sm ${theme.subtextColor} mb-4`}>
        Your personalized dashboard
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg}`}>
          <div className={`text-2xl font-bold ${theme.textColor}`}>{projects}</div>
          <div className={`text-xs ${theme.subtextColor}`}>Projects</div>
        </div>
        <div className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg}`}>
          <div className={`text-2xl font-bold ${theme.textColor}`}>{items}</div>
          <div className={`text-xs ${theme.subtextColor}`}>Items</div>
        </div>
      </div>
    </div>
  );
}
