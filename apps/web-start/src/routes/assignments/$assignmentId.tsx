import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../../constants/theme';
import { useAssignment } from '../../hooks/useAssignments';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import {
  useSubmissionByUserAndAssignment,
  useCreateSubmission,
  useUpdateSubmission
} from '../../hooks/useSubmissions';
import type { SubmissionCreateIn, SubmissionUpdateIn } from '@repo/api';

export const Route = createFileRoute('/assignments/$assignmentId')({
  component: AssignmentPage,
});

function AssignmentPage() {
  const { assignmentId } = Route.useParams();
  const [content, setContent] = useState('');

  const { data: currentUser } = useCurrentUser();
  const { data: assignment, isLoading: assignmentLoading, error: assignmentError } = useAssignment(assignmentId);
  const { data: existingSubmission } = useSubmissionByUserAndAssignment(currentUser?.id, assignmentId);

  const createMutation = useCreateSubmission();
  const updateMutation = useUpdateSubmission();

  // Populate content when existing submission loads
  useEffect(() => {
    if (existingSubmission) {
      const submissionContent =
        existingSubmission.codeContent ||
        existingSubmission.walkthroughText ||
        existingSubmission.codeExplanation ||
        '';
      setContent(submissionContent);
    }
  }, [existingSubmission]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!assignment || !assignment.allowedTypes[0] || !currentUser) return;

    // Use the first allowed type from the assignment (instructor sets this)
    const submissionType = assignment.allowedTypes[0];

    if (existingSubmission) {
      const updateData: SubmissionUpdateIn = {
        codeContent: submissionType === 'TRADITIONAL_CODE' ? content : undefined,
        walkthroughText: submissionType === 'SOLUTION_WALKTHROUGH' ? content : undefined,
        codeExplanation: submissionType === 'REVERSE_PROGRAMMING' ? content : undefined,
      };
      updateMutation.mutate(
        { id: existingSubmission.id, data: updateData },
        {
          onSuccess: () => {
            alert('Submission updated successfully!');
          },
        }
      );
    } else {
      const createData: SubmissionCreateIn = {
        type: submissionType,
        userId: currentUser.id,
        assignmentId,
        codeContent: submissionType === 'TRADITIONAL_CODE' ? content : undefined,
        walkthroughText: submissionType === 'SOLUTION_WALKTHROUGH' ? content : undefined,
        codeExplanation: submissionType === 'REVERSE_PROGRAMMING' ? content : undefined,
      };
      createMutation.mutate(createData, {
        onSuccess: () => {
          // Don't clear content - let the query refetch and show existing submission
          alert('Submission created successfully!');
        },
      });
    }
  };

  if (assignmentLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p style={{ color: COLORS.primary }}>Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (assignmentError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load assignment</p>
          <p className="text-sm text-gray-600">{assignmentError.message}</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p style={{ color: COLORS.primary }}>Assignment not found</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p style={{ color: COLORS.primary }}>Loading user data...</p>
        </div>
      </div>
    );
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title={assignment.title} subtitle={`Due: ${new Date(assignment.dueDate).toLocaleDateString()}`} />

        <div className="mb-8 p-6 border-4 border-black rounded-lg">
          <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.primary }}>Description</h2>
          <p className="mb-4" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>{assignment.description}</p>

          <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>Instructions</h3>
          <p className="whitespace-pre-wrap" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>{assignment.instructions}</p>

          <div className="mt-4 flex gap-2">
            {assignment.allowedTypes.map((type) => (
              <span key={type} className="text-sm px-3 py-1 bg-black text-white rounded">
                {type.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 border-4 border-black rounded-lg">
          <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.primary }}>
            {existingSubmission ? 'Update Submission' : 'Submit Assignment'}
          </h2>

          {existingSubmission && (
            <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-400 rounded">
              <p className="text-sm font-medium" style={{ color: COLORS.primary }}>
                You have already submitted this assignment. You can update your submission below.
              </p>
              <p className="text-xs mt-1" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                To delete this submission, visit the Submissions page.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                Submission Type
              </label>
              <div className="px-3 py-2 border-2 border-gray-300 rounded bg-gray-50">
                <span style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                  {assignment?.allowedTypes[0]?.replace(/_/g, ' ') || 'N/A'}
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: COLORS.primary, opacity: OPACITY.low }}>
                Submission type is set by your instructor
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                Your Submission
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border-2 border-black rounded font-mono"
                style={{ color: COLORS.primary }}
                placeholder="Enter your submission content here..."
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-black text-white rounded font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {isSubmitting
                  ? 'Saving...'
                  : existingSubmission
                    ? 'Update Submission'
                    : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
