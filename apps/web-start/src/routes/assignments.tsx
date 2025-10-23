import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../constants/theme';
import { backendFetcher } from '../integrations/fetcher';

export const Route = createFileRoute('/assignments')({
  component: AssignmentsPage,
});

type Assignment = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  courseId: string;
};

function AssignmentsContent() {
  const { data: assignments } = useSuspenseQuery<Assignment[]>({
    queryKey: ['assignments'],
    queryFn: backendFetcher<Assignment[]>('/assignments'),
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Assignments" subtitle="All assignments loaded from backend API" />

        {assignments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
              No assignments found
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white border-4 border-black rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.primary }}>
                      {assignment.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                      {assignment.description}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span style={{ color: COLORS.primary, opacity: OPACITY.medium }}>Due: </span>
                        <span className="font-semibold" style={{ color: COLORS.primary }}>
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: COLORS.primary, opacity: OPACITY.medium }}>Points: </span>
                        <span className="font-semibold" style={{ color: COLORS.primary }}>
                          {assignment.maxPoints}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="border-2 border-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors ml-4"
                    style={{ color: COLORS.primary }}
                  >
                    View Details
                  </button>
                </div>
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
        <PageHeader title="Assignments" subtitle="Loading assignments from backend..." />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    </div>
  );
}

function AssignmentsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AssignmentsContent />
    </Suspense>
  );
}
