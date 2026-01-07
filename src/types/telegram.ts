export interface TelegramUser {
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

export interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  initDataUnsafe?: {
    user?: {
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
  };
  colorScheme: 'dark' | 'light';
  onEvent: (event: string, callback: () => void) => void;
  offEvent: (event: string, callback: () => void) => void;
  showAlert: (message: string) => void;
  HapticFeedback?: {
    impactOccurred: (style: string) => void;
  };
  version?: string;
}

export interface TelegramWindow extends Window {
  Telegram?: {
    WebApp: TelegramWebApp;
  };
}