import { Card } from '../../components/Card';
import { ACTIVITY_STATS } from '../../utils/constants';
import { ThemeColors } from '../../types';

interface StatisticsPageProps {
  theme: ThemeColors;
}

export const StatisticsPage = ({ theme }: StatisticsPageProps) => {
  return (
    <Card theme={theme}>
      <h1 className={`text-2xl font-bold ${theme.textColor} mb-3`}>
        Activity Statistics
      </h1>
      <p className={`text-sm ${theme.subtextColor} mb-4`}>
        Track your daily activities
      </p>
      <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
        {ACTIVITY_STATS.map((item, index: number) => (
          <div key={index} className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg} flex justify-between items-center`}>
            <div>
              <div className={`text-lg font-bold ${theme.textColor}`}>{item.label}</div>
              <div className={`text-xs ${theme.subtextColor}`}>{item.description}</div>
            </div>
            <div className={`text-2xl font-bold ${theme.textColor}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};