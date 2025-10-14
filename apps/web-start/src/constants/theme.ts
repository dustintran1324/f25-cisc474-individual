export const COLORS = {
  primary: '#2e2e2e',
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    400: '#9ca3af',
    700: '#374151',
  },
  status: {
    unread: '#ff4444',
    due: '#ffaa00',
    graded: '#44ff44',
  },
} as const;

export const OPACITY = {
  high: 1,
  medium: 0.7,
  low: 0.5,
} as const;
