import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../constants/theme';
import { useApi } from '../hooks/useApi';

export const Route = createFileRoute('/submissions')({
  component: SubmissionsPage,
});

function SubmissionsPage() {
  const { isAuthenticated } = useAuth0();
  const { api } = useApi();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => api.submissions.getAll(),
    enabled: isAuthenticated,
  });

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
            submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white border-4 border-black rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
              >
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
                      Created: {new Date(submission.createdAt).toLocaleDateString()}
                      {submission.submittedAt &&
                        ` | Submitted: ${new Date(submission.submittedAt).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
