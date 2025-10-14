import { COLORS } from '../../constants/theme';

type NotificationType = 'unread' | 'due' | 'graded';

interface NotificationIconProps {
  type: NotificationType;
}

const notificationColors: Record<NotificationType, string> = {
  unread: COLORS.status.unread,
  due: COLORS.status.due,
  graded: COLORS.status.graded,
};

export function NotificationIcon({ type }: NotificationIconProps) {
  const backgroundColor = notificationColors[type] || COLORS.gray[400];

  return (
    <div
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor }}
    />
  );
}
