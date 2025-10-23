import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { PageHeader } from '../../../../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../../../../constants/theme';
import { api } from '../../../../lib/api';
import type { SubmissionCreateIn, SubmissionUpdateIn } from '@repo/api';

export const Route = createFileRoute('/courses/$courseId/assignments/$assignmentId')({
  component: AssignmentPage,
});

const MOCK_USER_ID = 'cm2qhg1a00001edjx1234mock';

function AssignmentPage() {
  const { courseId, assignmentId } = Route.useParams();
  const queryClient = useQueryClient();
  const [submissionType, setSubmissionType] = useState<'TRADITIONAL_CODE' | 'SOLUTION_WALKTHROUGH' | 'REVERSE_PROGRAMMING'>('TRADITIONAL_CODE');
  const [content, setContent] = useState('');

  const { data: assignment, isLoading: assignmentLoading } = useQuery({
    queryKey: ['assignment', assignmentId],
    queryFn: () => api.assignments.getById(assignmentId),
  });

  const { data: existingSubmission } = useQuery({
    queryKey: ['submission', MOCK_USER_ID, assignmentId],
    queryFn: async () => {
      const submissions = await api.submissions.getAll(MOCK_USER_ID, assignmentId);
      return submissions[0] || null;
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: SubmissionCreateIn) => api.submissions.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission', MOCK_USER_ID, assignmentId] });
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      setContent('');
      alert('Submission created successfully!');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubmissionUpdateIn }) =>
      api.submissions.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission', MOCK_USER_ID, assignmentId] });
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      alert('Submission updated successfully!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.submissions.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submission', MOCK_USER_ID, assignmentId] });
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      setContent('');
      alert('Submission deleted successfully!');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (existingSubmission) {
      const updateData: SubmissionUpdateIn = {
        type: submissionType,
        codeContent: submissionType === 'TRADITIONAL_CODE' ? content : undefined,
        walkthroughText: submissionType === 'SOLUTION_WALKTHROUGH' ? content : undefined,
        codeExplanation: submissionType === 'REVERSE_PROGRAMMING' ? content : undefined,
      };
      updateMutation.mutate({ id: existingSubmission.id, data: updateData });
    } else {
      const createData: SubmissionCreateIn = {
        type: submissionType,
        userId: MOCK_USER_ID,
        assignmentId,
        codeContent: submissionType === 'TRADITIONAL_CODE' ? content : undefined,
        walkthroughText: submissionType === 'SOLUTION_WALKTHROUGH' ? content : undefined,
        codeExplanation: submissionType === 'REVERSE_PROGRAMMING' ? content : undefined,
      };
      createMutation.mutate(createData);
    }
  };

  const handleDelete = () => {
    if (existingSubmission && confirm('Are you sure you want to delete this submission?')) {
      deleteMutation.mutate(existingSubmission.id);
    }
  };

  if (assignmentLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p style={{ color: COLORS.primary }}>Loading assignment...</p>
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
                You have already submitted this assignment. You can update or delete your submission below.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                Submission Type
              </label>
              <select
                value={submissionType}
                onChange={(e) => setSubmissionType(e.target.value as typeof submissionType)}
                className="w-full px-3 py-2 border-2 border-black rounded"
                style={{ color: COLORS.primary }}
              >
                {assignment.allowedTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
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
                disabled={createMutation.isPending || updateMutation.isPending}
                className="px-6 py-2 bg-black text-white rounded font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Saving...'
                  : existingSubmission
                    ? 'Update Submission'
                    : 'Submit'}
              </button>

              {existingSubmission && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="px-6 py-2 border-2 border-red-600 text-red-600 rounded font-medium hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete Submission'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
