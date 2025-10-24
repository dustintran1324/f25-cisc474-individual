import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../constants/theme';
import { useApi } from '../hooks/useApi';
import { useState } from 'react';
import type { SubmissionOut, SubmissionUpdateIn } from '@repo/api';

export const Route = createFileRoute('/submissions')({
  component: SubmissionsPage,
});

function SubmissionsPage() {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();
  const qc = useQueryClient();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: submissions = [], isLoading } = useQuery<SubmissionOut[]>({
    queryKey: ['submissions'],
    queryFn: () => api.submissions.getAll(),
    enabled: isAuthenticated,
  });

  type EditableKey = 'codeContent' | 'walkthroughText' | 'codeExplanation';

  const pickEditableField = (
    s: SubmissionOut
  ): { key: EditableKey; value: string } => {
    if (s.codeContent) return { key: 'codeContent', value: s.codeContent };
    if (s.walkthroughText) return { key: 'walkthroughText', value: s.walkthroughText };
    return { key: 'codeExplanation', value: s.codeExplanation ?? '' };
  };

  // --- Delete mutation ---
  const deleteSubmission = useMutation<
    void,
    unknown,
    string,
    { prev?: SubmissionOut[] }
  >({
    mutationFn: (id) => api.submissions.delete(id),
    onMutate: async (id) => {
      setDeletingId(id);
      await qc.cancelQueries({ queryKey: ['submissions'] });
      const prev = qc.getQueryData<SubmissionOut[]>(['submissions']);
      qc.setQueryData<SubmissionOut[]>(['submissions'], (old = []) =>
        old.filter((s) => s.id !== id)
      );
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(['submissions'], ctx.prev);
      alert('Failed to delete submission. Please try again.');
    },
    onSettled: () => {
      setDeletingId(null);
      qc.invalidateQueries({ queryKey: ['submissions'] });
    },
  });

  // --- Update mutation ---
  const updateSubmission = useMutation<
    SubmissionOut,
    unknown,
    { id: string; data: SubmissionUpdateIn },
    { prev?: SubmissionOut[] }
  >({
    mutationFn: ({ id, data }) => api.submissions.update(id, data),
    onMutate: async ({ id, data }) => {
      setUpdatingId(id);
      await qc.cancelQueries({ queryKey: ['submissions'] });
      const prev = qc.getQueryData<SubmissionOut[]>(['submissions']);

      // optimistic merge
      qc.setQueryData<SubmissionOut[]>(['submissions'], (old = []) =>
        old.map((s) => (s.id === id ? ({ ...s, ...data } as SubmissionOut) : s))
      );

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(['submissions'], ctx.prev);
      alert('Failed to update submission.');
    },
    onSettled: () => {
      setUpdatingId(null);
      qc.invalidateQueries({ queryKey: ['submissions'] });
    },
  });

  const handleEdit = (submission: SubmissionOut) => {
    const { key, value } = pickEditableField(submission);
    const initial = typeof value === 'string' ? value : '';
    const edited = window.prompt('Edit submission content:', initial);
    if (edited == null) return; // cancelled
    if (edited.trim() === initial.trim()) return; // unchanged

    updateSubmission.mutate({
      id: submission.id,
      data: { [key]: edited } as SubmissionUpdateIn,
    });
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
          subtitle="View all your past assignment submissions"
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
              const isDeleting =
                deletingId === submission.id && deleteSubmission.isPending;
              const isUpdating =
                updatingId === submission.id && updateSubmission.isPending;

              return (
                <div
                  key={submission.id}
                  className="relative bg-white border-4 border-black rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Actions */}
                  <div className="absolute right-4 top-4 flex gap-2">
                    <button
                      type="button"
                      aria-label={`Edit submission ${submission.id}`}
                      onClick={() => handleEdit(submission)}
                      disabled={isUpdating || isDeleting}
                      className={`px-3 py-1 rounded text-black border-2 border-black ${
                        isUpdating || isDeleting
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-yellow-400 hover:bg-yellow-500 active:translate-y-[1px]'
                      }`}
                    >
                      {isUpdating ? 'Updating…' : 'Edit'}
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete submission ${submission.id}`}
                      onClick={() => {
                        const ok = window.confirm(
                          'Delete this submission? This cannot be undone.'
                        );
                        if (ok) deleteSubmission.mutate(submission.id);
                      }}
                      disabled={isDeleting || isUpdating}
                      className={`px-3 py-1 rounded text-white border-2 border-black ${
                        isDeleting || isUpdating
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 active:translate-y-[1px]'
                      }`}
                    >
                      {isDeleting ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium px-3 py-1 bg-black text-white rounded">
                          {submission.type.replace(/_/g, ' ')}
                        </span>
                        <span
                          className="text-sm font-medium px-2 py-1 rounded"
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
                      </div>

                      <div className="mt-3 p-3 bg-gray-50 rounded border-2 border-gray-200">
                        <pre
                          className="text-sm font-mono whitespace-pre-wrap break-words"
                          style={{ color: COLORS.primary }}
                        >
                          {submission.codeContent ||
                            submission.walkthroughText ||
                            submission.codeExplanation ||
                            'No content'}
                        </pre>
                      </div>

                      <p
                        className="text-xs mt-2"
                        style={{ color: COLORS.primary, opacity: OPACITY.medium }}
                      >
                        Created:{' '}
                        {new Date(submission.createdAt).toLocaleDateString()}
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
