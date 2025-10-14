export interface Notification {
  id: string;
  type: 'unread' | 'due' | 'graded';
  message: string;
  classCode: string;
  className: string;
}

interface DashboardProps {
  notifications?: Notification[];
}

const defaultNotifications: Notification[] = [
  { id: '1', type: 'unread', message: 'New announcement posted', classCode: 'CISC474', className: 'Web Development' },
  { id: '2', type: 'due', message: 'Assignment 2 due tomorrow', classCode: 'CISC474', className: 'Web Development' },
  { id: '3', type: 'unread', message: 'Course materials updated', classCode: 'CISC474', className: 'Web Development' },
  { id: '4', type: 'graded', message: 'Quiz 1 has been graded', classCode: 'CISC437', className: 'Database Systems' },
  { id: '5', type: 'due', message: 'Project proposal due Friday', classCode: 'CISC437', className: 'Database Systems' },
  { id: '6', type: 'graded', message: 'Midterm exam graded', classCode: 'CISC320', className: 'Data Structures' },
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

  // Group notifications by class
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const key = `${notification.classCode} - ${notification.className}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  return (
    <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: '#2e2e2e' }}>
      <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
      <div className="space-y-4">
        {Object.entries(groupedNotifications).map(([classInfo, classNotifications], index) => (
          <div key={classInfo}>
            {/* Class header */}
            <h4 className="text-white font-semibold text-sm mb-2">
              {classInfo}
            </h4>
            
            {/* Notifications for this class */}
            <div className="space-y-2 ml-2">
              {classNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getNotificationDotColor(notification.type)}`} />
                  <p className="text-white text-sm leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Thin separator line (except for last group) */}
            {index < Object.entries(groupedNotifications).length - 1 && (
              <div className="mt-3 border-t border-white/20"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}