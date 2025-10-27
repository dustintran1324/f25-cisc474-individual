import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../constants/theme';
import { useSubmissions, useDeleteSubmission } from '../hooks/useSubmissions';
import { useCurrentUser } from '../hooks/useCurrentUser';
import type { SubmissionOut } from '@repo/api';

export const Route = createFileRoute('/submissions')({
  component: SubmissionsPage,
});

function SubmissionsPage() {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data: currentUser } = useCurrentUser();
  const { data: submissions = [], isLoading } = useSubmissions(currentUser?.id);
  const deleteMutation = useDeleteSubmission();

  const handleDelete = (submission: SubmissionOut, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    const ok = window.confirm(
      'Delete this submission? This cannot be undone.'
    );
    if (!ok) return;

    setDeletingId(submission.id);
    deleteMutation.mutate(submission.id, {
      onSuccess: () => {
        setDeletingId(null);
      },
      onError: () => {
        setDeletingId(null);
        alert('Failed to delete submission. Please try again.');
      },
    });
  };

  const handleNavigateToAssignment = (submission: SubmissionOut) => {
    // Use the course route format (same as Card component)
    if (submission.assignment?.courseId) {
      navigate({
        to: '/courses/$courseId/assignments/$assignmentId',
        params: {
          courseId: submission.assignment.courseId,
          assignmentId: submission.assignmentId,
        },
      });
    } else {
      // Fallback to standalone route if no courseId
      navigate({
        to: '/assignments/$assignmentId',
        params: { assignmentId: submission.assignmentId },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p style={{ color: COLORS.primary }}>Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="My Submission History"
          subtitle="View and manage your past assignment submissions"
        />

        <div className="space-y-4">
          {submissions.length === 0 ? (
            <div className="text-center py-12 border-4 border-black rounded-lg">
              <p style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                No submissions yet. Complete assignments to see them here!
              </p>
            </div>
          ) : (
            submissions.map((submission) => {
              const isDeleting = deletingId === submission.id && deleteMutation.isPending;

              return (
                <div
                  key={submission.id}
                  onClick={() => handleNavigateToAssignment(submission)}
                  className="relative bg-white border-4 border-black rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50"
                >
                  {/* Actions */}
                  <div className="absolute right-4 top-4 flex gap-2">
                    <button
                      type="button"
                      aria-label={`Delete submission ${submission.id}`}
                      onClick={(e) => handleDelete(submission, e)}
                      disabled={isDeleting}
                      className={`px-3 py-1 rounded text-white border-2 border-black ${
                        isDeleting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 active:translate-y-px'
                      }`}
                    >
                      {isDeleting ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-24">
                      {/* Assignment Title and Course Code */}
                      <div className="mb-3">
                        {submission.assignment?.course?.code && (
                          <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white rounded mr-2">
                            {submission.assignment.course.code}
                          </span>
                        )}
                        <h3 className="inline text-lg font-bold" style={{ color: COLORS.primary }}>
                          {submission.assignment?.title || 'Unknown Assignment'}
                        </h3>
                      </div>

                      {/* Status and Type Badges */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium px-3 py-1 bg-gray-200 text-gray-800 rounded">
                          {submission.type.replace(/_/g, ' ')}
                        </span>
                        <span
                          className="text-xs font-medium px-3 py-1 rounded"
                          style={{
                            backgroundColor:
                              submission.status === 'GRADED'
                                ? '#22c55e'
                                : submission.status === 'SUBMITTED'
                                ? '#eab308'
                                : '#94a3b8',
                            color: 'white',
                          }}
                        >
                          {submission.status}
                        </span>
                        {submission.status === 'GRADED' && submission.feedback && submission.feedback.length > 0 && (
                          <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded">
                            Score: {submission.feedback[0]?.points || '–'} / {submission.assignment?.maxPoints || 100}
                          </span>
                        )}
                      </div>

                      {/* Content Preview */}
                      <div className="mt-3 p-3 bg-gray-50 rounded border-2 border-gray-200">
                        <pre
                          className="text-sm font-mono whitespace-pre-wrap break-words line-clamp-3"
                          style={{ color: COLORS.primary }}
                        >
                          {submission.codeContent ||
                            submission.walkthroughText ||
                            submission.codeExplanation ||
                            'No content'}
                        </pre>
                      </div>

                      {/* Timestamps */}
                      <p
                        className="text-xs mt-2"
                        style={{ color: COLORS.primary, opacity: OPACITY.medium }}
                      >
                        Created: {new Date(submission.createdAt).toLocaleDateString()}
                        {submission.submittedAt &&
                          ` | Submitted: ${new Date(
                            submission.submittedAt
                          ).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
