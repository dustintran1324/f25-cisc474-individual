export const metadata = {
  title: 'Notifications - Learning Management System',
  description: "View and manage your notifications",
};

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "Assignment Due Tomorrow",
      message: "CISC474 Project milestone is due tomorrow at 11:59 PM",
      time: "2 hours ago",
      type: "assignment",
      unread: true
    },
    {
      id: 2,
      title: "Grade Posted",
      message: "Your grade for Quiz 3 has been posted",
      time: "1 day ago",
      type: "grade",
      unread: true
    },
    {
      id: 3,
      title: "Course Announcement",
      message: "Office hours have been moved to Wednesday 2-4 PM",
      time: "3 days ago",
      type: "announcement",
      unread: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
        <p className="text-gray-600">Stay updated with your course activities</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow ${
              notification.unread ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  {notification.unread && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
              <div className="flex gap-2">
                {notification.unread && (
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Mark as read
                  </button>
                )}
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 17h5l-5 5v-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 8h6v2H9V8z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6v2H9v-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-500">You&apos;re all caught up!</p>
        </div>
      )}
    </div>
  );
}