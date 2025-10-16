'use client';

import { useState } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationIcon } from '../NotificationIcon/NotificationIcon';
import { COLORS, OPACITY } from '../../constants/theme';

type NotificationType = 'unread' | 'due' | 'graded';

function getNotificationType(type: string, isRead: boolean): NotificationType {
  if (!isRead) return 'unread';
  if (type === 'ASSIGNMENT_DUE') return 'due';
  if (type === 'GRADE_POSTED') return 'graded';
  return 'unread';
}

export function NotificationsList() {
  const { data: notifications, isLoading, error } = useNotifications();
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style={{ color: COLORS.primary }} />
          <p className="mt-4" style={{ color: COLORS.primary }}>Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-4 border-red-500 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">Failed to load notifications</p>
        <p className="text-red-600 text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="bg-gray-50 border-4 border-black rounded-lg p-8 text-center">
        <p style={{ color: COLORS.primary }}>No notifications found</p>
      </div>
    );
  }

  // Group notifications by course
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const courseId = notification.courseId;
    if (!acc[courseId]) {
      acc[courseId] = [];
    }
    acc[courseId].push(notification);
    return acc;
  }, {} as Record<string, typeof notifications>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedNotifications).map(([courseId, courseNotifications]) => (
        <div key={courseId} className="bg-white border-4 border-black rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b-2 border-black" style={{ backgroundColor: COLORS.primary }}>
            <h2 className="text-xl font-bold text-white">
              Course: {courseId.substring(0, 8)}...
            </h2>
          </div>

          <div className="divide-y-2 divide-black">
            {courseNotifications.map((notification) => {
              const isExpanded = expandedIds.has(notification.id);
              const notificationType = getNotificationType(notification.type, notification.isRead);

              return (
                <div key={notification.id}>
                  <div
                    onClick={() => toggleExpand(notification.id)}
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <NotificationIcon type={notificationType} />
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
                              {new Date(notification.createdAt).toLocaleDateString()}
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
                        <p className="text-sm leading-relaxed mb-2" style={{ color: COLORS.primary }}>
                          <strong>Type:</strong> {notification.type}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: COLORS.primary }}>
                          <strong>Status:</strong> {notification.isRead ? 'Read' : 'Unread'}
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

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-white border-2 border-black rounded-lg p-4 text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: '#2e2e2e' }}>
            {notifications.filter(n => !n.isRead).length}
          </div>
          <div className="text-sm" style={{ color: '#2e2e2e', opacity: 0.7 }}>Unread</div>
        </div>
        <div className="bg-white border-2 border-black rounded-lg p-4 text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: '#2e2e2e' }}>
            {notifications.filter(n => n.type === 'ASSIGNMENT_DUE').length}
          </div>
          <div className="text-sm" style={{ color: '#2e2e2e', opacity: 0.7 }}>Due Soon</div>
        </div>
        <div className="bg-white border-2 border-black rounded-lg p-4 text-center">
          <div className="text-2xl font-bold mb-1" style={{ color: '#2e2e2e' }}>
            {notifications.filter(n => n.type === 'GRADE_POSTED').length}
          </div>
          <div className="text-sm" style={{ color: '#2e2e2e', opacity: 0.7 }}>Graded</div>
        </div>
      </div>
    </div>
  );
}
