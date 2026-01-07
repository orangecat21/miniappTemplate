import { Home, ShoppingBag, User, BarChart } from 'lucide-react';

export const NAV_ITEMS = [
  { icon: Home, label: 'Zalupa', path: '/' },
  { icon: ShoppingBag, label: 'Shop', path: '/shop' },
  { icon: BarChart, label: 'Stats', path: '/statistics' },
  { icon: User, label: 'Profile', path: '/profile' }
] as const;

export const SHOP_ITEMS = [
  {
    id: 1,
    name: 'Premium Plus',
    description: 'Unlimited access',
    price: '$9.99',
    emoji: '💎',
    gradient: 'from-purple-400 to-pink-400'
  },
  {
    id: 2,
    name: 'Pro Pack',
    description: 'Advanced tools',
    price: '$14.99',
    emoji: '⚡',
    gradient: 'from-blue-400 to-cyan-400'
  },
  {
    id: 3,
    name: 'Ultimate',
    description: 'Everything included',
    price: '$24.99',
    emoji: '🚀',
    gradient: 'from-orange-400 to-red-400'
  }
] as const;

export const STATS_ITEMS = [
  { label: 'Projects', value: '24' },
  { label: 'Items', value: '156' }
] as const;

export const PROFILE_STATS = [
  { label: 'Posts', value: '48' },
  { label: 'Followers', value: '2.4k' },
  { label: 'Following', value: '892' }
] as const;

export const ACTIVITY_STATS = [
  { label: 'Daily Steps', description: 'Walking activity', value: '8,543' },
  { label: 'Active Minutes', description: 'Exercise time', value: '45' },
  { label: 'Calories Burned', description: 'Today\'s total', value: '320' },
  { label: 'Sleep Hours', description: 'Last night', value: '7.5' },
  { label: 'Water Intake', description: 'Glasses today', value: '6' },
  { label: 'Heart Rate', description: 'Average today', value: '72' },
  { label: 'Distance Walked', description: 'Today\'s total', value: '5.2 km' },
  { label: 'Workouts', description: 'Completed today', value: '3' },
  { label: 'Stand Hours', description: 'Movement today', value: '12' },
  { label: 'Protein Intake', description: 'Grams consumed', value: '85g' },
  { label: 'Meditation Time', description: 'Minutes today', value: '15' },
  { label: 'Resting Heart Rate', description: 'BPM average', value: '65' },
  { label: 'Blood Oxygen', description: 'SpO2 level', value: '98%' },
  { label: 'Body Temperature', description: 'Current', value: '36.6°C' },
  { label: 'Stress Level', description: 'Current status', value: 'Low' },
  { label: 'Mindfulness Score', description: 'Daily rating', value: '8.5' }
] as const;
