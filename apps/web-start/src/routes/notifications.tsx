import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { NotificationsList } from '../components/NotificationsList/NotificationsList';
import { COLORS } from '../constants/theme';

export const Route = createFileRoute('/notifications')({
  component: NotificationsPage,
});

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style={{ color: COLORS.primary }} />
        <p className="mt-4" style={{ color: COLORS.primary }}>Loading notifications...</p>
      </div>
    </div>
  );
}

function NotificationsPage() {

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Notifications" subtitle="Stay updated with your course activities" />

        <Suspense fallback={<LoadingFallback />}>
          <NotificationsList />
        </Suspense>
      </div>
    </div>
  );
}
