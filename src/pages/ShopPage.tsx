import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

export default function ShopPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: string) => {
    // In a real app, this would be replaced with actual navigation
    // For now we'll simulate the alert behavior
    alert(`${plan} selected!`);
    
    // Navigate to a specific plan page if needed
    // navigate(`/plan/${plan.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className={`${theme.cardBg} backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full`}>
      <h1 className={`text-2xl font-bold ${theme.textColor} mb-2`}>
        Premium Shop
      </h1>
      <p className={`text-sm ${theme.subtextColor} mb-5`}>
        Unlock exclusive features
      </p>
      <div className="space-y-3">
        <div
          onClick={() => handleSelectPlan('Premium Plus')}
          className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg} hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4`}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
            💎
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${theme.textColor}`}>Premium Plus</h3>
            <p className={`${theme.subtextColor} text-xs`}>Unlimited access</p>
          </div>
          <div className={`text-xl font-bold ${theme.textColor}`}>$9.99</div>
        </div>

        <div
          onClick={() => handleSelectPlan('Pro Pack')}
          className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg} hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4`}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
            ⚡
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${theme.textColor}`}>Pro Pack</h3>
            <p className={`${theme.subtextColor} text-xs`}>Advanced tools</p>
          </div>
          <div className={`text-xl font-bold ${theme.textColor}`}>$14.99</div>
        </div>

        <div
          onClick={() => handleSelectPlan('Ultimate')}
          className={`p-4 rounded-xl border ${theme.borderColor} ${theme.cardBg} hover:scale-[1.02] transition-transform cursor-pointer flex items-center gap-4`}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
            🚀
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${theme.textColor}`}>Ultimate</h3>
            <p className={`${theme.subtextColor} text-xs`}>Everything included</p>
          </div>
          <div className={`text-xl font-bold ${theme.textColor}`}>$24.99</div>
        </div>
      </div>
    </div>
  );
}
