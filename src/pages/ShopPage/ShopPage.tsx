import { Card } from '../../components/Card';
import { SHOP_ITEMS } from '../../utils/constants';
import { ThemeColors } from '../../types';

interface ShopPageProps {
  theme: ThemeColors;
  onItemSelect: (itemName: string) => void;
}

export const ShopPage = ({ theme, onItemSelect }: ShopPageProps) => {
  return (
    <Card theme={theme}>
      <h1 className={`text-2xl font-bold ${theme.textColor} mb-2`}>
        Premium Shop
      </h1>
      <p className={`text-sm ${theme.subtextColor} mb-5`}>
        Unlock exclusive features
      </p>
      <div className="space-y-3">
        {SHOP_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemSelect(item.name)}
            className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg} hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4`}
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}>
              {item.emoji}
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${theme.textColor}`}>{item.name}</h3>
              <p className={`${theme.subtextColor} text-xs`}>{item.description}</p>
            </div>
            <div className={`text-xl font-bold ${theme.textColor}`}>{item.price}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};