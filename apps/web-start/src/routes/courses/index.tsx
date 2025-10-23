import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { CoursesList } from '../../components/CoursesList/CoursesList';
import { COLORS } from '../../constants/theme';

export const Route = createFileRoute('/courses/')({
  component: CoursesPage,
});

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style={{ color: COLORS.primary }} />
        <p className="mt-4" style={{ color: COLORS.primary }}>Loading courses...</p>
      </div>
    </div>
  );
}

function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="My Courses" subtitle="Manage your enrolled courses and track progress" />

        <Suspense fallback={<LoadingFallback />}>
          <CoursesList />
        </Suspense>

        <div className="mt-12 text-center">
          <button
            className="border-2 border-black px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto"
            style={{ color: COLORS.primary }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Manage Courses
          </button>
        </div>
      </div>
    </div>
  );
}
