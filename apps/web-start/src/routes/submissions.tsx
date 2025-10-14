import { createFileRoute } from '@tanstack/react-router';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { COLORS, OPACITY } from '../constants/theme';

export const Route = createFileRoute('/submissions')({
  component: SubmissionsPage,
});

function SubmissionsPage() {
  const submissions = [
    {
      id: 1,
      title: "React Component Design",
      course: "CISC474",
      submittedDate: "Jan 14, 2024",
      status: "graded",
      score: "95/100"
    },
    {
      id: 2,
      title: "Database Schema Design",
      course: "CISC437",
      submittedDate: "Jan 16, 2024",
      status: "pending",
      score: "-"
    },
    {
      id: 3,
      title: "Algorithm Analysis Report",
      course: "CISC320",
      submittedDate: "Jan 18, 2024",
      status: "graded",
      score: "88/100"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <PageHeader title="Submissions" subtitle="View and manage your assignment submissions" />

        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white border-4 border-black rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: COLORS.primary }}>
                      {submission.title}
                    </h3>
                    <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded" style={{ color: COLORS.primary }}>
                      {submission.course}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                    Submitted: {submission.submittedDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm mb-1" style={{ color: COLORS.primary, opacity: OPACITY.medium }}>
                    {submission.status}
                  </p>
                  <p className="text-xl font-bold" style={{ color: COLORS.primary }}>
                    {submission.score}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
