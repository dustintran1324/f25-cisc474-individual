import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../constants/theme';
import { backendFetcher } from '../integrations/fetcher';

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
});

type Course = {
  id: string;
  code: string;
  name: string;
  description: string;
  semester: string;
  year: number;
};

function CoursesContent() {
  const { data: courses } = useSuspenseQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: backendFetcher<Course[]>('/courses'),
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="My Courses" subtitle="Courses loaded from backend API" />

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
              No courses found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white border-4 border-black rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold px-2 py-1 bg-gray-100 rounded" style={{ color: COLORS.primary }}>
                      {course.code}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-gray-100" style={{ color: COLORS.primary }}>
                      {course.semester} {course.year}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>
                    {course.name}
                  </h3>
                  <p className="text-sm" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                    {course.description}
                  </p>
                </div>

                <button
                  className="w-full border-2 border-black py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  style={{ color: COLORS.primary }}
                >
                  View Course
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="My Courses" subtitle="Loading courses from backend..." />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    </div>
  );
}

function CoursesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CoursesContent />
    </Suspense>
  );
}
