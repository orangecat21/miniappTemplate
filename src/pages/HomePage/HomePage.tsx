import { Card } from '../../components/Card';
import { STATS_ITEMS } from '../../utils/constants';
import { ThemeColors } from '../../types';

interface HomePageProps {
  theme: ThemeColors;
}

export const HomePage = ({ theme }: HomePageProps) => {
  return (
    <Card theme={theme}>
      <h1 className={`text-2xl font-bold ${theme.textColor} mb-3`}>
        Welcome Home
      </h1>
      <p className={`text-sm ${theme.subtextColor} mb-4`}>
        Your personalized dashboard
      </p>
      <div className="grid grid-cols-2 gap-3">
        {STATS_ITEMS.map((item, index) => (
          <div key={index} className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg}`}>
            <div className={`text-2xl font-bold ${theme.textColor}`}>{item.value}</div>
            <div className={`text-xs ${theme.subtextColor}`}>{item.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};