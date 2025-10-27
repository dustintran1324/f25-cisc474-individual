import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../../constants/theme';
import { useAssignment } from '../../hooks/useAssignments';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import {
  useSubmissionByUserAndAssignment,
  useCreateSubmission,
  useUpdateSubmission,
  useSubmitSubmission
} from '../../hooks/useSubmissions';
import type { SubmissionCreateIn, SubmissionUpdateIn } from '@repo/api';

export const Route = createFileRoute('/assignments/$assignmentId')({
  component: AssignmentPage,
});

function AssignmentPage() {
  const { assignmentId } = Route.useParams();
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { data: assignment, isLoading: assignmentLoading, error: assignmentError } = useAssignment(assignmentId);
  const { data: existingSubmission } = useSubmissionByUserAndAssignment(currentUser?.id, assignmentId);

  const createMutation = useCreateSubmission();
  const updateMutation = useUpdateSubmission();
  const submitMutation = useSubmitSubmission();

  const submissionStatus = existingSubmission?.status || 'NOT_STARTED';
  const isSubmitted = submissionStatus === 'SUBMITTED' || submissionStatus === 'GRADED';
  const isReadOnly = isSubmitted && !isEditing;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!assignment || !assignment.allowedTypes[0] || !currentUser) return;

    const submissionType = assignment.allowedTypes[0];

    if (existingSubmission) {
      const confirmed = confirm('Update your submission?');
      if (!confirmed) return;

      const updateData: SubmissionUpdateIn = {
        codeContent: submissionType === 'TRADITIONAL_CODE' ? content : undefined,
        walkthroughText: submissionType === 'SOLUTION_WALKTHROUGH' ? content : undefined,
        codeExplanation: submissionType === 'REVERSE_PROGRAMMING' ? content : undefined,
        status: 'SUBMITTED',
      };
      updateMutation.mutate(
        { id: existingSubmission.id, data: updateData },
        {
          onSuccess: () => {
            setIsEditing(false);
            alert('Submission updated successfully!');
          },
        }
      );
    } else {
      const confirmed = confirm('Submit this assignment?');
      if (!confirmed) return;

      const createData: SubmissionCreateIn = {
        type: submissionType,
        userId: currentUser.id,
        assignmentId,
        codeContent: submissionType === 'TRADITIONAL_CODE' ? content : undefined,
        walkthroughText: submissionType === 'SOLUTION_WALKTHROUGH' ? content : undefined,
        codeExplanation: submissionType === 'REVERSE_PROGRAMMING' ? content : undefined,
      };

      createMutation.mutate(createData, {
        onSuccess: (newSubmission) => {
          submitMutation.mutate(newSubmission.id, {
            onSuccess: () => {
              alert('Assignment submitted successfully!');
            },
          });
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

  const isSaving = createMutation.isPending || updateMutation.isPending || submitMutation.isPending;

  const getStatusBadge = () => {
    switch (submissionStatus) {
      case 'NOT_STARTED':
        return { bgColor: COLORS.gray[100], textColor: COLORS.gray[800], label: 'Not Submitted' };
      case 'SUBMITTED':
      case 'DRAFT':
        return { bgColor: COLORS.medieval.greenLight, textColor: COLORS.medieval.green, label: 'Submitted' };
      case 'GRADED':
        return { bgColor: '#dbeafe', textColor: '#1e40af', label: 'Graded' };
      default:
        return { bgColor: COLORS.gray[100], textColor: COLORS.gray[800], label: submissionStatus };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title={assignment.title} subtitle={`Due: ${new Date(assignment.dueDate).toLocaleDateString()}`} />

        <div className="mb-8 p-6 border-4 border-black rounded-lg">
          <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.primary }}>Description</h2>
          <p className="mb-4" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>{assignment.description}</p>

          <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.primary }}>Instructions</h3>
          <p className="whitespace-pre-wrap" style={{ color: COLORS.primary, opacity: OPACITY.medium}}>{assignment.instructions}</p>

          <div className="mt-4 flex gap-2">
            {assignment.allowedTypes.map((type) => (
              <span key={type} className="text-sm px-3 py-1 bg-black text-white rounded">
                {type.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 border-4 border-black rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ color: COLORS.primary }}>
              Your Submission
            </h2>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: statusBadge.bgColor, color: statusBadge.textColor }}
            >
              {statusBadge.label}
            </span>
          </div>

          {isSubmitted && existingSubmission?.submittedAt && !isEditing && (
            <div
              className="mb-4 p-3 rounded"
              style={{ backgroundColor: COLORS.medieval.greenLight, borderWidth: '2px', borderStyle: 'solid', borderColor: COLORS.medieval.green }}
            >
              <p className="text-sm font-medium" style={{ color: COLORS.medieval.green }}>
                Submitted on {new Date(existingSubmission.submittedAt).toLocaleString()}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs underline hover:no-underline mt-1"
                style={{ color: COLORS.medieval.green }}
              >
                Edit your submission
              </button>
            </div>
          )}

          {isEditing && (
            <div
              className="mb-4 p-3 rounded"
              style={{ backgroundColor: COLORS.medieval.yellowLight, borderWidth: '2px', borderStyle: 'solid', borderColor: COLORS.medieval.yellow }}
            >
              <p className="text-sm font-medium" style={{ color: COLORS.medieval.yellowDark }}>
                Editing Mode
              </p>
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs underline hover:no-underline mt-1"
                style={{ color: COLORS.medieval.yellowDark }}
              >
                Cancel editing
              </button>
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                Your Response
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                readOnly={isReadOnly}
                className={`w-full px-3 py-2 border-2 border-black rounded font-mono ${
                  isReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
                style={{ color: COLORS.primary }}
                placeholder="Enter your submission content here..."
                required
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">
                  {content.length} characters
                </p>
                {!isReadOnly && isSaving && (
                  <span className="text-xs text-gray-500">Saving...</span>
                )}
              </div>
            </div>

            {!isReadOnly && (
              <button
                type="submit"
                disabled={isSaving || !content.trim()}
                className="w-full px-6 py-3 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: isSaving || !content.trim() ? COLORS.gray[400] : COLORS.medieval.green }}
                onMouseEnter={(e) => {
                  if (!isSaving && content.trim()) {
                    e.currentTarget.style.backgroundColor = COLORS.medieval.greenHover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSaving && content.trim()) {
                    e.currentTarget.style.backgroundColor = COLORS.medieval.green;
                  }
                }}
              >
                {isSaving
                  ? 'Saving...'
                  : existingSubmission
                    ? 'Update Submission'
                    : 'Submit Assignment'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
