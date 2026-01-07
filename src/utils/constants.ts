import { Home, ShoppingBag, User } from 'lucide-react';

export const NAV_ITEMS = [
  { icon: Home, label: 'Zalupa', path: '/' },
  { icon: ShoppingBag, label: 'Shop', path: '/shop' },
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