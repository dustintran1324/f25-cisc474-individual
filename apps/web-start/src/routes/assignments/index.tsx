import { createFileRoute, Link } from '@tanstack/react-router';
import { useAssignments } from '../../hooks/useAssignments';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../../constants/theme';

export const Route = createFileRoute('/assignments/')({
  component: AssignmentsListPage,
});

function AssignmentsListPage() {
  const { data: assignments, isLoading, error } = useAssignments();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p style={{ color: COLORS.primary }}>Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load assignments</p>
          <p className="text-sm text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const assignmentsArray = Array.isArray(assignments) ? assignments : [];

  const groupedByCourse = assignmentsArray.reduce((acc, assignment) => {
    const courseKey = assignment.courseId;
    if (!acc[courseKey]) {
      acc[courseKey] = {
        course: assignment.course,
        assignments: [],
      };
    }
    acc[courseKey].assignments.push(assignment);
    return acc;
  }, {} as Record<string, { course?: any; assignments: any[] }>);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="All Assignments" subtitle="View and manage your assignments" />

        {assignmentsArray.length === 0 ? (
          <div className="text-center py-12 border-4 border-black rounded-lg">
            <p style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
              No assignments yet.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.values(groupedByCourse || {}).map((group) => (
              <div key={group.course?.id || 'unknown'}>
                <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>
                  {group.course?.code || 'Unknown Course'} - {group.course?.title || ''}
                </h2>
                <div className="space-y-4">
                  {group.assignments.map((assignment) => {
                    const dueDate = new Date(assignment.dueDate);
                    const isOverdue = dueDate < new Date();

                    return (
                      <Link
                        key={assignment.id}
                        to="/assignments/$assignmentId"
                        params={{ assignmentId: assignment.id }}
                        className="block bg-white border-4 border-black rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>
                              {assignment.title}
                            </h3>
                            <p className="text-sm mb-2 line-clamp-2" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                              {assignment.description}
                            </p>
                            <div className="flex gap-2 mt-3">
                              {assignment.allowedTypes.map((type) => (
                                <span
                                  key={type}
                                  className="text-xs px-2 py-1 bg-gray-100 rounded"
                                  style={{ color: COLORS.primary }}
                                >
                                  {type.replace(/_/g, ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p
                              className={`text-sm font-medium ${isOverdue ? 'text-red-600' : ''}`}
                              style={!isOverdue ? { color: COLORS.primary } : {}}
                            >
                              Due: {dueDate.toLocaleDateString()}
                            </p>
                            <p className="text-xs mt-1" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                              {assignment.maxPoints} points
                            </p>
                            {isOverdue && (
                              <span className="text-xs text-red-600 font-semibold mt-1 block">
                                Overdue
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
