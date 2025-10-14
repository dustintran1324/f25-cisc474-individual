import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { NotificationIcon } from '../components/NotificationIcon/NotificationIcon';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../constants/theme';

export const Route = createFileRoute('/notifications')({
  component: NotificationsPage,
});

interface Notification {
  id: string;
  type: 'unread' | 'due' | 'graded';
  title: string;
  message: string;
  detail: string;
  timestamp: string;
  classCode: string;
  className: string;
}

const notificationsByCourse: Record<string, Notification[]> = {
  'CISC474 - Web Development': [
    {
      id: '1',
      type: 'unread',
      title: 'Meow meow announcement',
      message: 'Woof woof meow bark bark',
      detail: 'Ribbit ribbit chirp chirp! Meow meow woof woof bark bark. Quack quack moo moo baa baa. Hiss hiss tweet tweet squeak squeak. Oink oink neigh neigh roar roar.',
      timestamp: '2 hours ago',
      classCode: 'CISC474',
      className: 'Web Development'
    },
    {
      id: '2',
      type: 'due',
      title: 'Bark bark assignment tomorrow',
      message: 'Chirp chirp quack quack deadline',
      detail: 'Woof woof bark bark meow meow! Ribbit ribbit chirp chirp squeak squeak. Moo moo baa baa oink oink. Hiss hiss tweet tweet roar roar. Quack quack neigh neigh.',
      timestamp: '5 hours ago',
      classCode: 'CISC474',
      className: 'Web Development'
    },
    {
      id: '3',
      type: 'unread',
      title: 'Chirp chirp materials updated',
      message: 'Ribbit ribbit new slides available',
      detail: 'Quack quack moo moo baa baa! Meow meow woof woof bark bark. Chirp chirp tweet tweet squeak squeak. Hiss hiss oink oink neigh neigh. Roar roar ribbit ribbit.',
      timestamp: '1 day ago',
      classCode: 'CISC474',
      className: 'Web Development'
    }
  ],
  'CISC437 - Database Systems': [
    {
      id: '4',
      type: 'graded',
      title: 'Quack quack quiz graded',
      message: 'Moo moo score available',
      detail: 'Baa baa oink oink hiss hiss! Tweet tweet squeak squeak meow meow. Woof woof bark bark chirp chirp. Ribbit ribbit quack quack roar roar. Neigh neigh moo moo.',
      timestamp: '3 hours ago',
      classCode: 'CISC437',
      className: 'Database Systems'
    },
    {
      id: '5',
      type: 'due',
      title: 'Hiss hiss project proposal',
      message: 'Tweet tweet deadline approaching',
      detail: 'Squeak squeak meow meow woof woof! Bark bark chirp chirp ribbit ribbit. Quack quack moo moo baa baa. Oink oink hiss hiss neigh neigh. Roar roar tweet tweet.',
      timestamp: '1 day ago',
      classCode: 'CISC437',
      className: 'Database Systems'
    }
  ],
  'CISC320 - Data Structures': [
    {
      id: '6',
      type: 'graded',
      title: 'Roar roar exam results',
      message: 'Neigh neigh midterm graded',
      detail: 'Meow meow woof woof bark bark! Chirp chirp ribbit ribbit quack quack. Moo moo baa baa oink oink. Hiss hiss tweet tweet squeak squeak. Roar roar neigh neigh.',
      timestamp: '2 days ago',
      classCode: 'CISC320',
      className: 'Data Structures'
    }
  ]
};

function NotificationsPage() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Notifications" subtitle="Stay updated with your course activities" />

        <div className="space-y-6">
          {Object.entries(notificationsByCourse).map(([courseName, notifications]) => (
            <div key={courseName} className="bg-white border-4 border-black rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b-2 border-black" style={{ backgroundColor: COLORS.primary }}>
                <h2 className="text-xl font-bold text-white">
                  {courseName}
                </h2>
              </div>

              <div className="divide-y-2 divide-black">
                {notifications.map((notification) => {
                  const isExpanded = expandedIds.has(notification.id);

                  return (
                    <div key={notification.id}>
                      <div
                        onClick={() => toggleExpand(notification.id)}
                        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <NotificationIcon type={notification.type} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-base mb-1" style={{ color: COLORS.primary }}>
                                  {notification.title}
                                </h3>
                                <p className="text-sm" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                                  {notification.message}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs whitespace-nowrap" style={{ color: COLORS.primary, opacity: OPACITY.low }}>
                                  {notification.timestamp}
                                </span>
                                <svg
                                  className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  style={{ color: COLORS.primary }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 bg-gray-50">
                          <div className="pl-6 border-l-2 border-black">
                            <p className="text-sm leading-relaxed" style={{ color: COLORS.primary }}>
                              {notification.detail}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white border-2 border-black rounded-lg p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: '#2e2e2e' }}>2</div>
            <div className="text-sm" style={{ color: '#2e2e2e', opacity: 0.7 }}>Unread</div>
          </div>
          <div className="bg-white border-2 border-black rounded-lg p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: '#2e2e2e' }}>2</div>
            <div className="text-sm" style={{ color: '#2e2e2e', opacity: 0.7 }}>Due Soon</div>
          </div>
          <div className="bg-white border-2 border-black rounded-lg p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: '#2e2e2e' }}>2</div>
            <div className="text-sm" style={{ color: '#2e2e2e', opacity: 0.7 }}>Graded</div>
          </div>
        </div>
      </div>
    </div>
  );
}
