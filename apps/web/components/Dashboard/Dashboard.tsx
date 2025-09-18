export interface Notification {
  id: string;
  type: 'unread' | 'due' | 'graded';
  message: string;
}

interface DashboardProps {
  notifications?: Notification[];
}

const defaultNotifications: Notification[] = [
  { id: '1', type: 'unread', message: 'New announcement in CISC474' },
  { id: '2', type: 'due', message: 'Assignment 2 due tomorrow' },
  { id: '3', type: 'graded', message: 'Quiz 1 has been graded' },
  { id: '4', type: 'due', message: 'Project proposal due Friday' },
  { id: '5', type: 'unread', message: 'Course materials updated' },
];

export default function Dashboard({ notifications = defaultNotifications }: DashboardProps) {
  const getNotificationDotColor = (type: Notification['type']) => {
    switch (type) {
      case 'unread':
        return 'bg-red-500';
      case 'due':
        return 'bg-yellow-500';
      case 'graded':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-default-gray p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-3">
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getNotificationDotColor(notification.type)}`} />
            <p className="text-white text-sm leading-relaxed">
              {notification.message}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-white/60 text-xs">
          • Red: Unread notifications
          <br />
          • Yellow: Due assignments
          <br />
          • Green: Graded assignments
        </p>
      </div>
    </div>
  );
}