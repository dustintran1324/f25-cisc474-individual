import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { ManageAssignmentsModal } from '../../../components/ManageAssignmentsModal/ManageAssignmentsModal';
import { COLORS, OPACITY } from '../../../constants/theme';
import { useApi } from '../../../hooks/useApi';

export const Route = createFileRoute('/courses/$courseId/')({
  component: CoursePage,
});

function CoursePage() {
  const { courseId } = Route.useParams();
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();
  const [activeTab, setActiveTab] = useState<'assignments' | 'syllabus' | 'modules' | 'grades'>('assignments');
  const [isManageAssignmentsOpen, setIsManageAssignmentsOpen] = useState(false);

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => api.courses.getById(courseId),
    enabled: !!courseId && isAuthenticated,
  });

  const { data: assignments = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ['assignments', courseId],
    queryFn: () => api.assignments.getAll(courseId),
    enabled: activeTab === 'assignments' && !!courseId && isAuthenticated,
  });

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p style={{ color: COLORS.primary }}>Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p style={{ color: COLORS.primary }}>Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title={course.title} subtitle={course.code} />

        <div className="mb-6">
          <p style={{ color: COLORS.primary, opacity: OPACITY.medium }}>{course.description}</p>
          {course.tarotTheme && (
            <p className="text-sm italic mt-2" style={{ color: COLORS.primary, opacity: OPACITY.low }}>
              {course.tarotTheme}
            </p>
          )}
        </div>

        <div className="border-b-2 border-black mb-6">
          <div className="flex gap-4">
            {['assignments', 'syllabus', 'modules', 'grades'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-4 border-black'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{ color: COLORS.primary }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          {activeTab === 'assignments' && (
            <div className="space-y-4">
              <button
                onClick={() => setIsManageAssignmentsOpen(true)}
                className="w-full px-4 py-3 bg-black text-white rounded-lg hover:opacity-80 transition-opacity font-medium"
              >
                Manage Assignments
              </button>

              {assignmentsLoading ? (
                <p style={{ color: COLORS.primary }}>Loading assignments...</p>
              ) : assignments.length === 0 ? (
                <div className="text-center py-12 border-4 border-black rounded-lg">
                  <p style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                    No assignments yet.
                  </p>
                </div>
              ) : (
                assignments.map((assignment) => (
                  <Link
                    key={assignment.id}
                    to="/courses/$courseId/assignments/$assignmentId"
                    params={{ courseId, assignmentId: assignment.id }}
                    className="block bg-white border-4 border-black rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>
                          {assignment.title}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
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
                        <p className="text-sm font-medium" style={{ color: COLORS.primary }}>
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs mt-1" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                          {assignment.maxPoints} points
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="border-4 border-black rounded-lg p-8">
              <p style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                Syllabus content coming soon...
              </p>
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="border-4 border-black rounded-lg p-8">
              <p style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                Course modules coming soon...
              </p>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="border-4 border-black rounded-lg p-8">
              <p style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                Grades view coming soon...
              </p>
            </div>
          )}
        </div>
      </div>

      <ManageAssignmentsModal
        isOpen={isManageAssignmentsOpen}
        onClose={() => setIsManageAssignmentsOpen(false)}
        courseId={courseId}
      />
    </div>
  )
}
